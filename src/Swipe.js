
/*!
 * Swipe.js
 * javascript class for swipe events
 * https://github.com/joxx/swipe-event-class
 * @author joachim kliemann
 * @license MIT
 */
class Swipe {
  constructor(element, distance = 50, timeout = 500) {
    this.xDown = null;
    this.yDown = null;
    this.timeDown = null;
    this.swipeThreshold = distance;
    this.timeThreshold = timeout;
    this.element =
      typeof element === "string" ? document.querySelector(element) : element;
    this.handleTouchEvents();
  }
  
  onLeft(callback) {
    if (callback && typeof callback === "function") {
      this.onLeft = callback;
    }
  
    return this;
  }
  
  onRight(callback) {
    if (callback && typeof callback === "function") {
      this.onRight = callback;
    }
  
    return this;
  }
  
  onUp(callback) {
    if (callback && typeof callback === "function") {
      this.onUp = callback;
    }
  
    return this;
  }
  
  onDown(callback) {
    if (callback && typeof callback === "function") {
      this.onDown = callback;
    }
  
    return this;
  }
  
  handleTouchEvents() {
    this.element.addEventListener("touchstart", (event) => {
      this.handleTouchStart(event);
    });
  
    this.element.addEventListener("touchmove", (event) => {
      this.handleTouchMove(event);
    });
  
    this.element.addEventListener("touchend", (event) =>
      this.handleTouchEnd(event)
    );
  }
  
  handleTouchStart(event) {
    this.xDown = event.touches[0].clientX;
    this.yDown = event.touches[0].clientY;
    this.timeDown = Date.now();
  }
  
  handleTouchMove(event) {
    if (!this.xDown || !this.yDown) {
      return;
    }
  
    const xUp = event.touches[0].clientX;
    const yUp = event.touches[0].clientY;
  
    this.xDiff = this.xDown - xUp;
    this.yDiff = this.yDown - yUp;
  }
  
  handleTouchEnd(event) {
    const timeDiff = Date.now() - this.timeDown;
  
    if (Math.abs(this.xDiff) > Math.abs(this.yDiff)) {
      if (
        Math.abs(this.xDiff) > this.swipeThreshold &&
        timeDiff < this.timeThreshold
      ) {
        if (this.xDiff > 0) {
          this.onLeft();
        } else {
          this.onRight();
        }
      }
    } else {
      if (
        Math.abs(this.yDiff) > this.swipeThreshold &&
        timeDiff < this.timeThreshold
      ) {
        if (this.yDiff > 0) {
          this.onUp();
        } else {
          this.onDown();
        }
      }
    }
  
    this.xDown = null;
    this.yDown = null;
    this.timeDown = null;
  }
 }
  
 export { Swipe as default }; 