$(function() {

	//! DOM
	const burgerBtn = $("header .burger-btn"); 
	const headerMenu = $(".header-menu");
	const topLine = $(".top-line"); 
	const topLineEmpty = $(".top-line-empty");

	//! Fixed top-line 
	$(window).on("scroll", function() {
		if($(this).scrollTop() > topLine.height()) {
			topLine.addClass("fixed");
			topLineEmpty.css("display", "block");
		} else {
			topLine.removeClass("fixed");
			topLineEmpty.css("display", "none");
		}
	});

	//! Responsive menu 
	$(window).on("resize", function () {
		if($(this).width() >= 768) {
			headerMenu.css("display", "flex");
			burgerBtn.removeClass("on");
		} else {
			burgerBtn.removeClass("on");
			headerMenu.css("display", "none");
		}
	});

	burgerBtn.on("click", function (e) {
		e.stopPropagation();
		$(this).toggleClass("on");
		headerMenu.slideToggle();
	});

	//* Clicking to body
	$(document.body).on("click", function (params) {
		if ($(window).width() <= 768) {
			burgerBtn.removeClass("on");
			// header
			headerMenu.slideUp(150);
		} else {
			headerMenu.slideDown(150);
		}
	});

	headerMenu.on("click", function (e) {
		e.stopPropagation();
	});
});
