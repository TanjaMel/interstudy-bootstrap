// Minimal client-side router using Fetch + History API

const routes = {
  "/": "/pages/home.html",
  "/finland": "/pages/finland.html",
  "/austria": "/pages/austria.html",
};

// Load and inject page into <main>
async function loadRoute(pathname, replaceState = false) {
  const target = routes[pathname] || routes["/"];
  try {
    const res = await fetch(target, { cache: "no-cache" });
    if (!res.ok) throw new Error(res.statusText);
    const html = await res.text();
    document.getElementById("app").innerHTML = html;
    document.title = "My Site – " + (pathname === "/" ? "Home" : pathname.slice(1));
    if (!replaceState) history.pushState({ path: pathname }, "", pathname);
  } catch (e) {
    document.getElementById("app").innerHTML = `<h1>404</h1><p>Page not found.</p>`;
    document.title = "My Site – 404";
  }
}

// Intercept internal links
function handleLinkClick(e) {
  const a = e.target.closest("a[data-link]");
  if (!a) return;
  const url = new URL(a.href);
  // Only handle same-origin navigations
  if (url.origin === location.origin) {
    e.preventDefault();
    loadRoute(url.pathname);
  }
}

// Handle back/forward
window.addEventListener("popstate", (e) => {
  const path = e.state?.path || location.pathname;
  loadRoute(path, /*replaceState*/ true);
});

// Initial load
window.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", handleLinkClick);
  // Normalize to known route (supports direct deep links /about)
  const initial = routes[location.pathname] ? location.pathname : "/";
  loadRoute(initial, /*replaceState*/ true);
});
