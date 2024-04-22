$(function() {

	// Custom JS
	//! DOM
	// Header
	const header = $('.header');
	const topLineEmpty = $('.top-line-empty');
	const menuMobile = $('.header-menu-mobile');
	const menuMobileLink = $('.header-menu-mobile .header-menu__item');
	const burgerBtn =  $('.burger-btn');

	// Test
	const test = $('.test');

	// Grid
	const grid = $('.section-chapter-grid');
	const gridItem = $('.section-chapter-grid__item');

	// Slick slider
	const partnersSlider = $('.section-partners__slider');

	// Modal
	const mapModalBtn = $('.section-map-map-2__btn');
	const mapModal = $('.section-map-modal');
	const closeModalBtn = $('.section-map-modal__close-btn');
	const adultBtn = $('.modal-adult__btn');
	const openFormBtn = $('.open-modal-form-btn');
	const modalForm = $('.modal-form');
	const modalFormForm = $('.modal-form__form');
	const modalAdult = $('.modal-adult');


	// Scroll buttons
	const scrollToSection = $('.start-banner__scroll-down');
	const scrollToTop = $('.scroll-to-top-btn');

	// burger btn
	burgerBtn.on('click', function () {
		burgerBtn.toggleClass('active');

		menuMobile.slideToggle();
	});

	openFormBtn.on('click', function (e) {
		e.stopPropagation();

		modalForm.css('display', 'flex');
	});

	$(document.body).on("click", function () {
		modalForm.hide();
	});

	modalFormForm.on('click', function (e) {
		e.stopPropagation();
	});

	mapModalBtn.on('click', function () {
		mapModal.addClass('zoomed');
	});

	closeModalBtn.on('click', function () {
		mapModal.removeClass('zoomed');
	});

	//! Functions
	// Modal
	setTimeout(() => {
		modalAdult.show().css('display', 'flex');
	}, 3000);

	adultBtn.on("click", function () {
		$('.modal-adult').hide();
	});


	// fixed header
	topLineEmpty.height(header.outerHeight());

	$(window).on("scroll", function() {
		//! Fixed header
		if($(this).scrollTop() > 0) {
			header.addClass("fixed");
			topLineEmpty.show();

			menuMobile.css('top', header.innerHeight() + 'px');
		} else {
			header.removeClass("fixed");
			topLineEmpty.hide();

			menuMobile.css('top', header.outerHeight() + 'px');
		}
	
		// Scroll to top
		if($(this).scrollTop() > 1000) {
		  scrollToTop.fadeIn();
		} else {
		  scrollToTop.fadeOut();
		}
	});

	// Slider
	partnersSlider.slick({
		slidesToShow: 6,
		slidesToScroll: 1,
		arrows: false,
		dors: false,
		autoplay: true,

		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 5,
				}
			},

			{
				breakpoint: 992,
				settings: {
					slidesToShow: 4,
				}
			},

			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
				}
			},

			{
				breakpoint: 512,
				settings: {
					slidesToShow: 2,
				}
			}
		]
	});

	// Grid
	grid.masonry({
		itemSelector: '.section-chapter-grid__item',
		gutter: 20
	});

	// Animation text
	var typed = new Typed('.typewrite', {
		strings: ['Вина', 'Кино', 'Любви'],
		typeSpeed: 150,
		backSpeed: 100,
		startDelay: 0,
		smartBackspace: true,
		loop: true,
	});

	// Test
	test.on('click', function () {
		alert('Не стоит волноваться, скоро будет доступно!');
	});

	// Aligning mobile menu to vertical
	menuMobile.css('top', header.outerHeight() + 'px');

	// Mobile menu link
	menuMobileLink.on('click', function () {
		burgerBtn.removeClass('active');

		menuMobile.slideUp(100);
	});

	// scroll to top
	scrollToTop.on('click', function () {
		$("html, body").animate({ scrollTop: 0 }, 500);
        return false;
	});

	scrollToSection.on('click', function () {
		$("html, body").animate({ scrollTop: $('.section-card-a').scrollTop() + $('.start-banner').outerHeight() }, 500);
        return false;
	});
});
