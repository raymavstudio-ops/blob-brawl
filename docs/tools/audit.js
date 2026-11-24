// Re-implementation of Phone Lab's documented audit-probe checks (README "The audit probe").
window.audit = function (label, minTap) {
  const out = [], vw = innerWidth, vh = innerHeight;
  const vis = el => { const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) return false;
    let p = el; while (p && p !== document.body) { if (getComputedStyle(p).display === 'none') return false; p = p.parentElement } const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 };
  const vp = document.querySelector('meta[name=viewport]');
  if (!vp) out.push('ERROR missing viewport meta'); else if (!/viewport-fit=cover/.test(vp.content)) out.push('WARN viewport-fit=cover missing');
  if (document.documentElement.scrollWidth > vw + 1) out.push(`ERROR horizontal overflow ${document.documentElement.scrollWidth}>${vw}`);
  const inter = [...document.querySelectorAll('button,input,a,.mode,.switch,[onclick]')].filter(vis);
  for (const el of inter) {
    const r = el.getBoundingClientRect(), name = (el.id ? '#' + el.id : el.className ? '.' + String(el.className).split(' ')[0] : el.tagName) + ' "' + (el.innerText || el.placeholder || '').trim().slice(0, 18) + '"';
    if (r.width < minTap || r.height < minTap) out.push(`WARN small tap target ${name} ${Math.round(r.width)}x${Math.round(r.height)} (<${minTap})`);
    // clipped: outside viewport, and not inside a scrollable container that can reveal it
    let scroller = el.closest('.screen'); const canScroll = scroller && scroller.scrollHeight > scroller.clientHeight + 1;
    if ((r.right > vw + 1 || r.left < -1 || r.bottom > vh + 1 || r.top < -1) && !canScroll) out.push(`ERROR clipped ${name} rect ${Math.round(r.left)},${Math.round(r.top)},${Math.round(r.right)},${Math.round(r.bottom)}`);
    if ((r.bottom > vh + 1) && canScroll) out.push(`INFO needs scroll to reach ${name}`);
  }
  for (let i = 0; i < inter.length; i++) for (let j = i + 1; j < inter.length; j++) {
    const a = inter[i].getBoundingClientRect(), b = inter[j].getBoundingClientRect();
    if (inter[i].contains(inter[j]) || inter[j].contains(inter[i])) continue;
    const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
    if (ox > 2 && oy > 2) out.push(`WARN overlapping controls ${inter[i].id || inter[i].className} / ${inter[j].id || inter[j].className}`);
  }
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n, small = new Set();
  while (n = walker.nextNode()) { const el = n.parentElement; if (!n.textContent.trim() || !el || !vis(el)) continue; const fs = parseFloat(getComputedStyle(el).fontSize); if (fs < 12) small.add(`${el.tagName}.${el.className} ${fs}px "${n.textContent.trim().slice(0, 20)}"`) }
  small.forEach(t => out.push('WARN tiny text ' + t));
  return label + ' [' + vw + 'x' + vh + ']: ' + (out.length ? out.join(' | ') : 'clean');
};
window.hudCheck = function () { // canvas text is invisible to a DOM probe, so report the HUD's effective CSS font sizes
  const kc = Math.min(innerHeight / 500, innerWidth / 1060, 1.4);
  return `HUD scale ${kc.toFixed(2)}: chip names ${(17 * kc).toFixed(1)}px, scores ${(22 * kc).toFixed(1)}px, status ${(21 * kc).toFixed(1)}px, timer ${(44 * kc).toFixed(1)}px; labels 14px fixed`;
};
