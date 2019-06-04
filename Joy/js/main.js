//! DOM
const mainSlider = $(".main-slider");
const directionsSlider = $(".directions-slider");
const gallerySlider = $(".gallery-slider");
let sameSliders = [mainSlider, directionsSlider, gallerySlider];

//! smooth scrolling
$(function() {
    // scrollSpeed(step, speed);
    jQuery.scrollSpeed(100, 800);
});

//* Sliders
sameSliders.forEach( function (slider) {
    slider.slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        dotsClass: "slider-dots",
        draggable: false,
        prevArrow: '<button class="slick-prev"><img src="img/ic_scroll-left.png" width="25px" height="48px"></button>',
        nextArrow: '<button class="slick-next"><img src="img/ic_scroll-right.png" width="25px" height="48px"></button>',
        zIndex: 111,
        responsive: true
    });
});