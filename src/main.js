import Swipe from "./Swipe.js";

const swipe = new Swipe(document.querySelector('[data-swipe]'));

swipe.onLeft(() => {
  swipe.element.innerHTML = "you swiped left";
});

swipe.onRight(() => {
  swipe.element.innerHTML = "you swiped right";
});

