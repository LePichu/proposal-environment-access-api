// _config.ts
import lume from "lume/mod.ts"
import code_highlight from "lume/plugins/code_highlight.ts"
import jsx from "lume/plugins/jsx.ts"
// deno-lint-ignore no-unversioned-import
import type { HLJSApi, Language } from "npm:highlight.js"

const webIdl = (hljs: HLJSApi): Language => ({
	name: "WebIDL",
	keywords: {
		keyword:
			"interface partial namespace dictionary enum typedef includes mixin",
		type:
			"boolean byte octet short long unrestricted float double bigint DOMString USVString ByteString CSSOMString object symbol any void undefined sequence record FrozenArray ObservableArray Promise",
		literal: "true false null Infinity NaN",
	},
	contains: [
		hljs.C_LINE_COMMENT_MODE,
		hljs.C_BLOCK_COMMENT_MODE,
		hljs.QUOTE_STRING_MODE,
		hljs.NUMBER_MODE,
		{
			className: "meta",
			begin: /\[/,
			end: /\]/,
			contains: [
				hljs.QUOTE_STRING_MODE,
				hljs.NUMBER_MODE,
				{
					begin: /[\w-]+\s*=/,
					keywords: {
						"meta-keyword":
							"Exposed Global SecureContext LegacyUnenumerable LegacyUnforgeable",
					},
				},
			],
		},
		{
			className: "title",
			begin: /\b[A-Z][A-Za-z0-9_]*\b/,
		},
		{
			className: "keyword",
			begin:
				/\b(readonly|attribute|getter|setter|deleter|inherit|static|stringifier|iterable|maplike|setlike|required|optional|async)\b/,
		},
	],
})

const site = lume()

site.use(code_highlight({
	languages: {
		"webidl": webIdl,
		"web-idl": webIdl,
	},
	options: {
		noHighlightRe: /^(no-highlight|plain|text)$/i,
	},
	theme: {
		name: "github",
		cssFile: "/styles.css",
	},
}))

site.use(jsx())

export default site
