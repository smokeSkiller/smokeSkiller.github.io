$(function() {
	//! DOM
	// Menu
	const headerNav = $('.header .nav');
	const navMenuItem = $('.nav-menu__item');
	const navMenuLinkIcon = $('.nav-menu__link i');
	const burgerBtn = $('.burger-btn');
	const activeNavBg = $('.active-nav-bg');
	// FAQ
	const faqHeader = $('.faq-item__header');
	// Contact form
	const telField = $('.contact-form__tel');
	// Tabs
	const tabLink = $('.tabs-header__link');
	// Modal
	const showModalBtn = $('.show-modal-btn');
	const modalForm = $('.modal-form');
	const closeModalBtn = $('.modal-form__close-btn');
	const modalFormTitle = $('.modal-form .contact-form__title');
	const modalFormDefaultTitle = $('.modal-form .contact-form__title').text();
	// Branding Slider
	const brandingSlider = $('.brand-features-slider');
	// About slider
	const aboutSlider = $('.about-slider');

	//! About slider
	aboutSlider.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		arrows: false,
		dots: false,
		pauseOnFocus: false,
		pauseOnHover: false,
	});

	//! AOS
	AOS.init({
		once: true
	});

	//! Branding Slider
	brandingSlider.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		dots: true,
		arrows: false,
		draggable: false,
		pauseOnFocus: false,
		pauseOnHover: false,
	});

	//! Modal form
	showModalBtn.on('click', function () {
		activeNavBg.show();
		modalForm.addClass('active');

		// Check if our button has [modal-title] attribute
		if($(this).is('[modal-title]')) {
			modalFormTitle.text($(this).attr('modal-title'));
		} else {
			modalFormTitle.text(modalFormDefaultTitle);
		}

		// Check if this button is in the table
		if($(this).closest('tr').length) {

			modalFormTitle.append(' ' + $(this).closest('tr').find('td').eq(0).text());
		}

		if($(window).width() <= 576) {
			headerNav.slideUp();

			if(burgerBtn.find('i').hasClass('fa-bars')) {
				$(this).find('i').attr('class', 'fa-light fa-xmark');
			} else {
				burgerBtn.find('i').attr('class', 'fa-light fa-bars');
			}
		}
	});

	modalForm.on('click', function() {
		closeModalForm();
	});

	closeModalBtn.on('click', function () {
		closeModalForm();
	});

	$('.contact-form').on('click', function(e) {
		e.stopPropagation();
	});

	function closeModalForm() {
		activeNavBg.hide();
		modalForm.removeClass('active');
	}

	//! Tabs 
	tabLink.on('click', function () {
		const tabContent = $('#tab' + $(this).attr('tab-pos'));

		tabLink.removeClass('active');
		$('.tabs-tab').removeClass('active');

		$(this).addClass('active');
		tabContent.addClass('active');
	});

	//! Contact form
	$(document).ready(function() {
		telField.mask('+7 (999) 999-99-99');
	});

	//! FAQ
	faqHeader.on('click', function () {
		$(this).parent().find('.faq-item__bottom').slideToggle();

		if($(this).find('i').hasClass('fa-plus')) {
			$(this).find('i').attr('class', 'fa-solid fa-minus');
		} else {
			$(this).find('i').attr('class', 'fa-solid fa-plus');
		}
	});

	//! Nav menu link
	navMenuItem.on('click', function () {
		$(this).find('.nav-menu-dropdown').slideToggle();
	});

	//! Menu
	burgerBtn.on('click', function() {
		if($(this).find('i').hasClass('fa-bars')) {
			$(this).find('i').attr('class', 'fa-light fa-xmark');
		} else {
			$(this).find('i').attr('class', 'fa-light fa-bars');
		}

		headerNav.slideToggle();
		activeNavBg.show();
	});

	activeNavBg.on('click', function () {
		headerNav.slideUp();
		$(this).hide();

		if(burgerBtn.find('i').hasClass('fa-bars')) {
			$(this).find('i').attr('class', 'fa-light fa-xmark');
		} else {
			burgerBtn.find('i').attr('class', 'fa-light fa-bars');
		}
	});

	// Menu Hover on PC
	if($(window).width() >= 992) {
		navMenuItem.hover(function(){
			$(this).find('.nav-menu-dropdown').stop(false, true).slideDown();
			}, function(){
			$(this).find('.nav-menu-dropdown').stop(false, true).slideUp();
		});
	}
});
