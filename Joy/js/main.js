//! DOM
const mainSlider = $(".main-slider");
const directionsSlider = $(".directions-slider");
const gallerySlider = $(".gallery-slider");
let sameSliders = [mainSlider, directionsSlider];

//! smooth scrolling
$(function() {
    // scrollSpeed(step, speed);
    jQuery.scrollSpeed(100, 800);
});

//* Sliders
// Same sliders
sameSliders.forEach( function (slider) {
    slider.slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        dotsClass: "slider-dots",
        draggable: false,
        prevArrow: '<div class="slick-prev"><div class="arrow"></div></div>',
        nextArrow: '<div class="slick-next"><div class="arrow"></div></div>',
        zIndex: 111,
        responsive: true
    });
});

// Gallery slider
gallerySlider.slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: true,
    dotsClass: "slider-dots",
    draggable: false,
    prevArrow: '<div class="slick-prev"><div class="arrow"></div></div>',
    nextArrow: '<div class="slick-next"><div class="arrow"></div></div>',
    responsive: [
        {
        breakpoint: 1100, 
        settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
        }
    },
    {
        breakpoint: 768, 
        settings: {
        swipe: true,
        slidesToShow: 2,
            slidesToScroll: 2,
        }
    },
    {
        breakpoint: 465, 
        settings: {
        slidesToShow: 1,
            slidesToScroll: 1,
        }
    }
        ]
});