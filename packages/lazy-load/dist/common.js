var n=function(n){var e=n.top,r=n.bottom;return e<=1.5*innerHeight&&r>=-.5*innerHeight},e=function(e,r){function t(){o||(o=!0,requestAnimationFrame(function(){o=!1,n(e.getBoundingClientRect())&&(window.removeEventListener("scroll",t),r(e))}))}var o;window.addEventListener("scroll",t,{passive:!0}),t()},r=function(r,t){if(!window.IntersectionObserver)return r.forEach(function(n){return e(n,t)});var o=new IntersectionObserver(function(e){e.filter(function(e){var r=e.boundingClientRect;return n(r)}).forEach(function(n){var e=n.target;o.unobserve(e),t(e)})},{rootMargin:innerHeight/2+"px"});r.forEach(function(n){o.observe(n)})};exports.legacyLazyLoad=e,exports.lazyLoad=r;
//# sourceMappingURL=common.js.map
n) {
    if (!window.IntersectionObserver) {
        return els.forEach(function (el) { return legacyLazyLoad(el, fn); });
    }
    var observer = new IntersectionObserver(function (entries) {
        entries.filter(function (ref) {
            var boundingClientRect = ref.boundingClientRect;

            return inViewport(boundingClientRect);
        }).forEach(function (ref) {
            var target = ref.target;

            observer.unobserve(target);
            fn(target);
        });
    }, {
        rootMargin: ((innerHeight / 2) + "px")
    });
    els.forEach(function (el) {
        observer.observe(el);
    });
};

export { legacyLazyLoad, lazyLoad };
//# sourceMappingURL=common.js.map
