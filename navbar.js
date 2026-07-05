(() => {
  const active = window.location.pathname.split('/').pop() || 'index.html';
  const isMain = active === '' || active === 'index.html' || active === '/';
  const isCalculator = active === 'calculator.html';
  const isSpend = active === 'spend.html';
  const isAbout = active === 'about.html';

  const pages = [
    { href: '/', label: 'Live', active: isMain },
    { href: 'calculator.html', label: 'Calculator', active: isCalculator },
    { href: 'spend.html', label: 'Spend', active: isSpend },
    { href: 'about.html', label: 'About', active: isAbout },
  ];

  let links = '';
  for (const p of pages) {
    let cls = 'text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 border transition no-underline';
    if (p.active) {
      cls += ' border-white/30 text-white';
    } else {
      cls += ' border-transparent text-white/30 hover:text-white hover:border-white/15';
    }
    links += '<a href="' + p.href + '" class="' + cls + '">' + p.label + '</a>';
  }

  const nav = document.createElement('nav');
  nav.className = 'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4';
  nav.style.background = 'linear-gradient(180deg,rgba(10,10,10,0.95) 60%,transparent)';
  nav.innerHTML =
    '<a href="/" class="text-xs font-extrabold tracking-wider text-white/50 uppercase no-underline">LETS CALCULATE <span class="text-accent">MBG</span>!</a>' +
    '<div class="flex gap-1">' + links + '</div>';

  document.body.insertBefore(nav, document.body.firstChild);
})();
