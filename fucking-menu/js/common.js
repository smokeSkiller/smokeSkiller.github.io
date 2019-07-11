const dropdownLink = $(".has-child");
const burgerBtn = $(".burger-btn");
const menuItems = $(".menu-items");
const menuArrow = $(".has-child .arrow");
const arrowLink = $(".arrow-link");
const topLine = $(".top-line");
const header = $("header");
let dropdown, dropdownArrow;

//! Fixed nav
$(window).on("scroll", function () {
    if ($(this).scrollTop() > header.height() + 120) {
        topLine.addClass("fixed");
        menuItems.css("top", "60px");
    } else {
        topLine.removeClass("fixed");
        menuItems.css("top", "0px");
    }
});

//! Arrow link
arrowLink.append('<div class="arrow"><i class="fas fa-angle-down"></i></div>');

//! Nav menu while resizing
$(window).on("resize", function () {
    if ($(this).width() >= 992) {
        burgerBtn.removeClass("on");
        menuItems.css("display", "flex");
        $(".dropdown").removeClass("active").css("display", "none");
    } else {
        burgerBtn.removeClass("on");
        menuItems.css("display", "none");
    }
});

//! Clicking to arrows 
menuArrow.on("click", function () {
    dropdownArrow = $(this).parent().parent().children(".dropdown");
    dropdownArrow.slideToggle().addClass("active");
    return false;
});

//! Burger btn
burgerBtn.on("click", function () {
    $(this).toggleClass("on");
    menuItems.slideToggle();
});

//! Hover
dropdownLink.hover(function () {
    if ($(window).width() >= 992) {        
    dropdown = $(this).children(".dropdown");
    dropdown.stop(false, true).slideDown().addClass("active");

    if ($(this).hasClass("has-child-1")) {
        if (dropdown.offset().left + dropdown.width() >= $(window).width()) {
            dropdown.css("left", "-112px");
        }
    }

    if ($(this).hasClass("has-child-2")) {
        if (dropdown.offset().left + dropdown.width() >= $(window).width()) {
            dropdown.css("left", "-245px");
        }
    }
}

}, function () {
    if ($(window).width() >= 992) {        
    $(this).children(".dropdown").stop(false, true).slideUp().removeClass("active");
    }
});