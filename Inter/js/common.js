$(function() {
	//! DOM
	// Header
	const header = $('.header');
	const topEmptySpace = $('.top-empty-space');
	// Tabs
	const tabsControllerItem = $('.tabs-controller-item');
	const tabsContentItem = $('.tabs-content-item');
	// Slider
	const tabsController = $('.tabs-controller');
	const tabsTopGallery = $('.tabs-content-item-top-gallery');
	const tabsBottomGallery = $('.tabs-content-item-bottom-gallery');
	const reviewsSlider = $('.reviews-slider');
	const projectsSlider = $('.projects-row');
	// Modal
	const openModalBtn = $('.open-modal-btn');
	const closeModalBtn = $('.modal-form__close-btn');
	const modalForm = $('.modal-form');
	const modal = $('.modal');
	// Mobile menu
	const burgerBtn = $('.burger-btn');
	const mobileNav = $('.mobile-nav');
	const mobileNavMenuLink = $('.mobile-nav-menu__item-link');
	// Mega dropdown menu
	const dropdownMenuItem = $('.menu .has-child');
	// Detail
	const taskFormExpandBtn = $('.task-form__expand-btn');
	const taskFormExpandRow = $('.task-form__expand-row');

	//! Expand task forms
	taskFormExpandBtn.on('click', function () {
		// Button style
		$(this).toggleClass('opened');

		// Expand Row
		taskFormExpandRow.toggle();
		taskFormExpandRow.toggleClass('opened');
	});

	//! Yandex map
	ymaps.ready(init);
	function init() {
		// Создание карты.
		const myMap = new ymaps.Map("map", {
			// Координаты центра карты.
			// Порядок по умолчанию: «широта, долгота».
			// Чтобы не определять координаты центра карты вручную,
			// воспользуйтесь инструментом Определение координат.
			center: [55.752566, 49.135457],
			// Уровень масштабирования. Допустимые значения:
			// от 0 (весь мир) до 19.
			zoom: 16,
			controls: []
		});

		const placemark = new ymaps.Placemark([55.752566, 49.135457], {
			balloonContent: "Воскресенская улица, 20А, Казань, Республика Татарстан (Татарстан), 420054"
		});

		myMap.geoObjects.add(placemark);
	}  

	//! Header
	$(window).on('scroll', function() {
		if($(this).scrollTop() >= 220) {
			header.addClass('fixed');
			topEmptySpace.show();
		} else {
			header.removeClass('fixed');
			topEmptySpace.hide();
		}
	});

	//! Tabs
	// Tabs functionality
	tabsControllerItem.on('click', function () {
		const tabIndex = $(this).attr('tab-target');
		const topGallery = $('#tab' + tabIndex).find('.tabs-content-item-top-gallery');
		const bottomGallery = $('#tab' + tabIndex).find('.tabs-content-item-bottom-gallery');

		// Remove class active in all items
		tabsControllerItem.removeClass('active');
		tabsContentItem.removeClass('active');

		// Add class active to current item
		$(this).addClass('active');
		$('#tab' + tabIndex).addClass('active');

		// Unslick previous slider
		$('.tabs-content-item-top-gallery').slick('unslick');
		$('.tabs-content-item-bottom-gallery').slick('unslick');

		// Tabs top gallery 
		topGallery.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			nextArrow: '<button type="button" class="slide-next slick-arrow"><i class="fas fa-angle-right"></i></button>',
			prevArrow: '<button type="button" class="slide-prev slick-arrow"><i class="fas fa-angle-left"></i></button>',
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						asNavFor: '.tabs-content-item-bottom-gallery',
					}
				},
			]
		}); 

		// Tabs bottom gallery 
		bottomGallery.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			infinite: false,
			asNavFor: '.tabs-content-item-top-gallery',
			focusOnSelect: true,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
					slidesToShow: 3,
					}
				},
				]
		});
	});

	//! Slider
	// Tabs controller
	tabsController.slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		infinite: true,
		nextArrow: '<button type="button" class="slide-next slick-arrow"><i class="fas fa-angle-right"></i></button>',
		prevArrow: '<button type="button" class="slide-prev slick-arrow"><i class="fas fa-angle-left"></i></button>',
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
				}
			},
			]
	}); 

	// Tabs top gallery 
	tabsTopGallery.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: false,
		nextArrow: '<button type="button" class="slide-next slick-arrow"><i class="fas fa-angle-right"></i></button>',
		prevArrow: '<button type="button" class="slide-prev slick-arrow"><i class="fas fa-angle-left"></i></button>',
		// asNavFor: '.tabs-content-item-bottom-gallery'
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					asNavFor: '.tabs-content-item-bottom-gallery',
				}
			},
		]
	}); 

	// Tabs bottom gallery 
	tabsBottomGallery.slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		infinite: false,
		asNavFor: '.tabs-content-item-top-gallery',
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
				slidesToShow: 3,
				}
			},
		]
	}); 

	// Projects
	if($(window).width() <= 992) {
		projectsSlider.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			infinite: true,
			nextArrow: '<button type="button" class="slide-next slick-arrow"><i class="fas fa-angle-right"></i></button>',
			prevArrow: '<button type="button" class="slide-prev slick-arrow"><i class="fas fa-angle-left"></i></button>',
			responsive: [
				{
					breakpoint: 992,
					settings: {
					slidesToShow: 2,
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 1,
					}
				},
				]
		}); 
	}

	// Reviews
	reviewsSlider.slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		infinite: true,
		nextArrow: '<button type="button" class="slide-next slick-arrow"><i class="fas fa-angle-right"></i></button>',
		prevArrow: '<button type="button" class="slide-prev slick-arrow"><i class="fas fa-angle-left"></i></button>',
		responsive: [
			{
				breakpoint: 1200,
				settings: {
				slidesToShow: 3,
				}
			},
			{
				breakpoint: 992,
				settings: {
				slidesToShow: 2,
				}
			},
			{
				breakpoint: 576,
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
		$(`#${modalId}`).fadeIn();
	});

	//* Close modal
	// Close button
	closeModalBtn.on('click', function() {
		$(this).closest('.modal').fadeOut();
	});

	// Close modal clicking to modal
	modal.on('click', function() {
		$(this).fadeOut();
	});

	// Stop propagation modal form
	modalForm.on('click', function(e) {
		e.stopPropagation();
	});

	//! Mobile menu
	//* Open submenu
	mobileNavMenuLink.on('click', function () {
		$(this).addClass('active');
		$(this).next().slideDown();
	});

	//* Open&close mobile menu
	burgerBtn.on('click', function () {
		$(this).find('.bars').toggleClass('active');

		mobileNav.slideToggle();
	});

	//! Mega dropdown menu
	//* Sliding 1st level dropdown
	dropdownMenuItem.hover(function () {
		if($(window).width() > 992) {
			$(this).children('.dropdown').stop(false, true).fadeIn();
		}
	}, function () {
		if($(window).width() > 992) {
			$(this).children('.dropdown').stop(false, true).fadeOut();
		}
	});
});
