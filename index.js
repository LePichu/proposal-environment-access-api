// deno-lint-ignore-file no-window no-window-prefix
document.querySelectorAll(".prose h2, .prose h3").forEach((h) => {
	if (!h.id) {
		h.id = h.textContent
			.toLowerCase()
			.replace(/[^\w\s-]/g, "")
			.trim()
			.replace(/\s+/g, "-")
	}
	const a = document.createElement("a")
	a.className = "anchor"
	a.href = "#" + h.id
	a.textContent = "#"
	h.prepend(a)
})

const toggleBtn = document.getElementById("yt-toggle")
const dockEl = document.getElementById("yt-dock")
let collapsed = true

toggleBtn.addEventListener("click", (e) => {
	e.stopPropagation()
	collapsed = !collapsed
	dockEl.classList.toggle("collapsed", collapsed)
	toggleBtn.textContent = collapsed ? "show" : "hide"
})

toggleBtn.addEventListener("mousedown", (e) => e.stopPropagation())
toggleBtn.addEventListener("touchstart", (e) => e.stopPropagation(), {
	passive: true,
})

const GAP = 20
const CORNER_SNAP_THRESHOLD = 160

const dock = dockEl
const handle = document.getElementById("yt-handle")

const ind = {
	tl: document.getElementById("snap-tl"),
	tr: document.getElementById("snap-tr"),
	bl: document.getElementById("snap-bl"),
	br: document.getElementById("snap-br"),
}

const isMobile = () => window.innerWidth <= 600
const vw = () => window.innerWidth
const vh = () => window.innerHeight
const dockW = () => dock.offsetWidth
const dockH = () => dock.offsetHeight

function setPos(x, y) {
	dock.style.top = y + "px"
	dock.style.left = isMobile() ? "0" : x + "px"
	dock.style.right = "auto"
	dock.style.bottom = "auto"
	dock.style.width = ""
}

const corners = {
	tl: () => ({ x: GAP, y: GAP }),
	tr: () => ({ x: vw() - dockW() - GAP, y: GAP }),
	bl: () => ({ x: GAP, y: vh() - dockH() - GAP }),
	br: () => ({ x: vw() - dockW() - GAP, y: vh() - dockH() - GAP }),
}

function nearestCorner(dx, dy) {
	const dc = {
		tl: [dx, dy],
		tr: [dx + dockW(), dy],
		bl: [dx, dy + dockH()],
		br: [dx + dockW(), dy + dockH()],
	}
	const sc = {
		tl: [0, 0],
		tr: [vw(), 0],
		bl: [0, vh()],
		br: [vw(), vh()],
	}
	let best = null, bestD = Infinity
	for (const k of ["tl", "tr", "bl", "br"]) {
		const d = Math.hypot(dc[k][0] - sc[k][0], dc[k][1] - sc[k][1])
		if (d < bestD) {
			bestD = d
			best = k
		}
	}
	return bestD < CORNER_SNAP_THRESHOLD ? best : null
}

function closestCorner(dx, dy) {
	const dc = {
		tl: [dx, dy],
		tr: [dx + dockW(), dy],
		bl: [dx, dy + dockH()],
		br: [dx + dockW(), dy + dockH()],
	}
	const sc = {
		tl: [0, 0],
		tr: [vw(), 0],
		bl: [0, vh()],
		br: [vw(), vh()],
	}
	let best = "tr", bestD = Infinity
	for (const k of ["tl", "tr", "bl", "br"]) {
		const d = Math.hypot(dc[k][0] - sc[k][0], dc[k][1] - sc[k][1])
		if (d < bestD) {
			bestD = d
			best = k
		}
	}
	return best
}

function mobileZone(dy) {
	return (dy + dockH() / 2) < vh() / 2 ? "top" : "bottom"
}
const mobileY = { top: () => 0, bottom: () => vh() - dockH() }

function showIndicators() {
	if (isMobile()) {
		ind.tr.style.display = "none"
		ind.br.style.display = "none"
		const h = dockH()
		ind.tl.style.cssText =
			`display:block;width:100%;height:${h}px;left:0;top:0;border-radius:0;border-left:none;border-right:none;`
		ind.bl.style.cssText = `display:block;width:100%;height:${h}px;left:0;top:${
			vh() - h
		}px;border-radius:0;border-left:none;border-right:none;`
		ind.tl.classList.add("visible")
		ind.bl.classList.add("visible")
	} else {
		ind.tr.style.display = ""
		ind.br.style.display = ""
		const w = dockW(), h = dockH()
		for (const [k, pos] of Object.entries(corners)) {
			const p = pos()
			ind[k].style.cssText =
				`left:${p.x}px;top:${p.y}px;width:${w}px;height:${h}px;`
			ind[k].classList.add("visible")
		}
	}
}

function hideIndicators() {
	for (const el of Object.values(ind)) {
		el.classList.remove("visible")
		el.style.background = ""
	}
}

function highlightIndicator(active) {
	if (isMobile()) {
		ind.tl.style.background = active === "top"
			? "rgba(0,0,0,0.1)"
			: "rgba(0,0,0,0.04)"
		ind.bl.style.background = active === "bottom"
			? "rgba(0,0,0,0.1)"
			: "rgba(0,0,0,0.04)"
	} else {
		for (const [k, el] of Object.entries(ind)) {
			el.style.background = active === k
				? "rgba(0,0,0,0.1)"
				: "rgba(0,0,0,0.04)"
		}
	}
}

function snapTo(key) {
	dock.classList.add("snapping")
	if (key === "top" || key === "bottom") {
		setPos(0, mobileY[key]())
	} else {
		const p = corners[key]()
		setPos(p.x, p.y)
	}
	setTimeout(() => dock.classList.remove("snapping"), 200)
}

window.addEventListener("load", () => {
	if (isMobile()) {
		setPos(0, 0)
	} else {
		const r = dock.getBoundingClientRect()
		setPos(r.left, r.top)
	}
})

let dragging = false, ox = 0, oy = 0, activeSnap = null

function onDragStart(cx, cy) {
	dragging = true
	dock.classList.add("dragging")
	const r = dock.getBoundingClientRect()
	ox = cx - r.left
	oy = cy - r.top
	showIndicators()
}

function onDragMove(cx, cy) {
	if (!dragging) return
	let x = cx - ox
	let y = cy - oy

	if (isMobile()) {
		x = 0
		y = Math.max(0, Math.min(vh() - dockH(), y))
		setPos(x, y)
		activeSnap = mobileZone(y)
		highlightIndicator(activeSnap)
	} else {
		x = Math.max(0, Math.min(vw() - dockW(), x))
		y = Math.max(0, Math.min(vh() - dockH(), y))
		setPos(x, y)
		activeSnap = nearestCorner(x, y)
		highlightIndicator(activeSnap)
	}
}

function onDragEnd() {
	if (!dragging) return
	dragging = false
	dock.classList.remove("dragging")
	hideIndicators()

	if (activeSnap) {
		snapTo(activeSnap)
	} else {
		const r = dock.getBoundingClientRect()
		if (isMobile()) {
			snapTo(mobileZone(r.top))
		} else {
			snapTo(closestCorner(r.left, r.top))
		}
	}
	activeSnap = null
}

handle.addEventListener("mousedown", (e) => {
	e.preventDefault()
	onDragStart(e.clientX, e.clientY)
})
document.addEventListener("mousemove", (e) => onDragMove(e.clientX, e.clientY))
document.addEventListener("mouseup", onDragEnd)

handle.addEventListener("touchstart", (e) => {
	e.preventDefault()
	onDragStart(e.touches[0].clientX, e.touches[0].clientY)
}, { passive: false })

document.addEventListener("touchmove", (e) => {
	if (!dragging) return
	e.preventDefault()
	onDragMove(e.touches[0].clientX, e.touches[0].clientY)
}, { passive: false })

document.addEventListener("touchend", onDragEnd)
