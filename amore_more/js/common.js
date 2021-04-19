$(function() {

	// Custom JS
	//! DOM
	// Header
	const header = $('.header');
	const menuMobile = $('.header-menu-mobile');
	const burgerBtn =  $('.burger-btn');

	// Footer
	const scrollToTop = $('.scroll-to-top-btn');

	//! Functions
	// Aligning mobile menu to vertical
	menuMobile.css('top', header.outerHeight() + 'px');

	// burger btn
	burgerBtn.on('click', function () {
		burgerBtn.toggleClass('active');

		menuMobile.slideToggle();
	});

	// scroll to top
	scrollToTop.on('click', function () {
		$("html, body").animate({ scrollTop: 0 }, 500);
        return false;
	});

});
