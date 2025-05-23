$(function() {

	//! DOM
	// Header
	const header = $('.header');
	const menuItem = $('.header-menu-item a');
	const navBar = $('.header-navbar');
	const burgerBtn = $('.burger-btn');
	const toScrollSections = $('.to-scroll');
	// Section A
	const sectionAbox = $('.section-a-box');
	// Section E
	const teamSlider = $('.section-e-slider');
	// Modal
	const modal = $('.modal');
	const openModalBtn = $('.open-modal-btn');
	const closeModalBtn = $('.modal-close-btn');
	// Form
	const telField = $('.tel-field');

	//! Header 
	// Smooth scroll to sections
	menuItem.on('click', function (e) {
		e.stopPropagation();

		const currentLink = $(e.currentTarget).attr('href');
		// Slice id of the url
		let currentLinkId = currentLink.slice(currentLink.indexOf("#"), currentLink.length);

		console.log($('' + currentLinkId + ''));
		$("html, body").animate({ scrollTop: $('' + currentLinkId + '').position().top - 25 }, "slow");

		if($(window).width() <= 1270) {
			navBar.hide().removeClass('opened');
			burgerBtn.removeClass('active');
			header.removeClass('expanded');
		}
	});

	// Auto selecting active link
	function autoSelect() {
		const scrollPos = $(window).scrollTop();
		const headerHeight = header.outerHeight();

		toScrollSections.each(function () {
			const id = $(this).attr('id');
			let top = $(this).offset().top - headerHeight; // учёт высоты меню
			let bottom = top + $(this).outerHeight();

			if(id == 'contacts') {
				top = $(this).offset().top - headerHeight * 5;
			}

			if (scrollPos >= top && scrollPos < bottom) {
				$('.header-menu-item').removeClass('active');
				$('.header-menu-item a[href="#' + id + '"]').closest('.header-menu-item').addClass('active');
			}
    	});
	}

	$(window).on('scroll', function () {
		autoSelect();
	});

	autoSelect();

	//* Fixed header
	$(window).on('scroll', function() {
		fixHeader();
	});

	fixHeader();

	function fixHeader() {
		if($(this).scrollTop() >= 1) {
			header.addClass('fixed');
		} else {
			header.removeClass('fixed');
		}
	}

	//* Open&close menu 
	burgerBtn.on('click', function() {
		$(this).toggleClass('active');
		header.toggleClass('expanded');

		if(navBar.hasClass('opened') == false) {
			navBar.fadeIn({
				start: function () {
					$(this).css({
						display: "flex"
					})
				}
			}).addClass('opened');
		} else {
			navBar.hide().removeClass('opened');
		}
	});

	//! Section A
	function changeSectionAbg(params) {
		if($(window).width() <= 768) {
			const mobileUrl = sectionAbox.attr('mobile-image');
			sectionAbox.css('background-image', 'url(' + mobileUrl + ')');
		} else if($(window).width() >= 768 && $(window).width() <= 1270) {
			sectionAbox.css('background-image', 'linear-gradient(90deg, #FF740F, #994609)');
		}
	}

	changeSectionAbg();

	$(window).on('resize', function () {
		changeSectionAbg();
	});

	//! Section E
	// Slider
	teamSlider.slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 4000,
		pauseOnHover: false,
		pauseOnFocus: false,
		arrows: true,
		// appendArrows: '.section-e-arrows',
		// nextArrow: '<button type="button" class="slide-next slick-arrow"><span class="value"><i class="fa-light fa-angle-right"></i></span></button>',
		// prevArrow: '<button type="button" class="slide-prev slick-arrow"><span class="value"><i class="fa-light fa-angle-left"></i></span></button>',
		dots: false,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
				}
			},
		]
	}); 

	//! Modal 
	//* Open modal
	openModalBtn.on('click', function() {
		const modalId = $(this).attr('target');
		$(`#${modalId}`).fadeIn({
			start: function () {
				$(this).css('display', 'flex');
			}
		});
	});

	//* Close modal
	// Modal
	modal.on('click', function() {
		$(this).fadeOut();
	});

	// Close button
	closeModalBtn.on('click', function() {
		$(this).closest('.modal').fadeOut();
	});

	// Stop propagation
	$('.modal-inner').on('click', function (e) {
		e.stopPropagation();
	});

	//! Form
	//* Tel mask
	telField.mask('+7 (999) 999-99-99');

	//! AOS
	AOS.init({
		once: true,
		duration: 600, // values from 0 to 3000, with step 50ms
		// disable: 'phone',
	});
});
