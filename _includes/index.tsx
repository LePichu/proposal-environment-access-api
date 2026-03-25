export const title = "TC55 · Environment Access API Proposal"

interface Props {
	title: string
	children: unknown
}

export default ({ title, children }: Props) => (
	<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>{title}</title>

			<meta property="og:type" content="article" />
			<meta property="og:title" content={title} />
			<meta
				property="og:description"
				content="A proposal for a first-class Environment Access API in TC55, enabling portable, runtime-agnostic access to environment variables, parameters, and channels."
			/>
			<meta
				property="og:url"
				content="https://tc55-proposal-from-ohio.deno.dev"
			/>
			<meta property="og:site_name" content="TC55" />

			<meta name="twitter:card" content="summary" />
			<meta name="twitter:title" content={title} />
			<meta
				name="twitter:description"
				content="A proposal for a first-class Environment Access API in TC55, enabling portable, runtime-agnostic access to environment variables, parameters, and channels."
			/>

			<link
				rel="stylesheet"
				href="https://unpkg.com/@highlightjs/cdn-assets@11/styles/stackoverflow-light.min.css"
			/>
			<link rel="stylesheet" href="/index.css" />
		</head>
		<body>
			<div class="wrapper">
				<main class="prose">
					{children}
				</main>
			</div>

			<div class="yt-dock collapsed" id="yt-dock">
				<div class="yt-dock-label" id="yt-handle">
					🎮 focus mode
					<span class="drag-hint">drag to snap</span>
					<button
						type="button"
						class="yt-dock-toggle"
						id="yt-toggle"
						title="Toggle video"
					>
						show
					</button>
				</div>
				<iframe
					id="yt-iframe"
					src="https://www.youtube.com/embed/lGlFs6lEcoU?autoplay=1&mute=1&loop=1&playlist=lGlFs6lEcoU&controls=0&modestbranding=1&rel=0"
					allow="autoplay; encrypted-media"
					allowfullscreen
				/>
			</div>

			<div class="snap-indicator" id="snap-tl"></div>
			<div class="snap-indicator" id="snap-tr"></div>
			<div class="snap-indicator" id="snap-bl"></div>
			<div class="snap-indicator" id="snap-br"></div>

			<script src="/index.js" />
		</body>
	</html>
)
