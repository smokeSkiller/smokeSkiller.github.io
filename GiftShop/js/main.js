//! DOM 
const header = $(".header");
const burgerBtn = $(".header-burger-btn");
const topMenu = $(".top-menu");
const categoryItem = $(".category");
const dropdown = $(".dropdown");

//! Variables
let productsItems = 3;

//! smooth scrolling
$(function() {
    // scrollSpeed(step, speed);
    jQuery.scrollSpeed(100, 800);
});

//! Responsive menu
//* It changes the menu height while resizing the window
$(window).on("resize", function () {
    changeMenuHeight();
});

$(window).on("load", function () {
    changeMenuHeight();
});

function changeMenuHeight() {
    $(burgerBtn).removeClass("closed-burger");

    if ($(window).width() <= 630) {
        $(topMenu).height($(window).height() - 104);
        $(topMenu).css("display", "none");
    } else {
        $(topMenu).height(40);
        $(topMenu).css("display", "flex");
    }
}

//* Responsive top-menu
$(burgerBtn).on("click", function () {
    $(topMenu).slideToggle();
});

//* Burger events
$(burgerBtn).on("click", function (e) {
    $(e.currentTarget).toggleClass("closed-burger");
});

//! Dropdown 
$(categoryItem).on("mouseenter", function (e) {
    if($(window).width() >= 1024){
        $(e.currentTarget).children().next().slideDown();
    }
});

$(categoryItem).on("mouseleave", function (e) {
    if($(window).width() >= 1024){
        $(e.currentTarget).children().next().slideUp();
    }
});

//* Sliders
if ($(window).width() < 1000) {
    productsItems = 2; 
}
if ($(window).width() < 680) {
    productsItems = 1; 
}

$(".owl-carousel-main-sections").owlCarousel({
    items: 1,
    nav: true,
    navText: ['<button class="slide-btn slide-btn--blue"><i class="slide-btn__icon fas fa-angle-left"></i></button>',
    '<button class="slide-btn slide-btn--blue"><i class="slide-btn__icon fas fa-angle-right"></i></button>'],
    mouseDrag: false
});


$(".new-products-slider").owlCarousel({
    items: productsItems,
    nav: true,
    navText: ['<button class="slide-btn slide-btn--red"><i class="slide-btn__icon fas fa-angle-left"></i></button>',
    '<button class="slide-btn slide-btn--red"><i class="slide-btn__icon fas fa-angle-right"></i></button>'],
    mouseDrag: false,
    margin: 30
});