---
layout: index.tsx
---

## Introduction

_This section is non-normative._

This document defines a standard `Environment` API for non-browser
ECMAScript-based server-side runtimes. It provides a unified, runtime-agnostic
interface for accessing process environment variables, command-line parameters
(argv), and named I/O channels like `stdin`, `stdout`, and `stderr`.

Right now, runtimes expose this information in completely incompatible ways —
Node.js has `process.env` and `process.argv`, Deno has `Deno.env` and
`Deno.args`, and Cloudflare Workers has neither. There's no common standard.
This proposal fixes that.

Where existing web platform primitives exist (e.g. `ReadableStream`,
`WritableStream`), this API reuses them rather than inventing new abstractions.

---

## Concepts

### Environment Variables

Key-value string pairs made available to the running process by the host OS or
runtime platform. Variables may be set or deleted at runtime to configure the
environment for the current run.

### Parameters

The argument vector (`argv`) passed to the process at invocation time — an
ordered list of strings. `parameters[0]` is conventionally the executable name
or script path.

### Channels

A **channel** is a named I/O stream. Well-known channels are:

| Channel name | Direction | Description                          |
| ------------ | --------- | ------------------------------------ |
| `stdin`      | Readable  | Standard input from terminal or pipe |
| `stdout`     | Writable  | Standard output                      |
| `stderr`     | Writable  | Standard error                       |

Additional runtime-defined channels may be present. All channel values are
standard `ReadableStream` or `WritableStream` instances.

---

## API

### `Environment` interface

```webidl
[Exposed=*]
interface Environment {
	readonly attribute Map<DOMString, DOMString> variables
	readonly attribute FrozenArray<DOMString> parameters
	readonly attribute ReadonlyMap<DOMString, (ReadableStream or WritableStream)> channels
}
```

- **`variables`** — Mutable map of environment variable key-value pairs.
  Entries may be set or deleted to configure the environment for the current
  run. Access MAY require a permission grant in sandboxed runtimes.
- **`parameters`** — Command-line argument strings. `parameters[0]` SHOULD be
  the invocation name.
- **`channels`** — Read-only map of named I/O streams. Values are either a
  `ReadableStream` (sources, e.g. `stdin`) or a `WritableStream` (sinks, e.g.
  `stdout`, `stderr`). Runtimes MUST provide `"stdin"`, `"stdout"`, and
  `"stderr"` at minimum, unless the runtime context has no standard I/O.

### Global Exposure

```webidl
partial interface globalThis {
	readonly attribute Environment environment
}
```

The `Environment` object is exposed as `globalThis.environment` in all
conformant runtimes.

> **Note:** The name `environment` is provisional. Alternatives under
> consideration include `process` (Node.js compat) and `runtime`. Feedback
> welcome.

---

## Usage Examples

### Reading and writing environment variables

```js
const dbUrl = environment.variables.get("DATABASE_URL")

for (const [key, value] of environment.variables) {
	console.log(`${key}=${value}`)
}

// Override or inject variables for the current run
environment.variables.set("LOG_LEVEL", "debug")
environment.variables.delete("LEGACY_FLAG")
```

### Reading command-line parameters

```js
const [_invocation, ...args] = environment.parameters

if (args.includes("--help")) {
	const writer = environment.channels.get("stdout").getWriter()
	await writer.write(new TextEncoder().encode("Usage: my-tool [options]\n"))
}
```

### Reading from `stdin`

```js
const reader = environment.channels.get("stdin").getReader()

while (true) {
	const { value, done } = await reader.read()
	if (done) break
	console.log(new TextDecoder().decode(value))
}
```

### Writing to a custom runtime channel

```js
const audit = environment.channels.get("audit-log")
if (audit) {
	const writer = audit.getWriter()
	await writer.write(
		new TextEncoder().encode(JSON.stringify({ event: "startup" })),
	)
}
```

---

## Relation to Existing Runtime APIs

This API is designed to be a thin wrapper over existing runtime primitives.

| Runtime            | `environment.variables` | `environment.parameters` | `environment.channels`        |
| ------------------ | ----------------------- | ------------------------ | ----------------------------- |
| Node.js            | `process.env`           | `process.argv`           | `process.stdin/stdout/stderr` |
| Deno               | `Deno.env.toObject()`   | `Deno.args`              | `Deno.stdin/stdout/stderr`    |
| Cloudflare Workers | Bindings (partial)      | N/A                      | N/A (no stdio)                |

Where access is unavailable (e.g. Cloudflare Workers with no `stdin`), runtimes
SHOULD omit those entries from `environment.channels` rather than throwing —
letting portable code guard with optional chaining:

```js
environment.channels.get("stdin")?.getReader()
```

---

## Relation to the Sockets API

The TC55 Sockets API uses `ReadableStream`/`WritableStream` for TCP connections.
This proposal reuses the same idiom for I/O channels, so data from `stdin` can
be forwarded directly to a socket with no glue code:

```js
const socket = connect("log-server.internal:9000")
environment.channels.get("stdin").pipeTo(socket.writable)
```

---

## Permissions Interop

_This section is non-normative._

Anticipated integration with a future TC55 Permissions API, modeled after the
W3C Permissions API:

```js
const status = await permissions.query({
	name: "env",
	variable: "DATABASE_URL",
})

if (status.state === "granted") {
	const dbUrl = environment.variables.get("DATABASE_URL")
}
```

Proposed permission names:

| Permission   | Controls                                          |
| ------------ | ------------------------------------------------- |
| `"env"`      | `environment.variables`                           |
| `"args"`     | `environment.parameters`                          |
| `"stdio"`    | Well-known channels (`stdin`, `stdout`, `stderr`) |
| `"channels"` | Runtime-defined named channels                    |

Runtimes may expose these as CLI flags (e.g. `--allow-env`) or declarative
manifest entries. The intent is a "deny by default" posture on sandboxed
runtimes — `environment.variables.get(key)` returns `undefined` for disallowed keys, and
disallowed channels return `undefined` from `environment.channels.get(name)`.

---

## WASI Interoperability

_This section is non-normative._

For runtimes with WASI support, this API maps naturally onto WASI Preview 2:

- `environment.variables` ↔ `wasi:cli/environment.get-environment()`
- `environment.parameters` ↔ `wasi:cli/environment.get-arguments()`
- `environment.channels` ↔ `wasi:cli/stdin`, `wasi:cli/stdout`,
  `wasi:cli/stderr`

---

## Open Questions

1. **Global name:** `environment` vs `process` vs `runtime`? `environment` is
   unambiguous but verbose. `process` has massive Node.js ecosystem gravity.
2. **Variable format:** Resolved as a mutable `Map<DOMString, DOMString>` for ergonomics and to support runtime mutation (e.g. injecting variables before a subprocess). Note this deviates from the POSIX `KEY=VALUE` string convention — runtimes with non-`KEY=VALUE` entries (e.g. entries without `=`) will need a defined mapping strategy.
3. **Channel enumeration:** Should `environment.channels` enumerate all
   available channels, or expose only the three well-known ones with additional
   channels accessible by name only?
4. **Permission granularity:** Per-variable permission queries, or only
   coarse-grained `"env"` permission?
