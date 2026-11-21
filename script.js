// ===== SETTINGS (edit these) =====
const EMAIL = "youremail@example.com";
const FORMSPREE_URL = "https://formspree.io/f/YOUR_FORM_ID"; // see README
// =================================

// Fill in email links
document.querySelectorAll("[data-email]").forEach(a => { a.href = "mailto:" + EMAIL; a.textContent = EMAIL; });

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
