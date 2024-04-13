(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode("._App_9g4xh_1{text-align:center}._logo_9g4xh_5{animation:_logo-spin_9g4xh_1 infinite 20s linear;height:40vmin;pointer-events:none}._header_9g4xh_11{background-color:#282c34;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:calc(10px + 2vmin);color:#fff}._link_9g4xh_22{color:#b318f0}@keyframes _logo-spin_9g4xh_1{0%{transform:rotate(0)}to{transform:rotate(360deg)}}")),document.head.appendChild(e)}}catch(n){console.error("vite-plugin-css-injected-by-js",n)}})();
let z = D;
const y = 1, b = 2, L = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var c = null;
let N = null, F = null, d = null, p = null, g = null, m = 0;
function P(e, t) {
  const l = d, n = c, o = e.length === 0, s = t === void 0 ? n : t, f = o ? L : {
    owned: null,
    cleanups: null,
    context: s ? s.context : null,
    owner: s
  }, i = o ? e : () => e(() => E(() => _(f)));
  c = f, d = null;
  try {
    return v(i, !0);
  } finally {
    d = l, c = n;
  }
}
function S(e, t, l) {
  const n = V(e, t, !1, y);
  O(n);
}
function E(e) {
  if (d === null)
    return e();
  const t = d;
  d = null;
  try {
    return e();
  } finally {
    d = t;
  }
}
function H(e, t, l) {
  let n = e.value;
  return (!e.comparator || !e.comparator(n, t)) && (e.value = t, e.observers && e.observers.length && v(() => {
    for (let o = 0; o < e.observers.length; o += 1) {
      const s = e.observers[o], f = N && N.running;
      f && N.disposed.has(s), (f ? !s.tState : !s.state) && (s.pure ? p.push(s) : g.push(s), s.observers && I(s)), f || (s.state = y);
    }
    if (p.length > 1e6)
      throw p = [], new Error();
  }, !1)), t;
}
function O(e) {
  if (!e.fn)
    return;
  _(e);
  const t = m;
  Q(e, e.value, t);
}
function Q(e, t, l) {
  let n;
  const o = c, s = d;
  d = c = e;
  try {
    n = e.fn(t);
  } catch (f) {
    return e.pure && (e.state = y, e.owned && e.owned.forEach(_), e.owned = null), e.updatedAt = l + 1, R(f);
  } finally {
    d = s, c = o;
  }
  (!e.updatedAt || e.updatedAt <= l) && (e.updatedAt != null && "observers" in e ? H(e, n) : e.value = n, e.updatedAt = l);
}
function V(e, t, l, n = y, o) {
  const s = {
    fn: e,
    state: n,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: c,
    context: c ? c.context : null,
    pure: l
  };
  return c === null || c !== L && (c.owned ? c.owned.push(s) : c.owned = [s]), s;
}
function $(e) {
  if (e.state === 0)
    return;
  if (e.state === b)
    return T(e);
  if (e.suspense && E(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < m); )
    e.state && t.push(e);
  for (let l = t.length - 1; l >= 0; l--)
    if (e = t[l], e.state === y)
      O(e);
    else if (e.state === b) {
      const n = p;
      p = null, v(() => T(e, t[0]), !1), p = n;
    }
}
function v(e, t) {
  if (p)
    return e();
  let l = !1;
  t || (p = []), g ? l = !0 : g = [], m++;
  try {
    const n = e();
    return W(l), n;
  } catch (n) {
    l || (g = null), p = null, R(n);
  }
}
function W(e) {
  if (p && (D(p), p = null), e)
    return;
  const t = g;
  g = null, t.length && v(() => z(t), !1);
}
function D(e) {
  for (let t = 0; t < e.length; t++)
    $(e[t]);
}
function T(e, t) {
  e.state = 0;
  for (let l = 0; l < e.sources.length; l += 1) {
    const n = e.sources[l];
    if (n.sources) {
      const o = n.state;
      o === y ? n !== t && (!n.updatedAt || n.updatedAt < m) && $(n) : o === b && T(n, t);
    }
  }
}
function I(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const l = e.observers[t];
    l.state || (l.state = b, l.pure ? p.push(l) : g.push(l), l.observers && I(l));
  }
}
function _(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const l = e.sources.pop(), n = e.sourceSlots.pop(), o = l.observers;
      if (o && o.length) {
        const s = o.pop(), f = l.observerSlots.pop();
        n < o.length && (s.sourceSlots[f] = n, o[n] = s, l.observerSlots[n] = f);
      }
    }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--)
      _(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0;
}
function k(e) {
  return e instanceof Error ? e : new Error(typeof e == "string" ? e : "Unknown error", {
    cause: e
  });
}
function R(e, t = c) {
  throw k(e);
}
function q(e, t) {
  return E(() => e(t || {}));
}
function J(e, t, l) {
  let n = l.length, o = t.length, s = n, f = 0, i = 0, r = t[o - 1].nextSibling, u = null;
  for (; f < o || i < s; ) {
    if (t[f] === l[i]) {
      f++, i++;
      continue;
    }
    for (; t[o - 1] === l[s - 1]; )
      o--, s--;
    if (o === f) {
      const a = s < n ? i ? l[i - 1].nextSibling : l[s - i] : r;
      for (; i < s; )
        e.insertBefore(l[i++], a);
    } else if (s === i)
      for (; f < o; )
        (!u || !u.has(t[f])) && t[f].remove(), f++;
    else if (t[f] === l[s - 1] && l[i] === t[o - 1]) {
      const a = t[--o].nextSibling;
      e.insertBefore(l[i++], t[f++].nextSibling), e.insertBefore(l[--s], a), t[o] = l[s];
    } else {
      if (!u) {
        u = /* @__PURE__ */ new Map();
        let h = i;
        for (; h < s; )
          u.set(l[h], h++);
      }
      const a = u.get(t[f]);
      if (a != null)
        if (i < a && a < s) {
          let h = f, U = 1, G;
          for (; ++h < o && h < s && !((G = u.get(t[h])) == null || G !== a + U); )
            U++;
          if (U > a - i) {
            const j = t[f];
            for (; i < a; )
              e.insertBefore(l[i++], j);
          } else
            e.replaceChild(l[i++], t[f++]);
        } else
          f++;
      else
        t[f++].remove();
    }
  }
}
function K(e, t, l, n = {}) {
  let o;
  return P((s) => {
    o = s, t === document ? e() : Z(t, e(), t.firstChild ? null : void 0, l);
  }, n.owner), () => {
    o(), t.textContent = "";
  };
}
function X(e, t, l) {
  let n;
  const o = () => {
    const f = document.createElement("template");
    return f.innerHTML = e, l ? f.content.firstChild.firstChild : f.content.firstChild;
  }, s = t ? () => E(() => document.importNode(n || (n = o()), !0)) : () => (n || (n = o())).cloneNode(!0);
  return s.cloneNode = s, s;
}
function Y(e, t, l) {
  l == null ? e.removeAttribute(t) : e.setAttribute(t, l);
}
function x(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function Z(e, t, l, n) {
  if (l !== void 0 && !n && (n = []), typeof t != "function")
    return C(e, t, n, l);
  S((o) => C(e, t(), o, l), n);
}
function C(e, t, l, n, o) {
  for (; typeof l == "function"; )
    l = l();
  if (t === l)
    return l;
  const s = typeof t, f = n !== void 0;
  if (e = f && l[0] && l[0].parentNode || e, s === "string" || s === "number")
    if (s === "number" && (t = t.toString()), f) {
      let i = l[0];
      i && i.nodeType === 3 ? i.data !== t && (i.data = t) : i = document.createTextNode(t), l = w(e, l, n, i);
    } else
      l !== "" && typeof l == "string" ? l = e.firstChild.data = t : l = e.textContent = t;
  else if (t == null || s === "boolean")
    l = w(e, l, n);
  else {
    if (s === "function")
      return S(() => {
        let i = t();
        for (; typeof i == "function"; )
          i = i();
        l = C(e, i, l, n);
      }), () => l;
    if (Array.isArray(t)) {
      const i = [], r = l && Array.isArray(l);
      if (B(i, t, l, o))
        return S(() => l = C(e, i, l, n, !0)), () => l;
      if (i.length === 0) {
        if (l = w(e, l, n), f)
          return l;
      } else
        r ? l.length === 0 ? M(e, i, n) : J(e, l, i) : (l && w(e), M(e, i));
      l = i;
    } else if (t.nodeType) {
      if (Array.isArray(l)) {
        if (f)
          return l = w(e, l, n, t);
        w(e, l, null, t);
      } else
        l == null || l === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      l = t;
    }
  }
  return l;
}
function B(e, t, l, n) {
  let o = !1;
  for (let s = 0, f = t.length; s < f; s++) {
    let i = t[s], r = l && l[s], u;
    if (!(i == null || i === !0 || i === !1))
      if ((u = typeof i) == "object" && i.nodeType)
        e.push(i);
      else if (Array.isArray(i))
        o = B(e, i, r) || o;
      else if (u === "function")
        if (n) {
          for (; typeof i == "function"; )
            i = i();
          o = B(e, Array.isArray(i) ? i : [i], Array.isArray(r) ? r : [r]) || o;
        } else
          e.push(i), o = !0;
      else {
        const a = String(i);
        r && r.nodeType === 3 && r.data === a ? e.push(r) : e.push(document.createTextNode(a));
      }
  }
  return o;
}
function M(e, t, l = null) {
  for (let n = 0, o = t.length; n < o; n++)
    e.insertBefore(t[n], l);
}
function w(e, t, l, n) {
  if (l === void 0)
    return e.textContent = "";
  const o = n || document.createTextNode("");
  if (t.length) {
    let s = !1;
    for (let f = t.length - 1; f >= 0; f--) {
      const i = t[f];
      if (o !== i) {
        const r = i.parentNode === e;
        !s && !f ? r ? e.replaceChild(o, i) : e.insertBefore(o, l) : r && i.remove();
      } else
        s = !0;
    }
  } else
    e.insertBefore(o, l);
  return [o];
}
const ee = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20166%20155.3'%3e%3cpath%20d='M163%2035S110-4%2069%205l-3%201c-6%202-11%205-14%209l-2%203-15%2026%2026%205c11%207%2025%2010%2038%207l46%209%2018-30z'%20fill='%2376b3e1'/%3e%3clinearGradient%20id='a'%20gradientUnits='userSpaceOnUse'%20x1='27.5'%20y1='3'%20x2='152'%20y2='63.5'%3e%3cstop%20offset='.1'%20stop-color='%2376b3e1'/%3e%3cstop%20offset='.3'%20stop-color='%23dcf2fd'/%3e%3cstop%20offset='1'%20stop-color='%2376b3e1'/%3e%3c/linearGradient%3e%3cpath%20d='M163%2035S110-4%2069%205l-3%201c-6%202-11%205-14%209l-2%203-15%2026%2026%205c11%207%2025%2010%2038%207l46%209%2018-30z'%20opacity='.3'%20fill='url(%23a)'/%3e%3cpath%20d='M52%2035l-4%201c-17%205-22%2021-13%2035%2010%2013%2031%2020%2048%2015l62-21S92%2026%2052%2035z'%20fill='%23518ac8'/%3e%3clinearGradient%20id='b'%20gradientUnits='userSpaceOnUse'%20x1='95.8'%20y1='32.6'%20x2='74'%20y2='105.2'%3e%3cstop%20offset='0'%20stop-color='%2376b3e1'/%3e%3cstop%20offset='.5'%20stop-color='%234377bb'/%3e%3cstop%20offset='1'%20stop-color='%231f3b77'/%3e%3c/linearGradient%3e%3cpath%20d='M52%2035l-4%201c-17%205-22%2021-13%2035%2010%2013%2031%2020%2048%2015l62-21S92%2026%2052%2035z'%20opacity='.3'%20fill='url(%23b)'/%3e%3clinearGradient%20id='c'%20gradientUnits='userSpaceOnUse'%20x1='18.4'%20y1='64.2'%20x2='144.3'%20y2='149.8'%3e%3cstop%20offset='0'%20stop-color='%23315aa9'/%3e%3cstop%20offset='.5'%20stop-color='%23518ac8'/%3e%3cstop%20offset='1'%20stop-color='%23315aa9'/%3e%3c/linearGradient%3e%3cpath%20d='M134%2080a45%2045%200%2000-48-15L24%2085%204%20120l112%2019%2020-36c4-7%203-15-2-23z'%20fill='url(%23c)'/%3e%3clinearGradient%20id='d'%20gradientUnits='userSpaceOnUse'%20x1='75.2'%20y1='74.5'%20x2='24.4'%20y2='260.8'%3e%3cstop%20offset='0'%20stop-color='%234377bb'/%3e%3cstop%20offset='.5'%20stop-color='%231a336b'/%3e%3cstop%20offset='1'%20stop-color='%231a336b'/%3e%3c/linearGradient%3e%3cpath%20d='M114%20115a45%2045%200%2000-48-15L4%20120s53%2040%2094%2030l3-1c17-5%2023-21%2013-34z'%20fill='url(%23d)'/%3e%3c/svg%3e", te = "_App_9g4xh_1", le = "_logo_9g4xh_5", se = "_header_9g4xh_11", ne = "_link_9g4xh_22", A = {
  App: te,
  logo: le,
  "logo-spin": "_logo-spin_9g4xh_1",
  header: se,
  link: ne
};
var ie = /* @__PURE__ */ X('<div><header><img alt=logo><p>Edit <code>src/App.tsx</code> and save to reload.</p><a href=https://github.com/solidjs/solid target=_blank rel="noopener noreferrer">Learn Solid');
const oe = () => (() => {
  var e = ie(), t = e.firstChild, l = t.firstChild, n = l.nextSibling, o = n.nextSibling;
  return Y(l, "src", ee), S((s) => {
    var f = A.App, i = A.header, r = A.logo, u = A.link;
    return f !== s.e && x(e, s.e = f), i !== s.t && x(t, s.t = i), r !== s.a && x(l, s.a = r), u !== s.o && x(o, s.o = u), s;
  }, {
    e: void 0,
    t: void 0,
    a: void 0,
    o: void 0
  }), e;
})();
document.getElementById("root");
const fe = (e) => {
  K(() => q(oe, {}), e);
};
export {
  fe as default
};
