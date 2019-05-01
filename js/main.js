//! DOM
// Responisive
const header = $("header");
const menu = $(".nav-menu"); 
const menuItem = $(".nav-menu ul li");
const menuItemLink = $(".nav-menu ul li a");
const burgerBtn = $(".burger-btn");
// Sections
const switcher = $(".accordion .switcher");
const project = $(".projects .project");
const employer = $(".employers .employer");
const socBtn = $(".soc-media .soc-btns .soc-btn");

//! smooth scrolling
$(function() {
    // scrollSpeed(step, speed);
    jQuery.scrollSpeed(100, 800);
})

//! sticky menu
$(window).on("scroll", function () {
    if ($(this).scrollTop() >= 77) {
        $(header).css("position", "fixed");
    }else{
        $(header).css("position", "absolute");
    }
});

//! changing active menu
$(window).on("scroll", function () {
    activeSections();
});

$(window).on("load", function () {
    activeSections();
});

$(menuItem).on("click", function () {
    activeSections();
});

function activeSection(section) {
    if ($(this).scrollTop() >= $("#" + section + "").position().top - 5
    && $(this).scrollTop() <= $("#" + section + "").position().top + $("#"+ section + "").height()) {
        $(menuItemLink).filter("#link-" + section + "").addClass("active");
    }else{
        $(menuItemLink).filter("#link-" + section + "").removeClass("active");
    }
}

function activeSections(params) {
    activeSection('home');
    activeSection('about');
    activeSection('portfolio');
    activeSection('clients');
    activeSection('team');
    activeSection('services');
    activeSection('blog');
    activeSection('contact');
}

//! Responsive menu
//* Sizing the height of menu
$(window).on("resize", function () {
    changeMenuHeight();
});

$(window).on("load", function () {
    changeMenuHeight();
});


function changeMenuHeight() {
    $(burgerBtn).removeClass("closed-burger");

    if ($(window).width() <= 1095) {
        $(menu).height($(window).height() - 67);
        $(menu).css("display", "none");
        $(menuItem).eq(0).children().removeClass("active"); // li > a.active
    }else{
        $(menu).height(70);
        $(menu).css("display", "flex");
        $(menuItem).eq(0).children().addClass("active"); // li > a
    }
}

//* Clicking burger button
$(burgerBtn).on("click", function (event) {
    $(event.currentTarget).toggleClass("closed-burger");
    $(menu).slideToggle();
});

//* CLicking to links
$(menuItem).on("click", function () {
    if ($(window).width() <= 1095) {
        $(menu).slideUp();
        $(burgerBtn).removeClass("closed-burger");
    }
});

//! Accordion
switcher.on("click", function (event) {
    $(event.currentTarget).next().slideToggle();
    $(event.currentTarget).toggleClass("actived-accordion");
    $(event.currentTarget).children(0).children().toggle();
});

//! Hover effects
//* Hover effects with projects
project.on("mouseover", function (event) {
    $(event.currentTarget).children(0).addClass("actived-overlay");
});

project.on("mouseleave", function (event) {
    $(event.currentTarget).children(0).removeClass("actived-overlay");
});

//* Hover effects with employers
employer.on("mouseover", function (event) {
    $(event.currentTarget).children().eq(0).children().eq(1).addClass("actived-overlay");
    $(event.currentTarget).children().eq(1).css("color", "#ff0036");
});

employer.on("mouseleave", function (event) {
    $(event.currentTarget).children().eq(0).children().eq(1).removeClass("actived-overlay");
    $(event.currentTarget).children().eq(1).css("color", "#262626");
});

//* Hover effects with soc btns
socBtn.on("mouseover", function (event) {
    $(event.currentTarget).children().eq(0).attr("src", "img/soc_container.png");
});

socBtn.on("mouseleave", function (event) {
    $(event.currentTarget).children().eq(0).attr("src", "img/transparent-hexagon.png");
});

//! sliders
// home
$(".owl-carousel-head").owlCarousel({
    items: 1,
    nav: true,
    navText: ['<i class="fas fa-angle-left"></i>','<i class="fas fa-angle-right"></i>'],
    loop: true
});

// projects
$(".owl-carousel-clients-opinion").owlCarousel({
    items: 1,
    dots: true,
    startPosition: 1
});