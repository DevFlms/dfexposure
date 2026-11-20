// ===== SETTINGS (edit these) =====
const EMAIL = "youremail@example.com";
const FORMSPREE_URL = "https://formspree.io/f/YOUR_FORM_ID"; // see README
// =================================

// Fill in email links
document.querySelectorAll("[data-email]").forEach(a => { a.href = "mailto:" + EMAIL; a.textContent = EMAIL; });

// Gallery
const featured = document.getElementById("featured");
const gallery = document.getElementById("gallery");
const target = featured || gallery;
let works = [];

function card(w) {
  const fig = document.createElement("figure");
  fig.className = "item";
  let media;
  if (w.youtube) {
    media = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(w.youtube)}" title="${w.title || "Video"}" loading="lazy" allowfullscreen></iframe>`;
  } else if (w.type === "video") {
    media = `<video src="${w.src}" ${w.poster ? `poster="${w.poster}"` : ""} controls preload="metadata" playsinline></video>`;
  } else {
    media = `<img src="${w.src}" alt="${w.title || "Photograph"}" loading="lazy">`;
    fig.dataset.full = w.src;
  }
  fig.innerHTML = media + (w.title ? `<figcaption>${w.title}</figcaption>` : "");
  return fig;
}

function render(filter = "all") {
  let list = works;
  if (featured) list = works.filter(w => w.featured).slice(0, 6);
  if (filter !== "all") list = list.filter(w => w.type === filter);
  target.innerHTML = "";
  if (!list.length) {
    target.innerHTML = '<p class="empty">New work is on its way.</p>';
    return;
  }
  list.forEach(w => target.appendChild(card(w)));
}

if (target) {
  fetch("work.json", { cache: "no-cache" })
    .then(r => r.json())
    .then(d => { works = d; render(); })
    .catch(() => { target.innerHTML = '<p class="empty">New work is on its way.</p>'; });
}

document.querySelectorAll(".filters button").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll(".filters button").forEach(x => x.setAttribute("aria-pressed", "false"));
  b.setAttribute("aria-pressed", "true");
  render(b.dataset.filter);
}));

// Lightbox for photos
const lb = document.getElementById("lightbox");
if (lb) {
  document.addEventListener("click", e => {
    const it = e.target.closest(".item[data-full]");
    if (it) { lb.querySelector("img").src = it.dataset.full; lb.classList.add("on"); }
    else if (e.target.closest("#lightbox")) lb.classList.remove("on");
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") lb.classList.remove("on"); });
}

// Query form
const form = document.getElementById("query-form");
if (form) {
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const status = document.getElementById("status");
    const data = new FormData(form);
    if (data.get("website")) return; // spam trap
    if (FORMSPREE_URL.includes("YOUR_FORM_ID")) {
      const body = [...data.entries()].filter(([k]) => k !== "website").map(([k, v]) => `${k}: ${v}`).join("\n");
      location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Query from " + data.get("name"))}&body=${encodeURIComponent(body)}`;
      return;
    }
    status.textContent = "Sending…";
    try {
      const r = await fetch(FORMSPREE_URL, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (r.ok) { form.reset(); status.textContent = "Sent. I'll reply by email soon."; }
      else throw new Error();
    } catch {
      status.textContent = "That didn't send. Email me directly at " + EMAIL + ".";
    }
  });
}
