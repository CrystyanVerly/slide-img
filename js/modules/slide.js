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
    event.preventDefault();
    this.distance.startX = event.clientX;
    this.wrapper.addEventListener("mousemove", this.onMove);
  }

  onMove(event) {
    const finalPosition = this.updatePosition(event.clientX);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    event.preventDefault();
    this.wrapper.removeEventListener("mousemove", this.onMove);
    this.distance.finalPosition = this.distance.movePosition;
  }

  addEventSlide() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  init() {
    this.bindEvents();
    this.addEventSlide();
    return this;
  }
}
