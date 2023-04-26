import Slide from "./modules/slide.js";

const slide = new Slide(".slide-wrapper", ".slide-list");
slide.init();

slide.changeSlide(4);
slide.activePrevSlide();
