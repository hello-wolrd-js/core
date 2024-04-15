(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode("._test_f4ycb_34{color:red}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
let $ = R;
const y = 1, A = 2, L = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var u = null;
let T = null, j = null, h = null, p = null, d = null, m = 0;
function G(e, t) {
  const s = h, n = u, o = e.length === 0, i = t === void 0 ? n : t, f = o ? L : {
    owned: null,
    cleanups: null,
    context: i ? i.context : null,
    owner: i
  }, l = o ? e : () => e(() => E(() => b(f)));
  u = f, h = null;
  try {
    return S(l, !0);
  } finally {
    h = s, u = n;
  }
}
function x(e, t, s) {
  const n = Q(e, t, !1, y);
  D(n);
}
function E(e) {
  if (h === null)
    return e();
  const t = h;
  h = null;
  try {
    return e();
  } finally {
    h = t;
  }
}
function H(e, t, s) {
  let n = e.value;
  return (!e.comparator || !e.comparator(n, t)) && (e.value = t, e.observers && e.observers.length && S(() => {
    for (let o = 0; o < e.observers.length; o += 1) {
      const i = e.observers[o], f = T && T.running;
      f && T.disposed.has(i), (f ? !i.tState : !i.state) && (i.pure ? p.push(i) : d.push(i), i.observers && F(i)), f || (i.state = y);
    }
    if (p.length > 1e6)
      throw p = [], new Error();
  }, !1)), t;
}
function D(e) {
  if (!e.fn)
    return;
  b(e);
  const t = m;
  O(e, e.value, t);
}
function O(e, t, s) {
  let n;
  const o = u, i = h;
  h = u = e;
  try {
    n = e.fn(t);
  } catch (f) {
    return e.pure && (e.state = y, e.owned && e.owned.forEach(b), e.owned = null), e.updatedAt = s + 1, M(f);
  } finally {
    h = i, u = o;
  }
  (!e.updatedAt || e.updatedAt <= s) && (e.updatedAt != null && "observers" in e ? H(e, n) : e.value = n, e.updatedAt = s);
}
function Q(e, t, s, n = y, o) {
  const i = {
    fn: e,
    state: n,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: u,
    context: u ? u.context : null,
    pure: s
  };
  return u === null || u !== L && (u.owned ? u.owned.push(i) : u.owned = [i]), i;
}
function I(e) {
  if (e.state === 0)
    return;
  if (e.state === A)
    return B(e);
  if (e.suspense && E(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < m); )
    e.state && t.push(e);
  for (let s = t.length - 1; s >= 0; s--)
    if (e = t[s], e.state === y)
      D(e);
    else if (e.state === A) {
      const n = p;
      p = null, S(() => B(e, t[0]), !1), p = n;
    }
}
function S(e, t) {
  if (p)
    return e();
  let s = !1;
  t || (p = []), d ? s = !0 : d = [], m++;
  try {
    const n = e();
    return V(s), n;
  } catch (n) {
    s || (d = null), p = null, M(n);
  }
}
function V(e) {
  if (p && (R(p), p = null), e)
    return;
  const t = d;
  d = null, t.length && S(() => $(t), !1);
}
function R(e) {
  for (let t = 0; t < e.length; t++)
    I(e[t]);
}
function B(e, t) {
  e.state = 0;
  for (let s = 0; s < e.sources.length; s += 1) {
    const n = e.sources[s];
    if (n.sources) {
      const o = n.state;
      o === y ? n !== t && (!n.updatedAt || n.updatedAt < m) && I(n) : o === A && B(n, t);
    }
  }
}
function F(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const s = e.observers[t];
    s.state || (s.state = A, s.pure ? p.push(s) : d.push(s), s.observers && F(s));
  }
}
function b(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const s = e.sources.pop(), n = e.sourceSlots.pop(), o = s.observers;
      if (o && o.length) {
        const i = o.pop(), f = s.observerSlots.pop();
        n < o.length && (i.sourceSlots[f] = n, o[n] = i, s.observerSlots[n] = f);
      }
    }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--)
      b(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0;
}
function W(e) {
  return e instanceof Error ? e : new Error(typeof e == "string" ? e : "Unknown error", {
    cause: e
  });
}
function M(e, t = u) {
  throw W(e);
}
function q(e, t) {
  return E(() => e(t || {}));
}
function J(e, t, s) {
  let n = s.length, o = t.length, i = n, f = 0, l = 0, r = t[o - 1].nextSibling, a = null;
  for (; f < o || l < i; ) {
    if (t[f] === s[l]) {
      f++, l++;
      continue;
    }
    for (; t[o - 1] === s[i - 1]; )
      o--, i--;
    if (o === f) {
      const c = i < n ? l ? s[l - 1].nextSibling : s[i - l] : r;
      for (; l < i; )
        e.insertBefore(s[l++], c);
    } else if (i === l)
      for (; f < o; )
        (!a || !a.has(t[f])) && t[f].remove(), f++;
    else if (t[f] === s[i - 1] && s[l] === t[o - 1]) {
      const c = t[--o].nextSibling;
      e.insertBefore(s[l++], t[f++].nextSibling), e.insertBefore(s[--i], c), t[o] = s[i];
    } else {
      if (!a) {
        a = /* @__PURE__ */ new Map();
        let w = l;
        for (; w < i; )
          a.set(s[w], w++);
      }
      const c = a.get(t[f]);
      if (c != null)
        if (l < c && c < i) {
          let w = f, N = 1, U;
          for (; ++w < o && w < i && !((U = a.get(t[w])) == null || U !== c + N); )
            N++;
          if (N > c - l) {
            const P = t[f];
            for (; l < c; )
              e.insertBefore(s[l++], P);
          } else
            e.replaceChild(s[l++], t[f++]);
        } else
          f++;
      else
        t[f++].remove();
    }
  }
}
function K(e, t, s, n = {}) {
  let o;
  return G((i) => {
    o = i, t === document ? e() : Z(t, e(), t.firstChild ? null : void 0, s);
  }, n.owner), () => {
    o(), t.textContent = "";
  };
}
function X(e, t, s) {
  let n;
  const o = () => {
    const f = document.createElement("template");
    return f.innerHTML = e, s ? f.content.firstChild.firstChild : f.content.firstChild;
  }, i = t ? () => E(() => document.importNode(n || (n = o()), !0)) : () => (n || (n = o())).cloneNode(!0);
  return i.cloneNode = i, i;
}
function Y(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function Z(e, t, s, n) {
  if (s !== void 0 && !n && (n = []), typeof t != "function")
    return C(e, t, n, s);
  x((o) => C(e, t(), o, s), n);
}
function C(e, t, s, n, o) {
  for (; typeof s == "function"; )
    s = s();
  if (t === s)
    return s;
  const i = typeof t, f = n !== void 0;
  if (e = f && s[0] && s[0].parentNode || e, i === "string" || i === "number")
    if (i === "number" && (t = t.toString()), f) {
      let l = s[0];
      l && l.nodeType === 3 ? l.data !== t && (l.data = t) : l = document.createTextNode(t), s = g(e, s, n, l);
    } else
      s !== "" && typeof s == "string" ? s = e.firstChild.data = t : s = e.textContent = t;
  else if (t == null || i === "boolean")
    s = g(e, s, n);
  else {
    if (i === "function")
      return x(() => {
        let l = t();
        for (; typeof l == "function"; )
          l = l();
        s = C(e, l, s, n);
      }), () => s;
    if (Array.isArray(t)) {
      const l = [], r = s && Array.isArray(s);
      if (v(l, t, s, o))
        return x(() => s = C(e, l, s, n, !0)), () => s;
      if (l.length === 0) {
        if (s = g(e, s, n), f)
          return s;
      } else
        r ? s.length === 0 ? _(e, l, n) : J(e, s, l) : (s && g(e), _(e, l));
      s = l;
    } else if (t.nodeType) {
      if (Array.isArray(s)) {
        if (f)
          return s = g(e, s, n, t);
        g(e, s, null, t);
      } else
        s == null || s === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      s = t;
    }
  }
  return s;
}
function v(e, t, s, n) {
  let o = !1;
  for (let i = 0, f = t.length; i < f; i++) {
    let l = t[i], r = s && s[i], a;
    if (!(l == null || l === !0 || l === !1))
      if ((a = typeof l) == "object" && l.nodeType)
        e.push(l);
      else if (Array.isArray(l))
        o = v(e, l, r) || o;
      else if (a === "function")
        if (n) {
          for (; typeof l == "function"; )
            l = l();
          o = v(e, Array.isArray(l) ? l : [l], Array.isArray(r) ? r : [r]) || o;
        } else
          e.push(l), o = !0;
      else {
        const c = String(l);
        r && r.nodeType === 3 && r.data === c ? e.push(r) : e.push(document.createTextNode(c));
      }
  }
  return o;
}
function _(e, t, s = null) {
  for (let n = 0, o = t.length; n < o; n++)
    e.insertBefore(t[n], s);
}
function g(e, t, s, n) {
  if (s === void 0)
    return e.textContent = "";
  const o = n || document.createTextNode("");
  if (t.length) {
    let i = !1;
    for (let f = t.length - 1; f >= 0; f--) {
      const l = t[f];
      if (o !== l) {
        const r = l.parentNode === e;
        !i && !f ? r ? e.replaceChild(o, l) : e.insertBefore(o, s) : r && l.remove();
      } else
        i = !0;
    }
  } else
    e.insertBefore(o, s);
  return [o];
}
const z = "_test_f4ycb_34", k = {
  test: z
};
var ee = /* @__PURE__ */ X("<div>123");
const te = () => (console.log(document, localStorage), (() => {
  var e = ee();
  return x(() => Y(e, k.test)), e;
})());
document.getElementById("root");
const se = (e) => {
  K(() => q(te, {}), e);
};
export {
  se as default
};
