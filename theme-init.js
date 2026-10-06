// Apply the stored theme before first paint (kept out of index.html so the CSP needs no inline script).
try {
  var t = localStorage.getItem('bz-theme');
  if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
} catch (e) {}
