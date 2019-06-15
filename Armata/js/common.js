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
		$(event.currentTarget).toggleClass("on");
		mainMenu.slideToggle("active");
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

	//! smooth scrolling
	$(function() {
		// scrollSpeed(step, speed);
		jQuery.scrollSpeed(100, 800);
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

