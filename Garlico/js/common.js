$(function() {
	//! DOM
	// Header
	const fixedHeader = $(".fixed-header");
	const fixedMenu = $(".fixed-header .top-menu");
	const fixedHamburger = $("header .hamburger").eq(0);
	const header = $("header.fullBackground");
	const topLine = $("header .top-line")
	const hamburger = $("header .hamburger").eq(1);
	const navMenu = $("header .top-menu");
	const navMenuLink = $("header .top-menu .link");
	const scrollDownBtn = $(".mouse-scroll-btn");
	// Tabs
	const tab = $(".tab");
	const tabContent = $(".tab-content");
	const productViewBtn = $(".product .view-btn");
	const modal = $(".modal");
	const modalCloseBtn = $(".modal-close-btn");

	//! Fixed header
	$(window).on("scroll", function () {
		if ($(this).width() >= 200) {
			if ($(this).scrollTop() > topLine.height() + 120) {
				fixedHeader.slideDown();
				fixedHeader.css("display", "flex");
			} else {
				fixedHeader.slideUp();
			}
		}
	});

	//! Modal windows 
	// Open
	productViewBtn.on("click", function () {
		modal.fadeIn();
		modal.css("display", "flex");
	});

	// Close
	modalCloseBtn.on("click", function () {
		modal.fadeOut();
	});

	//! Full clip background
	header.fullClip({
		images: ['img/garlics1.png', 'img/garlics2.png', 'img/garlics3.png'],
		transitionTime: 500,
		wait: 10000
	});

	//! Scroll down button
	scrollDownBtn.click(function() {
		$("html, body").animate({ scrollTop: $("header").height() + 30 }, "slow");
		return false;
	});

	//! Tabs
	tabContent.not(":first").hide();

	// Clicking to tabs
	tab.on("click", function (event) {
		if ($(event.currentTarget).hasClass("active")) {
			console.log("You've clicked the same tab several times");
		} else {
			tab.removeClass("active").eq($(this).index()).addClass("active");
			tabContent.slick("unslick").hide().eq($(this).index()).fadeIn(800);
			tabSlider();
		}
	});

	// Sliders
	tabSlider();

	// Tab slider
	function tabSlider() {
		tabContent.slick({
			zIndex: 111,
			slidesToShow: 4,
			slidesToScroll: 4,
			infinite: false,
			dots: true,
			dotsClass: "slider-dots",
			prevArrow: '<div class="slick-prev"><div class="arrow"></div></div>',
			nextArrow: '<div class="slick-next"><div class="arrow"></div></div>',
			responsive: [
				{
				breakpoint: 1200, 
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				}
			},
			{
				breakpoint: 992, 
				settings: {
					swipe: true,
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},
			{
				breakpoint: 535, 
				settings: {
				slidesToShow: 1,
					slidesToScroll: 1,
				}
			}
		]
		});
	}
	
	//! Responsive menu
	//* Clicking to button
	// Header
	hamburger.on("click", function (event) {
		$(event.currentTarget).toggleClass("is-active");
		// header
		navMenu.slideToggle(150);
	});

	// Fixed header
	fixedHamburger.on("click", function (event) {
		$(event.currentTarget).toggleClass("is-active");
		// header
		fixedMenu.slideToggle(150);
	});

	// Header
	if ($(window).width() < 1200) {
		navMenuLink.removeClass("hvr-underline-from-center");
	}

	//! Animate On Scroll Library
	AOS.init({duration: 1000, once: true});

	//! Smooth scrolling
	$(window).on('load', function() {
		if ($(window).width() >= 1280) {
			$(this).impulse({tempo: 400, range: 115, curb: 6});
		}
	});
});
