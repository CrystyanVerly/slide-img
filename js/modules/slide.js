export default class Slide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper);
    this.slide = document.querySelector(slide);
    this.distance = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    };
  }

  moveSlide(distX) {
    this.distance.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0px, 0px)`;
  }

  updatePosition(clientX) {
    this.distance.movement = (this.distance.startX - clientX) * 1.6;
    return this.distance.finalPosition - this.distance.movement;
  }

  onStart(event) {
    let moveType;
    if (event.type === "mousedown") {
      event.preventDefault();
      this.distance.startX = event.clientX;
      moveType = "mousemove";
    } else {
      this.distance.startX = event.changedTouches[0].clientX;
      moveType = "touchmove";
    }
    this.wrapper.addEventListener(moveType, this.onMove);
  }

  onMove(event) {
    const pointerPosition =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    const moveType = event.type === "mouseup" ? "mousemove" : "touchmove";
    event.preventDefault();
    this.wrapper.removeEventListener(moveType, this.onMove);
    this.distance.finalPosition = this.distance.movePosition;
  }

  addEventSlide() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("touchstart", this.onStart);

    this.wrapper.addEventListener("mouseup", this.onEnd);
    this.wrapper.addEventListener("touchend", this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  // slide configs
  updateSlidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slidesConfig() {
    this.arrSlide = [...this.slide.children].map((element) => {
      const positionSlide = this.updateSlidePosition(element);

      return {
        positionSlide,
        element,
      };
    });
  }

  slidesIndexNav(index) {
    const last = this.arrSlide.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    };
  }

  changeSlide() {
    const activeSlide = this.arrSlide[index];
    this.moveSlide(activeSlide.positionSlide);
    this.slidesIndexNav(index);
    this.distance.finalPosition = activeSlide.positionSlide;
  }

  init() {
    this.bindEvents();
    this.addEventSlide();
    this.slidesConfig();
    return this;
  }
}
