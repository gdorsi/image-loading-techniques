var inViewport = function (ref) {
    var top = ref.top;
    var bottom = ref.bottom;

    return top <= innerHeight * 1.5 && bottom >= innerHeight * -0.5;
};
var legacyLazyLoad = function (el, fn) {
    var lock;
    function check() {
        if (lock) {
            return;
        }
        lock = true;
        requestAnimationFrame(function () {
            lock = false;
            if (inViewport(el.getBoundingClientRect())) 
                { run(); }
        });
    }
    
    function run() {
        window.removeEventListener("scroll", check);
        fn(el);
    }
    
    window.addEventListener("scroll", check, {
        passive: true
    });
    check();
};
var lazyLoad = function (els, fn) {
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

lazyLoad(Array.from(document.querySelectorAll("article img + img[data-src]")), function (img) {
    img.src = img.getAttribute("data-src");
    img.onload = (function () {
        img.style.opacity = 1;
    });
});
//# sourceMappingURL=index.js.map
