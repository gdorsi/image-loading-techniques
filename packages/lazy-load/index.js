let inViewport = ({ top, bottom }) => top <= (innerHeight * 1.5) && bottom >= (innerHeight * -0.5);

export let legacyLazyLoad = (el, fn) => {
  let lock;

  function check() {
    if (lock) {
      return;
    }

    lock = true;

    requestAnimationFrame(() => {
      lock = false;

      if (inViewport(el.getBoundingClientRect())) run();
    });
  }

  function run() {
    window.removeEventListener("scroll", check);
    fn(el);
  }

  window.addEventListener("scroll", check, { passive: true });
  check();
};

export let lazyLoad = (els, fn) => {
  if (!window.IntersectionObserver) {
    return els.forEach(el => legacyLazyLoad(el, fn));
  }

  let observer = new IntersectionObserver(entries => {
    entries
      .filter(({ boundingClientRect }) => inViewport(boundingClientRect))
      .forEach(({ target }) => {
        observer.unobserve(target);
        fn(target);
      });
  }, {
    rootMargin: `${innerHeight / 2}px`
  });

  els.forEach(el => {
    observer.observe(el);
  });
};
