// _includes/index.tsx

export const title = "TC55 · Environment API Proposal"

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

			{/* ── OpenGraph ── */}
			<meta property="og:type"        content="article" />
			<meta property="og:title"       content={title} />
			<meta property="og:description" content="A proposal for a first-class Environment API in TC55, enabling portable, runtime-agnostic access to environment variables, parameters, and channels." />
			<meta property="og:url"         content="https://tc55-proposal-from-ohio.deno.dev" />
			<meta property="og:site_name"   content="TC55" />

			{/* ── Twitter / X Card ── */}
			<meta name="twitter:card"        content="summary" />
			<meta name="twitter:title"       content={title} />
			<meta name="twitter:description" content="A proposal for a first-class Environment API in TC55, enabling portable, runtime-agnostic access to environment variables, parameters, and channels." />
			<link
				rel="stylesheet"
				href="https://unpkg.com/@highlightjs/cdn-assets@11/styles/stackoverflow-light.min.css"
			/>

			<style
				dangerouslySetInnerHTML={{
					__html: `
        @font-face {
          font-family: 'ComicShanns';
          src: url('https://raw.githubusercontent.com/shannpersand/comic-shanns/master/v2/comic%20shanns%202.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:      #ffffff;
          --surface: #f0f0f0;
          --border:  #c0c0c0;
          --text:    #1a1a1a;
          --muted:   #777777;
          --code-bg: #ececec;
          --font: 'ComicShanns', monospace;
        }

        html {
          scroll-behavior: smooth;
          overflow-x: hidden;
        }

        body {
          font-family: var(--font);
          background: var(--bg);
          color: var(--text);
          font-size: 1.05rem;
          line-height: 1.8;
          padding: 0 2rem;
          overflow-x: hidden;
        }

        .wrapper {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 0 4rem;
        }

        /* ── Prose headings ── */
        .prose h2 {
          font-size: 1.55rem;
          font-weight: 800;
          margin: 2rem 0 0.6rem;
          scroll-margin-top: 1rem;
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }
        .prose h3 {
          font-size: 1.2rem;
          font-weight: 700;
          margin: 1.5rem 0 0.5rem;
          scroll-margin-top: 1rem;
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }

        .prose h2 a.anchor {
          order: -1;
          font-size: 1.55rem;
          font-weight: 400;
          color: var(--muted);
          text-decoration: none;
          opacity: 0.35;
          transition: opacity 0.15s;
          user-select: none;
          flex-shrink: 0;
          line-height: 1;
        }
        .prose h3 a.anchor {
          order: -1;
          font-size: 1.2rem;
          font-weight: 400;
          color: var(--muted);
          text-decoration: none;
          opacity: 0.35;
          transition: opacity 0.15s;
          user-select: none;
          flex-shrink: 0;
          line-height: 1;
        }
        .prose h2:hover a.anchor,
        .prose h3:hover a.anchor { opacity: 1; }

        /* ── Prose body ── */
        .prose p { margin-bottom: 0.85rem; font-size: 1.05rem; }
        .prose em { color: var(--muted); font-style: italic; }
        .prose strong { font-weight: 700; }

        .prose blockquote {
          border-left: 3px solid var(--text);
          padding: 0.5rem 1rem;
          margin: 1rem 0;
          background: var(--surface);
          color: var(--muted);
          font-size: 0.97rem;
        }

        .prose code {
          background: var(--code-bg);
          padding: 0.15em 0.4em;
          border-radius: 3px;
          font-size: 0.95em;
          font-family: var(--font);
        }
        .prose pre {
          background: var(--code-bg);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 1.1rem 1.3rem;
          overflow-x: auto;
          margin: 1rem 0;
          font-size: 0.97rem;
          line-height: 1.65;
        }
        .prose pre code {
          background: none;
          padding: 0;
          border-radius: 0;
          font-size: inherit;
        }

        .prose table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.97rem;
          margin: 1rem 0;
        }
        .prose th {
          text-align: left;
          padding: 0.5rem 0.8rem;
          border-bottom: 2px solid var(--text);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: var(--muted);
        }
        .prose td {
          padding: 0.5rem 0.8rem;
          border-bottom: 1px solid var(--border);
          vertical-align: top;
        }
        .prose tr:last-child td { border-bottom: none; }

        .prose ul, .prose ol {
          padding-left: 1.6rem;
          margin-bottom: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          font-size: 1.05rem;
        }

        .prose hr {
          border: none;
          border-top: 1px solid var(--border);
          margin: 2rem 0;
        }

        /* ── YouTube dock ── */
        .yt-dock {
          position: fixed;
          top: 1.5rem;
          right: 1.5rem;
          width: 380px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.12);
          z-index: 50;
          user-select: none;
          transition: box-shadow 0.15s, top 0.18s ease, left 0.18s ease;
        }
        .yt-dock.snapping {
          transition: box-shadow 0.15s, top 0.18s ease, left 0.18s ease;
        }
        .yt-dock.dragging {
          transition: box-shadow 0.15s;
          box-shadow: 0 12px 40px rgba(0,0,0,0.2);
        }

        /* Collapsed state — only show the label bar */
        .yt-dock.collapsed iframe {
          height: 0 !important;
        }

        /* Mobile: dock spans full width, pinned to top initially. */
        @media (max-width: 600px) {
          .yt-dock {
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            border-radius: 0;
            border-left: none;
            border-right: none;
          }
          .yt-dock iframe { height: 180px; }
          .yt-dock.collapsed iframe { height: 0 !important; }
        }

        .yt-dock-label {
          padding: 0.5rem 0.9rem;
          font-size: 0.82rem;
          color: var(--muted);
          border-bottom: 1px solid var(--border);
          font-family: var(--font);
          cursor: grab;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          touch-action: none;
          -webkit-user-select: none;
        }
        .yt-dock.collapsed .yt-dock-label {
          border-bottom: none;
        }
        .yt-dock-label:active { cursor: grabbing; }
        .yt-dock-label .drag-hint {
          margin-left: auto;
          font-size: 0.7rem;
          opacity: 0.4;
        }

        /* Hide/show toggle button */
        .yt-dock-toggle {
          margin-left: 0.5rem;
          font-size: 0.75rem;
          color: var(--muted);
          background: none;
          border: 1px solid var(--border);
          border-radius: 3px;
          padding: 0.1em 0.45em;
          cursor: pointer;
          font-family: var(--font);
          line-height: 1.5;
          flex-shrink: 0;
          opacity: 0.6;
          transition: opacity 0.1s;
        }
        .yt-dock-toggle:hover { opacity: 1; }

        .yt-dock iframe {
          display: block;
          width: 100%;
          height: 213px;
          border: none;
          pointer-events: none;
          transition: height 0.2s ease;
        }
        .yt-dock.dragging iframe { pointer-events: none; }

        /* snap zone indicators */
        .snap-indicator {
          position: fixed;
          background: rgba(0,0,0,0.06);
          border: 2px dashed var(--border);
          border-radius: 8px;
          z-index: 40;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.15s;
        }
        .snap-indicator.visible { opacity: 1; }

        /* mobile snap indicators are full-width bars */
        @media (max-width: 600px) {
          .snap-indicator {
            border-radius: 0;
            border-left: none;
            border-right: none;
          }
        }
      `,
				}}
			/>
		</head>
		<body>
			<div class="wrapper">
				<main class="prose">
					{children}
				</main>
			</div>

			<div class="yt-dock" id="yt-dock">
				<div class="yt-dock-label" id="yt-handle">
					🎮 focus mode
					<span class="drag-hint">drag to snap</span>
					<button class="yt-dock-toggle" id="yt-toggle" title="Toggle video">hide</button>
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

			<script
				dangerouslySetInnerHTML={{
					__html: `
          /* ── Anchor injection ── */
          document.querySelectorAll('.prose h2, .prose h3').forEach(h => {
            if (!h.id) {
              h.id = h.textContent
                .toLowerCase()
                .replace(/[^\\w\\s-]/g, '')
                .trim()
                .replace(/\\s+/g, '-');
            }
            const a = document.createElement('a');
            a.className = 'anchor';
            a.href = '#' + h.id;
            a.textContent = '#';
            h.prepend(a);
          });

          /* ── Hide / show toggle ── */
          const toggleBtn = document.getElementById('yt-toggle');
          const dockEl    = document.getElementById('yt-dock');
          let collapsed   = false;

          toggleBtn.addEventListener('click', e => {
            // Don't let the click bubble up to the drag handle
            e.stopPropagation();
            collapsed = !collapsed;
            dockEl.classList.toggle('collapsed', collapsed);
            toggleBtn.textContent = collapsed ? 'show' : 'hide';
          });

          /* Stop mousedown/touchstart on the toggle from starting a drag */
          toggleBtn.addEventListener('mousedown',  e => e.stopPropagation());
          toggleBtn.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });

          /* -────────────────────────────────────────
             Dock drag + snap
          ─────────────────────────────────────────*/
          const GAP = 20;
          const CORNER_SNAP_THRESHOLD = 160;

          const dock   = dockEl;
          const handle = document.getElementById('yt-handle');

          const ind = {
            tl: document.getElementById('snap-tl'),
            tr: document.getElementById('snap-tr'),
            bl: document.getElementById('snap-bl'),
            br: document.getElementById('snap-br'),
          };

          const isMobile = () => window.innerWidth <= 600;
          const vw = () => window.innerWidth;
          const vh = () => window.innerHeight;
          const dockW = () => dock.offsetWidth;
          const dockH = () => dock.offsetHeight;

          /* ── Position helpers ── */
          function setPos(x, y) {
            dock.style.top    = y + 'px';
            dock.style.left   = isMobile() ? '0' : x + 'px';
            dock.style.right  = 'auto';
            dock.style.bottom = 'auto';
            dock.style.width  = '';
          }

          /* ── Corner positions (desktop) ── */
          const corners = {
            tl: () => ({ x: GAP,              y: GAP }),
            tr: () => ({ x: vw()-dockW()-GAP, y: GAP }),
            bl: () => ({ x: GAP,              y: vh()-dockH()-GAP }),
            br: () => ({ x: vw()-dockW()-GAP, y: vh()-dockH()-GAP }),
          };

          function nearestCorner(dx, dy) {
            const dc = {
              tl: [dx,        dy       ],
              tr: [dx+dockW(),dy       ],
              bl: [dx,        dy+dockH()],
              br: [dx+dockW(),dy+dockH()],
            };
            const sc = {
              tl: [0,    0   ],
              tr: [vw(), 0   ],
              bl: [0,    vh()],
              br: [vw(), vh()],
            };
            let best = null, bestD = Infinity;
            for (const k of ['tl','tr','bl','br']) {
              const d = Math.hypot(dc[k][0]-sc[k][0], dc[k][1]-sc[k][1]);
              if (d < bestD) { bestD = d; best = k; }
            }
            return bestD < CORNER_SNAP_THRESHOLD ? best : null;
          }

          function closestCorner(dx, dy) {
            const dc = {
              tl: [dx,        dy       ],
              tr: [dx+dockW(),dy       ],
              bl: [dx,        dy+dockH()],
              br: [dx+dockW(),dy+dockH()],
            };
            const sc = {
              tl: [0,    0   ],
              tr: [vw(), 0   ],
              bl: [0,    vh()],
              br: [vw(), vh()],
            };
            let best = 'tr', bestD = Infinity;
            for (const k of ['tl','tr','bl','br']) {
              const d = Math.hypot(dc[k][0]-sc[k][0], dc[k][1]-sc[k][1]);
              if (d < bestD) { bestD = d; best = k; }
            }
            return best;
          }

          /* ── Mobile: top or bottom bar ── */
          function mobileZone(dy) {
            return (dy + dockH() / 2) < vh() / 2 ? 'top' : 'bottom';
          }
          const mobileY = { top: () => 0, bottom: () => vh() - dockH() };

          /* ── Snap indicators ── */
          function showIndicators() {
            if (isMobile()) {
              ind.tr.style.display = 'none';
              ind.br.style.display = 'none';
              const h = dockH();
              ind.tl.style.cssText = \`display:block;width:100%;height:\${h}px;left:0;top:0;border-radius:0;border-left:none;border-right:none;\`;
              ind.bl.style.cssText = \`display:block;width:100%;height:\${h}px;left:0;top:\${vh()-h}px;border-radius:0;border-left:none;border-right:none;\`;
              ind.tl.classList.add('visible');
              ind.bl.classList.add('visible');
            } else {
              ind.tr.style.display = '';
              ind.br.style.display = '';
              const w = dockW(), h = dockH();
              for (const [k, pos] of Object.entries(corners)) {
                const p = pos();
                ind[k].style.cssText = \`left:\${p.x}px;top:\${p.y}px;width:\${w}px;height:\${h}px;\`;
                ind[k].classList.add('visible');
              }
            }
          }

          function hideIndicators() {
            for (const el of Object.values(ind)) {
              el.classList.remove('visible');
              el.style.background = '';
            }
          }

          function highlightIndicator(active) {
            if (isMobile()) {
              ind.tl.style.background = active === 'top'    ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.04)';
              ind.bl.style.background = active === 'bottom' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.04)';
            } else {
              for (const [k, el] of Object.entries(ind)) {
                el.style.background = active === k ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.04)';
              }
            }
          }

          /* ── Snap to named position ── */
          function snapTo(key) {
            dock.classList.add('snapping');
            if (key === 'top' || key === 'bottom') {
              setPos(0, mobileY[key]());
            } else {
              const p = corners[key]();
              setPos(p.x, p.y);
            }
            setTimeout(() => dock.classList.remove('snapping'), 200);
          }

          /* ── Init ── */
          window.addEventListener('load', () => {
            if (isMobile()) {
              setPos(0, 0);
            } else {
              const r = dock.getBoundingClientRect();
              setPos(r.left, r.top);
            }
          });

          /* ── Drag ── */
          let dragging = false, ox = 0, oy = 0, activeSnap = null;

          function onDragStart(cx, cy) {
            dragging = true;
            dock.classList.add('dragging');
            const r = dock.getBoundingClientRect();
            ox = cx - r.left;
            oy = cy - r.top;
            showIndicators();
          }

          function onDragMove(cx, cy) {
            if (!dragging) return;
            let x = cx - ox;
            let y = cy - oy;

            if (isMobile()) {
              x = 0;
              y = Math.max(0, Math.min(vh() - dockH(), y));
              setPos(x, y);
              activeSnap = mobileZone(y);
              highlightIndicator(activeSnap);
            } else {
              x = Math.max(0, Math.min(vw() - dockW(), x));
              y = Math.max(0, Math.min(vh() - dockH(), y));
              setPos(x, y);
              activeSnap = nearestCorner(x, y);
              highlightIndicator(activeSnap);
            }
          }

          function onDragEnd() {
            if (!dragging) return;
            dragging = false;
            dock.classList.remove('dragging');
            hideIndicators();

            if (activeSnap) {
              snapTo(activeSnap);
            } else {
              const r = dock.getBoundingClientRect();
              if (isMobile()) {
                snapTo(mobileZone(r.top));
              } else {
                snapTo(closestCorner(r.left, r.top));
              }
            }
            activeSnap = null;
          }

          /* mouse */
          handle.addEventListener('mousedown', e => { e.preventDefault(); onDragStart(e.clientX, e.clientY); });
          document.addEventListener('mousemove', e => onDragMove(e.clientX, e.clientY));
          document.addEventListener('mouseup', onDragEnd);

          /* touch */
          handle.addEventListener('touchstart', e => {
            e.preventDefault();
            onDragStart(e.touches[0].clientX, e.touches[0].clientY);
          }, { passive: false });

          document.addEventListener('touchmove', e => {
            if (!dragging) return;
            e.preventDefault();
            onDragMove(e.touches[0].clientX, e.touches[0].clientY);
          }, { passive: false });

          document.addEventListener('touchend', onDragEnd);
        `,
				}}
			/>
		</body>
	</html>
)