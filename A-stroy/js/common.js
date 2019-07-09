$(function() {
	//! DOM	
	const subHeader = $("header .sub-header");
	const topLine = $("header .top-line");
	const dropdownLink = $(".dropdown-link");
	const dropdown = $(".dropdown");
	const searchBtn = $(".search-btn");
	const searchField = $(".search-field");
	const burgerBtn = $(".burger-btn");
	const menu = $(".nav-menu");

	//! Fixed nav
	$(window).on("scroll", function () {
		if ($(this).scrollTop() > topLine.height() + 120) {
			subHeader.addClass("fixed");
		} else {
			subHeader.removeClass("fixed");
		}
	});

	//! Nav menu while resizing
	$(window).on("resize", function () {
		if ($(this).width() >= 992) {
			burgerBtn.removeClass("on");
			menu.css("display", "flex");
		} else {
			burgerBtn.removeClass("on");
			menu.css("display", "none");
		}
	});

	//! Burger-btn
	burgerBtn.on("click", function () {
		$(this).toggleClass("on");
		menu.slideToggle();
	});

	//! Search button
	searchBtn.on("click", function () {
		searchField.toggleClass("active");
	});

	//! Dropdown menu
	dropdownLink.on("click", function () {
		if ($(window).width() <= 992) {
			return false;
		}
	});

	dropdownLink.hover(function () {
		$(this).children(".dropdown").stop(false, true).slideDown().addClass("active");
	}, function () {
		$(this).children(".dropdown").stop(false, true).slideUp().removeClass("active");
	});
});