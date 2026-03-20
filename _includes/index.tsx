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

        html { scroll-behavior: smooth; }

        body {
          font-family: var(--font);
          background: var(--bg);
          color: var(--text);
          font-size: 1.05rem;
          line-height: 1.8;
          padding: 0 2rem;
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
          transition: box-shadow 0.15s, top 0.18s ease, left 0.18s ease, right 0.18s ease, bottom 0.18s ease;
        }
        .yt-dock.snapping {
          transition: box-shadow 0.15s, top 0.18s ease, left 0.18s ease, right 0.18s ease, bottom 0.18s ease;
        }
        .yt-dock.dragging {
          transition: box-shadow 0.15s;
          box-shadow: 0 12px 40px rgba(0,0,0,0.2);
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
        }
        .yt-dock-label:active { cursor: grabbing; }
        .yt-dock-label .drag-hint {
          margin-left: auto;
          font-size: 0.7rem;
          opacity: 0.4;
        }
        .yt-dock iframe {
          display: block;
          width: 100%;
          height: 213px;
          border: none;
          pointer-events: none;
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
				</div>
				<iframe
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

          /* ── Snap zones ── */
          const GAP = 20;
          const SNAP_THRESHOLD = 120; // px from edge to trigger snap preview

          const dock   = document.getElementById('yt-dock');
          const handle = document.getElementById('yt-handle');
          const indicators = {
            tl: document.getElementById('snap-tl'),
            tr: document.getElementById('snap-tr'),
            bl: document.getElementById('snap-bl'),
            br: document.getElementById('snap-br'),
          };

          function dockW() { return dock.offsetWidth; }
          function dockH() { return dock.offsetHeight; }
          function vw()    { return window.innerWidth; }
          function vh()    { return window.innerHeight; }

          const snapPositions = {
            tl: () => ({ left: GAP,               top: GAP }),
            tr: () => ({ left: vw()-dockW()-GAP,  top: GAP }),
            bl: () => ({ left: GAP,               top: vh()-dockH()-GAP }),
            br: () => ({ left: vw()-dockW()-GAP,  top: vh()-dockH()-GAP }),
          };

          function sizeIndicators() {
            const w = dockW(), h = dockH();
            Object.entries(snapPositions).forEach(([k, pos]) => {
              const p = pos();
              const el = indicators[k];
              el.style.left   = p.left + 'px';
              el.style.top    = p.top  + 'px';
              el.style.width  = w + 'px';
              el.style.height = h + 'px';
            });
          }

          function nearestSnap(x, y) {
            // x,y = current dock top-left
            let best = null, bestDist = Infinity;
            Object.entries(snapPositions).forEach(([k, pos]) => {
              const p = pos();
              const d = Math.hypot(x - p.left, y - p.top);
              if (d < bestDist) { bestDist = d; best = k; }
            });
            return bestDist < SNAP_THRESHOLD ? best : null;
          }

          function applyPos(x, y) {
            dock.style.left = x + 'px';
            dock.style.top  = y + 'px';
            dock.style.right  = 'auto';
            dock.style.bottom = 'auto';
          }

          function snapTo(key) {
            const p = snapPositions[key]();
            dock.classList.add('snapping');
            applyPos(p.left, p.top);
            setTimeout(() => dock.classList.remove('snapping'), 200);
          }

          // init position from CSS (top/right) → convert to left/top
          window.addEventListener('load', () => {
            sizeIndicators();
            const r = dock.getBoundingClientRect();
            applyPos(r.left, r.top);
          });

          let dragging = false, ox = 0, oy = 0, lastSnap = null;

          function startDrag(cx, cy) {
            sizeIndicators();
            dragging = true;
            dock.classList.add('dragging');
            const r = dock.getBoundingClientRect();
            applyPos(r.left, r.top);
            ox = cx - r.left;
            oy = cy - r.top;
            Object.values(indicators).forEach(el => el.classList.add('visible'));
          }

          function moveDrag(cx, cy) {
            if (!dragging) return;
            let x = cx - ox;
            let y = cy - oy;
            x = Math.max(0, Math.min(vw() - dockW(), x));
            y = Math.max(0, Math.min(vh() - dockH(), y));
            applyPos(x, y);

            // highlight nearest snap zone
            const snap = nearestSnap(x, y);
            Object.entries(indicators).forEach(([k, el]) => {
              el.style.background = (snap === k)
                ? 'rgba(0,0,0,0.1)'
                : 'rgba(0,0,0,0.04)';
            });
            lastSnap = snap;
          }

          function endDrag() {
            if (!dragging) return;
            dragging = false;
            dock.classList.remove('dragging');
            Object.values(indicators).forEach(el => {
              el.classList.remove('visible');
              el.style.background = '';
            });
            if (lastSnap) snapTo(lastSnap);
            lastSnap = null;
          }

          handle.addEventListener('mousedown', e => { startDrag(e.clientX, e.clientY); e.preventDefault(); });
          document.addEventListener('mousemove', e => moveDrag(e.clientX, e.clientY));
          document.addEventListener('mouseup', endDrag);

          handle.addEventListener('touchstart', e => {
            const t = e.touches[0];
            startDrag(t.clientX, t.clientY);
          }, { passive: true });
          document.addEventListener('touchmove', e => {
            const t = e.touches[0];
            moveDrag(t.clientX, t.clientY);
          }, { passive: true });
          document.addEventListener('touchend', endDrag);
        `,
				}}
			/>
		</body>
	</html>
)
