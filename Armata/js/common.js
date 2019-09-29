$(function() {
	//! Animate On Scroll Library
	AOS.init({duration: 1000, once: true});

	//! DOM
	const burgerBtn = $(".burger-btn");
	const mainMenu = $(".main-menu ul");
	const commentSlider = $(".comment-slider");
	const scrollDownBtn = $(".scroll-down-btn");
	const scrollUpBtn = $(".scroll-up button");

	//! Events
	burgerBtn.on("click", function (event) {
		event.stopPropagation();
		$(event.currentTarget).toggleClass("on");
		mainMenu.slideToggle();
	});

	if ($(window).width() <= 1200) {
		$("header .top-line .main-menu a").removeClass("active");
	}

	$(window).on("resize", function () {
		if ($(window).width() <= 1200) {
			$("header .top-line .main-menu a").removeClass("active");
		} else {
			$("header .top-line .main-menu a").eq(0).addClass("active");
		}
	});

	$(document.body).on("click", function (params) {
		if ($(window).width() <= 1200) {
			burgerBtn.removeClass("on");
			// header
			mainMenu.slideUp(150);
		} else {
			mainMenu.slideDown(150);
		}
	});

	mainMenu.on("click", function (e) {
		e.stopPropagation();
	});

	//! Nav menu while resizing
	$(window).on("resize", function () {
		if ($(this).width() >= 1200) {
			burgerBtn.removeClass("on");
			mainMenu.css("display", "flex");
		} else {
			burgerBtn.removeClass("on");
			mainMenu.css("display", "none");
		}
	});

	// Scroll down button
	scrollDownBtn.click(function() {
		$("html, body").animate({ scrollTop: $("header").height() + 120 }, "slow");
		return false;
	});

	// Scroll up button
	scrollUpBtn.click(function() {
		$("html, body").animate({ scrollTop: 0 }, "slow");
	});

	//! Slider
	commentSlider.slick({
		autoplay: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		prevArrow: '<div class="slick-prev"><div class="arrow"></div></div>',
		nextArrow: '<div class="slick-next"><div class="arrow"></div></div>',
		responsive: true
	});
});

