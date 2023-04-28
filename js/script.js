import SlideNav from "./modules/slide.js";

const slide = new SlideNav(".slide-wrapper", ".slide-list");
slide.init();

slide.addArrow(".prev-slide", ".next-slide");
slide.addControl(".custom-controls");
