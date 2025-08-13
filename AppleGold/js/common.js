$(function() {

	//! DOM
	// Auto scale
	const scaleWrapper = $('.scale-wrapper');
	// Header
	const header = $('.header');
	const topEmptySpace = $('.top-empty-space');
	const logo = $('.header-logo img');
	const logoUrl = logo.attr('src');
	const logoDarkUrl = logo.attr('dark-src');
	const pcMenuItem = $('.pc-menu-item.has-child');
	// Mobile menu
	const burgerBtn = $('.burger-btn');
	const mobileMenu = $('.mobile-menu');
	// Start banner
	const startBannerSlider = $('.start-banner-slider');
	// Main catalog
	const mainCatalog = $('.main-catalog');
	// Filters
	const openFiltersBtn = $('.open-filters');
	const openSearchBtn = $('.open-search');
	const mobileFitersItemTitle = $('.filters-mobile .filters-item__title');
	// Main slider
	const mainSlider = $('.main-slider__inner');
	// Modal
	const modal = $('.modal');
	const openModalBtn = $('.open-modal-btn');
	// Card
	const selectAllProducts = $('.cart-top__select-all input');
	const cartItemCheckbox = $('.cart-body-item input[type="checkbox"]');
	// Product page
	const horizontalSlider = $('.product-page .horizontal-slider__inner');
	const verticalSlider = $('.product-page .vertical-slider');

	//! AutoScale
	function autoscale() {
		var windowWidth = $(window).width();
		var baseWidth = 1360;
		var scale = windowWidth < baseWidth ? windowWidth / baseWidth : 1;

		if(windowWidth <= 1360 && windowWidth >= 768) {
			scaleWrapper.css({
				'transform': 'scale(' + scale + ')',
				'width': baseWidth + 'px' // сохраняем базовую ширину, чтобы не сжимался контент
			});

			// Реальная (отображаемая) высота блока после scale
			const scaledHeight = $('#scaleWrapper')[0].getBoundingClientRect().height;
			$('.scale-container').css('height', scaledHeight + 'px');
		} else {
			scaleWrapper.css({
				'transform': 'none',
				'width': '100%' // reset autoscale
			});

			$('.scale-container').css('height', 'auto');
		}
    }

    $(document).ready(function() {
		autoscale();
		$(window).on('resize', autoscale);
    });

	//! Header
	// Logo
	function updateLogo() {
		if(header.hasClass('header-dark')) {
			logo.attr('src', logoDarkUrl);
		} else {
			logo.attr('src', logoUrl);
		}
	}

	updateLogo();

	// Fixed header
	$(window).on('scroll', function () {
		if($('.start-banner').length > 0) {
			if($(this).scrollTop() >= 5) {
				header.removeClass('header-dark');
			} else {
				header.addClass('header-dark');
			}

			updateLogo();
		}
	});

	//* PC menu
	pcMenuItem.hover(function () {
		$(this).find('.pc-menu-item-dropdown').stop(false, true).slideDown();
	}, function () {
		$(this).find('.pc-menu-item-dropdown').stop(false, true).hide();
	});

	//* Mobile menu
	burgerBtn.on('click', function (e) {
		e.stopPropagation();

		$(this).toggleClass('active');
		mobileMenu.slideToggle();
		header.removeClass('header-dark');
		updateLogo();
	});

	header.on('click', function () {
		mobileMenu.slideUp();
		burgerBtn.removeClass('active');
	});

	//! Start banner
	startBannerSlider.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 3000,
		dots: false,
		arrows: false,
		swipe: false,
		draggable: false,
		pauseOnHover: false,
		pauseOnFocus: false,
	}); 

	//! Main catalog
	mainSlider.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
		fade: true,
		dots: true,
		arrows: false,
		pauseOnHover: false,
		pauseOnFocus: false,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: true,
					prevArrow: '<button class="main-slider-arrows__item"><i class="fa-light fa-angle-left"></i></button>',
					nextArrow: '<button class="main-slider-arrows__item"><i class="fa-light fa-angle-right"></i></button>',
					appendArrows: '.main-slider-arrows'
				}
			}
		]
	}); 

	//! Select all product in cart
	selectAllProducts.change(function() {
		cartItemCheckbox.prop('checked', this.checked);
	});

	cartItemCheckbox.on('change', function () {
		if ($('.cart-body-item input[type="checkbox"]:checked').length === cartItemCheckbox.length) {
			selectAllProducts.prop('checked', true);
		} else {
			selectAllProducts.prop('checked', false);
		}
	});

	//! Modal
	// Open
	openModalBtn.on('click', function () {
		const targetModal  = $(this).attr('target-modal');

		$(targetModal).fadeIn({
			start: function () {
				$(this).css('display', 'flex');
			}
		});
	});

	// Close
	$('.modal__close-btn').on('click', function () {
		$(this).closest('.modal').fadeOut();
	});

	modal.on('click', function () {
		$(this).fadeOut();
	});

	// Stop propagation on modal inner
	$('.modal-inner').on('click', function (e) {
		e.stopPropagation();
	});

	//! Filters
	//* Mobile filters
	// Open filters
	openFiltersBtn.on('click', function () {
		$('.filters-mobile .filters-item').slideToggle(300);
	});

	// Open search
	openSearchBtn.on('click', function () {
		$('.filters-mobile .filters__search').slideToggle(300);
	});

	// Open mobile item body
	mobileFitersItemTitle.on('click', function () {
		$(this).parent().find('.filters-item-body').slideToggle(300);
	});

	//* Price slider
	let minPrice = 10000;
	let maxPrice = 100000;

	$(".filters-price__slider").slider({
		range: false,
		min: minPrice,
		max: maxPrice,
		values: [10000, 100000],
		slide: function (event, ui) {
			$("#price-min").val(ui.values[0]);
			$("#price-max").val(ui.values[1]);
		}
	});

	// Синхронизация при ручном вводе
	$("#price-min, #price-max").on("input", function () {
		let minVal = parseInt($("#price-min").val()) || minPrice;
		let maxVal = parseInt($("#price-max").val()) || maxPrice;

		if (minVal > maxVal) {
			minVal = maxVal;
			$("#price-min").val(minVal);
		}

		$("#price-slider").slider("values", [minVal, maxVal]);
	});

	//! Product page
	// Horizontal slider
	horizontalSlider.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: false,
		fade: true,
		asNavFor: '.vertical-slider',
		draggable: false,
		// swipe: false,
		// pauseOnHover: false,
		// pauseOnFocus: false,
	}); 

	// Vertical slider
	verticalSlider.slick({
		slidesToShow: 6,
		slidesToScroll: 1,
		dots: false,
		arrows: false,
		loop: false,
		vertical: true,
		verticalSwiping: true,
		asNavFor: '.horizontal-slider__inner',
		focusOnSelect: true,
		draggable: false,
	});
});
