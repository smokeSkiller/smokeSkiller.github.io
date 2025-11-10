$(function() {

	//! DOM
	const burgerBtn = $('.burger-btn');
	const mobileNav = $('.mobile-nav');
	const adaptiveBanner = $('.adaptive-banner');

	//! AOS init
	AOS.init({
		once: true
	});

	//! Menu
	// Open
	burgerBtn.on('click', function (e) {
		e.stopPropagation();

		mobileNav.addClass('opened');
	});

	// Close
	$('body').on('click', function () {
		mobileNav.removeClass('opened');
	});

	mobileNav.on('click', function (e) {
		e.stopPropagation();
	});

	//! Start banner
	// Adaptive background
	function adaptiveBannerBg(params) {
		const pcSrc = adaptiveBanner.css('background-image').split('"')[1];
		const mobileSrc = adaptiveBanner.attr('mobile-src');

		if($(window).width() <= 768) {
			adaptiveBanner.css('background-image', 'url(' + mobileSrc + ')')
		}
	}

	adaptiveBannerBg();

	// Slider
	const startBannerSlider = new Swiper('.start-banner-slider', {
		effect: 'coverflow',
		grabCursor: true,
		centeredSlides: true,
		rewind: true,
		slidesPerView: 1.5,
		coverflowEffect: {
			rotate: 0,
			stretch: '69%',
			slideShadows: true,
		},
		pagination: {
			el: '.start-banner-slider-dots', // селектор контейнера для точек
			clickable: true,          // чтобы точки были кликабельными
		},
	})

	// Popups
	$('.start-banner-slider-item').on('click', function(e) {
		e.preventDefault();
		const videoSrc = $(this).attr('video-src'); // или href, если указать в data
		$('#dynamicVideo').attr('src', videoSrc);
	});

	$('.start-banner-slider-item').magnificPopup({
		type: 'inline',
		items: {
			src: '#dynamicVideoModal'
		},
		callbacks: {
			close: function() {
				const video = document.getElementById('dynamicVideo');
				if (video) {
					video.pause();
					video.currentTime = 0;
				}
			}
		}
	});

	//! Portfolio
	// Slider
	const portfolioSlider = new Swiper('.portfolio-slider', {
		// slidesPerView: 'auto',
		// centeredSlides: true,
		// spaceBetween: 0,
		// // loop: true,
		// grabCursor: true,
		// pagination: {
		// 	el: '.portfolio-slider-dots',
		// 	clickable: true,
		// },
		// speed: 700,
		effect: 'coverflow',
		grabCursor: true,
		centeredSlides: true,
		loop: true,
		coverflowEffect: {
			rotate: 0,
			stretch: '50%',
			// slideShadows: true,
		},
		// Navigation arrows
		navigation: {
			nextEl: '.portfolio-nav-next',
			prevEl: '.portfolio-nav-prev',
		},
		// Dots
		pagination: {
			el: '.portfolio-slider-dots', // селектор контейнера для точек
			clickable: true,          // чтобы точки были кликабельными
		},
		// Breakpoints
		breakpoints: {
			768: {
				slidesPerView: 1.84,
			},
			320: {
				slidesPerView: 1.1,
			}
		}
	})

	//! Contact form
	$(document).ready(function() {
		$('#phone-field').mask('+7 (999) 999-99-99');
	});
});
