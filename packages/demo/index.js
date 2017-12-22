import { lazyLoad } from "@sockhatso/lazy-load";

lazyLoad(
  Array.from(document.querySelectorAll("article img + img[data-src]")),
  img => {
    img.src = img.getAttribute("data-src");
    img.onload = () => {
      img.style.opacity = 1;
    }
  }
);
