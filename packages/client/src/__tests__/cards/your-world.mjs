;(function () {
    'use strict'
    try {
        if (typeof document < 'u') {
            var t = document.createElement('style')
            t.appendChild(
                document.createTextNode(
                    '*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}:root,[data-theme]{background-color:var(--fallback-b1,oklch(var(--b1)/1));color:var(--fallback-bc,oklch(var(--bc)/1))}@supports not (color: oklch(0% 0 0)){:root{color-scheme:light;--fallback-p: #491eff;--fallback-pc: #d4dbff;--fallback-s: #ff41c7;--fallback-sc: #fff9fc;--fallback-a: #00cfbd;--fallback-ac: #00100d;--fallback-n: #2b3440;--fallback-nc: #d7dde4;--fallback-b1: #ffffff;--fallback-b2: #e5e6e6;--fallback-b3: #e5e6e6;--fallback-bc: #1f2937;--fallback-in: #00b3f0;--fallback-inc: #000000;--fallback-su: #00ca92;--fallback-suc: #000000;--fallback-wa: #ffc22d;--fallback-wac: #000000;--fallback-er: #ff6f70;--fallback-erc: #000000}@media (prefers-color-scheme: dark){:root{color-scheme:dark;--fallback-p: #7582ff;--fallback-pc: #050617;--fallback-s: #ff71cf;--fallback-sc: #190211;--fallback-a: #00c7b5;--fallback-ac: #000e0c;--fallback-n: #2a323c;--fallback-nc: #a6adbb;--fallback-b1: #1d232a;--fallback-b2: #191e24;--fallback-b3: #15191e;--fallback-bc: #a6adbb;--fallback-in: #00b3f0;--fallback-inc: #000000;--fallback-su: #00ca92;--fallback-suc: #000000;--fallback-wa: #ffc22d;--fallback-wac: #000000;--fallback-er: #ff6f70;--fallback-erc: #000000}}}html{-webkit-tap-highlight-color:transparent}:root{color-scheme:light;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--pc: 89.824% .06192 275.75;--ac: 15.352% .0368 183.61;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 1rem;--rounded-btn: .5rem;--rounded-badge: 1.9rem;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: .5rem;--p: 49.12% .3096 275.75;--s: 69.71% .329 342.55;--sc: 98.71% .0106 342.55;--a: 76.76% .184 183.61;--n: 32.1785% .02476 255.701624;--nc: 89.4994% .011585 252.096176;--b1: 100% 0 0;--b2: 96.1151% 0 0;--b3: 92.4169% .00108 197.137559;--bc: 27.8078% .029596 256.847952}@media (prefers-color-scheme: dark){:root{color-scheme:dark;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--pc: 13.138% .0392 275.75;--sc: 14.96% .052 342.55;--ac: 14.902% .0334 183.61;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 1rem;--rounded-btn: .5rem;--rounded-badge: 1.9rem;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: .5rem;--p: 65.69% .196 275.75;--s: 74.8% .26 342.55;--a: 74.51% .167 183.61;--n: 31.3815% .021108 254.139175;--nc: 74.6477% .0216 264.435964;--b1: 25.3267% .015896 252.417568;--b2: 23.2607% .013807 253.100675;--b3: 21.1484% .01165 254.087939;--bc: 74.6477% .0216 264.435964}}[data-theme=light]{color-scheme:light;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--pc: 89.824% .06192 275.75;--ac: 15.352% .0368 183.61;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 1rem;--rounded-btn: .5rem;--rounded-badge: 1.9rem;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: .5rem;--p: 49.12% .3096 275.75;--s: 69.71% .329 342.55;--sc: 98.71% .0106 342.55;--a: 76.76% .184 183.61;--n: 32.1785% .02476 255.701624;--nc: 89.4994% .011585 252.096176;--b1: 100% 0 0;--b2: 96.1151% 0 0;--b3: 92.4169% .00108 197.137559;--bc: 27.8078% .029596 256.847952}[data-theme=dark]{color-scheme:dark;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--pc: 13.138% .0392 275.75;--sc: 14.96% .052 342.55;--ac: 14.902% .0334 183.61;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 1rem;--rounded-btn: .5rem;--rounded-badge: 1.9rem;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: .5rem;--p: 65.69% .196 275.75;--s: 74.8% .26 342.55;--a: 74.51% .167 183.61;--n: 31.3815% .021108 254.139175;--nc: 74.6477% .0216 264.435964;--b1: 25.3267% .015896 252.417568;--b2: 23.2607% .013807 253.100675;--b3: 21.1484% .01165 254.087939;--bc: 74.6477% .0216 264.435964}[data-theme=wireframe]{color-scheme:light;--bc: 20% 0 0;--pc: 15.6521% 0 0;--sc: 15.6521% 0 0;--ac: 15.6521% 0 0;--nc: 18.8014% 0 0;--inc: 89.0403% .062643 264.052021;--suc: 90.395% .035372 142.495339;--wac: 14.1626% .019994 108.702381;--erc: 12.5591% .051537 29.233885;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;font-family:Chalkboard,comic sans ms,"sans-serif";--p: 78.2604% 0 0;--s: 78.2604% 0 0;--a: 78.2604% 0 0;--n: 94.007% 0 0;--b1: 100% 0 0;--b2: 94.9119% 0 0;--b3: 89.7547% 0 0;--in: 45.2014% .313214 264.052021;--su: 51.9752% .176858 142.495339;--wa: 70.8131% .099969 108.702381;--er: 62.7955% .257683 29.233885;--rounded-box: .2rem;--rounded-btn: .2rem;--rounded-badge: .2rem;--tab-radius: .2rem}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.btn{display:inline-flex;height:3rem;min-height:3rem;flex-shrink:0;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;flex-wrap:wrap;align-items:center;justify-content:center;border-radius:var(--rounded-btn, .5rem);border-color:transparent;border-color:oklch(var(--btn-color, var(--b2)) / var(--tw-border-opacity));padding-left:1rem;padding-right:1rem;text-align:center;font-size:.875rem;line-height:1em;gap:.5rem;font-weight:600;text-decoration-line:none;transition-duration:.2s;transition-timing-function:cubic-bezier(0,0,.2,1);border-width:var(--border-btn, 1px);animation:button-pop var(--animation-btn, .25s) ease-out;transition-property:color,background-color,border-color,opacity,box-shadow,transform;--tw-text-opacity: 1;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);--tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);outline-color:var(--fallback-bc,oklch(var(--bc)/1));background-color:oklch(var(--btn-color, var(--b2)) / var(--tw-bg-opacity));--tw-bg-opacity: 1;--tw-border-opacity: 1}.btn-disabled,.btn[disabled],.btn:disabled{pointer-events:none}:where(.btn:is(input[type=checkbox])),:where(.btn:is(input[type=radio])){width:auto;-webkit-appearance:none;-moz-appearance:none;appearance:none}.btn:is(input[type=checkbox]):after,.btn:is(input[type=radio]):after{--tw-content: attr(aria-label);content:var(--tw-content)}@media (hover: hover){.btn:hover{--tw-border-opacity: 1;border-color:var(--fallback-b3,oklch(var(--b3)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)))}@supports (color: color-mix(in oklab,black,black)){.btn:hover{background-color:color-mix(in oklab,oklch(var(--btn-color, var(--b2)) / var(--tw-bg-opacity, 1)) 90%,black);border-color:color-mix(in oklab,oklch(var(--btn-color, var(--b2)) / var(--tw-border-opacity, 1)) 90%,black)}}@supports not (color: oklch(0% 0 0)){.btn:hover{background-color:var(--btn-color, var(--fallback-b2));border-color:var(--btn-color, var(--fallback-b2))}}.btn.glass:hover{--glass-opacity: 25%;--glass-border-opacity: 15%}.btn-disabled:hover,.btn[disabled]:hover,.btn:disabled:hover{--tw-border-opacity: 0;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));--tw-bg-opacity: .2;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-text-opacity: .2}@supports (color: color-mix(in oklab,black,black)){.btn:is(input[type=checkbox]:checked):hover,.btn:is(input[type=radio]:checked):hover{background-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black);border-color:color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 90%,black)}}}.link{cursor:pointer;text-decoration-line:underline}.btn:active:hover,.btn:active:focus{animation:button-pop 0s ease-out;transform:scale(var(--btn-focus-scale, .97))}@supports not (color: oklch(0% 0 0)){.btn{background-color:var(--btn-color, var(--fallback-b2));border-color:var(--btn-color, var(--fallback-b2))}}.btn:focus-visible{outline-style:solid;outline-width:2px;outline-offset:2px}.btn.glass{--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);outline-color:currentColor}.btn.glass.btn-active{--glass-opacity: 25%;--glass-border-opacity: 15%}.btn.btn-disabled,.btn[disabled],.btn:disabled{--tw-border-opacity: 0;background-color:var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)));--tw-bg-opacity: .2;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-text-opacity: .2}.btn:is(input[type=checkbox]:checked),.btn:is(input[type=radio]:checked){--tw-border-opacity: 1;border-color:var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))}.btn:is(input[type=checkbox]:checked):focus-visible,.btn:is(input[type=radio]:checked):focus-visible{outline-color:var(--fallback-p,oklch(var(--p)/1))}@keyframes button-pop{0%{transform:scale(var(--btn-focus-scale, .98))}40%{transform:scale(1.02)}to{transform:scale(1)}}@keyframes checkmark{0%{background-position-y:5px}50%{background-position-y:-2px}to{background-position-y:0}}.link:focus{outline:2px solid transparent;outline-offset:2px}.link:focus-visible{outline:2px solid currentColor;outline-offset:2px}@keyframes modal-pop{0%{opacity:0}}@keyframes progress-loading{50%{background-position-x:-115%}}@keyframes radiomark{0%{box-shadow:0 0 0 12px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 12px var(--fallback-b1,oklch(var(--b1)/1)) inset}50%{box-shadow:0 0 0 3px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 3px var(--fallback-b1,oklch(var(--b1)/1)) inset}to{box-shadow:0 0 0 4px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 4px var(--fallback-b1,oklch(var(--b1)/1)) inset}}@keyframes rating-pop{0%{transform:translateY(-.125em)}40%{transform:translateY(-.125em)}to{transform:translateY(0)}}@keyframes skeleton{0%{background-position:150%}to{background-position:-50%}}@keyframes toast-pop{0%{transform:scale(.9);opacity:0}to{transform:scale(1);opacity:1}}.ml-1{margin-left:.25rem}.p-10{padding:2.5rem}'
                )
            ),
                document.head.appendChild(t)
        }
    } catch (a) {
        console.error('vite-plugin-css-injected-by-js', a)
    }
})()
const H = (e, s) => e === s,
    D = {
        equals: H
    }
let M = q
const w = 1,
    S = 2,
    U = {
        owned: null,
        cleanups: null,
        context: null,
        owner: null
    }
var a = null
let $ = null,
    V = null,
    f = null,
    u = null,
    g = null,
    x = 0
function Q(e, s) {
    const t = f,
        n = a,
        l = e.length === 0,
        i = s === void 0 ? n : s,
        r = l
            ? U
            : {
                  owned: null,
                  cleanups: null,
                  context: i ? i.context : null,
                  owner: i
              },
        o = l ? e : () => e(() => C(() => v(r)))
    ;(a = r), (f = null)
    try {
        return b(o, !0)
    } finally {
        ;(f = t), (a = n)
    }
}
function W(e, s) {
    s = s ? Object.assign({}, D, s) : D
    const t = {
            value: e,
            observers: null,
            observerSlots: null,
            comparator: s.equals || void 0
        },
        n = (l) => (typeof l == 'function' && (l = l(t.value)), O(t, l))
    return [X.bind(t), n]
}
function T(e, s, t) {
    const n = K(e, s, !1, w)
    B(n)
}
function C(e) {
    if (f === null) return e()
    const s = f
    f = null
    try {
        return e()
    } finally {
        f = s
    }
}
function X() {
    if (this.sources && this.state)
        if (this.state === w) B(this)
        else {
            const e = u
            ;(u = null), b(() => A(this), !1), (u = e)
        }
    if (f) {
        const e = this.observers ? this.observers.length : 0
        f.sources
            ? (f.sources.push(this), f.sourceSlots.push(e))
            : ((f.sources = [this]), (f.sourceSlots = [e])),
            this.observers
                ? (this.observers.push(f), this.observerSlots.push(f.sources.length - 1))
                : ((this.observers = [f]), (this.observerSlots = [f.sources.length - 1]))
    }
    return this.value
}
function O(e, s, t) {
    let n = e.value
    return (
        (!e.comparator || !e.comparator(n, s)) &&
            ((e.value = s),
            e.observers &&
                e.observers.length &&
                b(() => {
                    for (let l = 0; l < e.observers.length; l += 1) {
                        const i = e.observers[l],
                            r = $ && $.running
                        r && $.disposed.has(i),
                            (r ? !i.tState : !i.state) &&
                                (i.pure ? u.push(i) : g.push(i), i.observers && F(i)),
                            r || (i.state = w)
                    }
                    if (u.length > 1e6) throw ((u = []), new Error())
                }, !1)),
        s
    )
}
function B(e) {
    if (!e.fn) return
    v(e)
    const s = x
    J(e, e.value, s)
}
function J(e, s, t) {
    let n
    const l = a,
        i = f
    f = a = e
    try {
        n = e.fn(s)
    } catch (r) {
        return (
            e.pure && ((e.state = w), e.owned && e.owned.forEach(v), (e.owned = null)),
            (e.updatedAt = t + 1),
            I(r)
        )
    } finally {
        ;(f = i), (a = l)
    }
    ;(!e.updatedAt || e.updatedAt <= t) &&
        (e.updatedAt != null && 'observers' in e ? O(e, n) : (e.value = n), (e.updatedAt = t))
}
function K(e, s, t, n = w, l) {
    const i = {
        fn: e,
        state: n,
        updatedAt: null,
        owned: null,
        sources: null,
        sourceSlots: null,
        cleanups: null,
        value: s,
        owner: a,
        context: a ? a.context : null,
        pure: t
    }
    return a === null || (a !== U && (a.owned ? a.owned.push(i) : (a.owned = [i]))), i
}
function j(e) {
    if (e.state === 0) return
    if (e.state === S) return A(e)
    if (e.suspense && C(e.suspense.inFallback)) return e.suspense.effects.push(e)
    const s = [e]
    for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < x); ) e.state && s.push(e)
    for (let t = s.length - 1; t >= 0; t--)
        if (((e = s[t]), e.state === w)) B(e)
        else if (e.state === S) {
            const n = u
            ;(u = null), b(() => A(e, s[0]), !1), (u = n)
        }
}
function b(e, s) {
    if (u) return e()
    let t = !1
    s || (u = []), g ? (t = !0) : (g = []), x++
    try {
        const n = e()
        return Y(t), n
    } catch (n) {
        t || (g = null), (u = null), I(n)
    }
}
function Y(e) {
    if ((u && (q(u), (u = null)), e)) return
    const s = g
    ;(g = null), s.length && b(() => M(s), !1)
}
function q(e) {
    for (let s = 0; s < e.length; s++) j(e[s])
}
function A(e, s) {
    e.state = 0
    for (let t = 0; t < e.sources.length; t += 1) {
        const n = e.sources[t]
        if (n.sources) {
            const l = n.state
            l === w ? n !== s && (!n.updatedAt || n.updatedAt < x) && j(n) : l === S && A(n, s)
        }
    }
}
function F(e) {
    for (let s = 0; s < e.observers.length; s += 1) {
        const t = e.observers[s]
        t.state || ((t.state = S), t.pure ? u.push(t) : g.push(t), t.observers && F(t))
    }
}
function v(e) {
    let s
    if (e.sources)
        for (; e.sources.length; ) {
            const t = e.sources.pop(),
                n = e.sourceSlots.pop(),
                l = t.observers
            if (l && l.length) {
                const i = l.pop(),
                    r = t.observerSlots.pop()
                n < l.length && ((i.sourceSlots[r] = n), (l[n] = i), (t.observerSlots[n] = r))
            }
        }
    if (e.owned) {
        for (s = e.owned.length - 1; s >= 0; s--) v(e.owned[s])
        e.owned = null
    }
    if (e.cleanups) {
        for (s = e.cleanups.length - 1; s >= 0; s--) e.cleanups[s]()
        e.cleanups = null
    }
    e.state = 0
}
function Z(e) {
    return e instanceof Error
        ? e
        : new Error(typeof e == 'string' ? e : 'Unknown error', {
              cause: e
          })
}
function I(e, s = a) {
    throw Z(e)
}
function k(e, s) {
    return C(() => e(s || {}))
}
function z(e, s, t) {
    let n = t.length,
        l = s.length,
        i = n,
        r = 0,
        o = 0,
        c = s[l - 1].nextSibling,
        p = null
    for (; r < l || o < i; ) {
        if (s[r] === t[o]) {
            r++, o++
            continue
        }
        for (; s[l - 1] === t[i - 1]; ) l--, i--
        if (l === r) {
            const h = i < n ? (o ? t[o - 1].nextSibling : t[i - o]) : c
            for (; o < i; ) e.insertBefore(t[o++], h)
        } else if (i === o) for (; r < l; ) (!p || !p.has(s[r])) && s[r].remove(), r++
        else if (s[r] === t[i - 1] && t[o] === s[l - 1]) {
            const h = s[--l].nextSibling
            e.insertBefore(t[o++], s[r++].nextSibling), e.insertBefore(t[--i], h), (s[l] = t[i])
        } else {
            if (!p) {
                p = /* @__PURE__ */ new Map()
                let d = o
                for (; d < i; ) p.set(t[d], d++)
            }
            const h = p.get(s[r])
            if (h != null)
                if (o < h && h < i) {
                    let d = r,
                        m = 1,
                        _
                    for (; ++d < l && d < i && !((_ = p.get(s[d])) == null || _ !== h + m); ) m++
                    if (m > h - o) {
                        const G = s[r]
                        for (; o < h; ) e.insertBefore(t[o++], G)
                    } else e.replaceChild(t[o++], s[r++])
                } else r++
            else s[r++].remove()
        }
    }
}
const L = '_$DX_DELEGATE'
function ee(e, s, t, n = {}) {
    let l
    return (
        Q((i) => {
            ;(l = i), s === document ? e() : R(s, e(), s.firstChild ? null : void 0, t)
        }, n.owner),
        () => {
            l(), (s.textContent = '')
        }
    )
}
function te(e, s, t) {
    let n
    const l = () => {
            const r = document.createElement('template')
            return (r.innerHTML = e), t ? r.content.firstChild.firstChild : r.content.firstChild
        },
        i = s
            ? () => C(() => document.importNode(n || (n = l()), !0))
            : () => (n || (n = l())).cloneNode(!0)
    return (i.cloneNode = i), i
}
function se(e, s = window.document) {
    const t = s[L] || (s[L] = /* @__PURE__ */ new Set())
    for (let n = 0, l = e.length; n < l; n++) {
        const i = e[n]
        t.has(i) || (t.add(i), s.addEventListener(i, ne))
    }
}
function R(e, s, t, n) {
    if ((t !== void 0 && !n && (n = []), typeof s != 'function')) return E(e, s, n, t)
    T((l) => E(e, s(), l, t), n)
}
function ne(e) {
    const s = `$$${e.type}`
    let t = (e.composedPath && e.composedPath()[0]) || e.target
    for (
        e.target !== t &&
            Object.defineProperty(e, 'target', {
                configurable: !0,
                value: t
            }),
            Object.defineProperty(e, 'currentTarget', {
                configurable: !0,
                get() {
                    return t || document
                }
            });
        t;

    ) {
        const n = t[s]
        if (n && !t.disabled) {
            const l = t[`${s}Data`]
            if ((l !== void 0 ? n.call(t, l, e) : n.call(t, e), e.cancelBubble)) return
        }
        t = t._$host || t.parentNode || t.host
    }
}
function E(e, s, t, n, l) {
    for (; typeof t == 'function'; ) t = t()
    if (s === t) return t
    const i = typeof s,
        r = n !== void 0
    if (((e = (r && t[0] && t[0].parentNode) || e), i === 'string' || i === 'number'))
        if ((i === 'number' && (s = s.toString()), r)) {
            let o = t[0]
            o && o.nodeType === 3 ? o.data !== s && (o.data = s) : (o = document.createTextNode(s)),
                (t = y(e, t, n, o))
        } else
            t !== '' && typeof t == 'string' ? (t = e.firstChild.data = s) : (t = e.textContent = s)
    else if (s == null || i === 'boolean') t = y(e, t, n)
    else {
        if (i === 'function')
            return (
                T(() => {
                    let o = s()
                    for (; typeof o == 'function'; ) o = o()
                    t = E(e, o, t, n)
                }),
                () => t
            )
        if (Array.isArray(s)) {
            const o = [],
                c = t && Array.isArray(t)
            if (N(o, s, t, l)) return T(() => (t = E(e, o, t, n, !0))), () => t
            if (o.length === 0) {
                if (((t = y(e, t, n)), r)) return t
            } else c ? (t.length === 0 ? P(e, o, n) : z(e, t, o)) : (t && y(e), P(e, o))
            t = o
        } else if (s.nodeType) {
            if (Array.isArray(t)) {
                if (r) return (t = y(e, t, n, s))
                y(e, t, null, s)
            } else
                t == null || t === '' || !e.firstChild
                    ? e.appendChild(s)
                    : e.replaceChild(s, e.firstChild)
            t = s
        }
    }
    return t
}
function N(e, s, t, n) {
    let l = !1
    for (let i = 0, r = s.length; i < r; i++) {
        let o = s[i],
            c = t && t[i],
            p
        if (!(o == null || o === !0 || o === !1))
            if ((p = typeof o) == 'object' && o.nodeType) e.push(o)
            else if (Array.isArray(o)) l = N(e, o, c) || l
            else if (p === 'function')
                if (n) {
                    for (; typeof o == 'function'; ) o = o()
                    l = N(e, Array.isArray(o) ? o : [o], Array.isArray(c) ? c : [c]) || l
                } else e.push(o), (l = !0)
            else {
                const h = String(o)
                c && c.nodeType === 3 && c.data === h
                    ? e.push(c)
                    : e.push(document.createTextNode(h))
            }
    }
    return l
}
function P(e, s, t = null) {
    for (let n = 0, l = s.length; n < l; n++) e.insertBefore(s[n], t)
}
function y(e, s, t, n) {
    if (t === void 0) return (e.textContent = '')
    const l = n || document.createTextNode('')
    if (s.length) {
        let i = !1
        for (let r = s.length - 1; r >= 0; r--) {
            const o = s[r]
            if (l !== o) {
                const c = o.parentNode === e
                !i && !r ? (c ? e.replaceChild(l, o) : e.insertBefore(l, t)) : c && o.remove()
            } else i = !0
        }
    } else e.insertBefore(l, t)
    return [l]
}
var le = /* @__PURE__ */ te(
    '<div class=p-10><div>count:</div><button class=btn>+</button><button class="btn ml-1">-'
)
const ie = () => {
    const [e, s] = W(0),
        t = () => {
            s(e() + 1)
        },
        n = () => {
            s(e() - 1)
        }
    return (() => {
        var l = le(),
            i = l.firstChild
        i.firstChild
        var r = i.nextSibling,
            o = r.nextSibling
        return R(i, e, null), (r.$$click = t), (o.$$click = n), l
    })()
}
se(['click'])
document.getElementById('root')
const oe = (e) => {
    ee(() => k(ie, {}), e)
}
export { oe as default }
