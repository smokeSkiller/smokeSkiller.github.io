$(function() {
	//! DOM	
	const dropdownLink = $(".dropdown-link");
	const dropdown = $(".dropdown");
	const searchBtn = $(".search-btn");
	const searchField = $(".search-field");
	const burgerBtn = $(".burger-btn");
	const menu = $(".nav-menu");

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
	dropdownLink.hover(function () {
		$(this).children(".dropdown").stop(false, true).slideDown().css("display", "flex");
	}, function () {
		$(this).children(".dropdown").stop(false, true).slideUp();
	});
});