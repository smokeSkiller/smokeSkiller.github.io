$(function() {

	//! DOM
	const header = $('.header');
	const burgerBtn = $('.burger-btn');
	const mobileNav = $('.mobile-nav');
	const adaptiveBanner = $('.adaptive-banner');
	const scrollTopBtn = $('.scroll-top');

	//! AOS init
	AOS.init({
		once: true
	});

	//! Header & Menu
	// Fixed header
	$(window).on('scroll', function (params) {
		if($(this).scrollTop() > $('.start-banner').height() / 2 && $('.start-banner').length > 0) {
			header.addClass('fixed');
		} else {
			header.removeClass('fixed');
		}
	});

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

	// Smooth scroll to sections
	$('.menu-item a').on('click', function (e) {
		e.stopPropagation();

		const currentLink = $(e.currentTarget).attr('href');
		// Slice id of the url
		let currentLinkId = currentLink.slice(currentLink.indexOf("#"), currentLink.length);

		$("html, body").animate({ scrollTop: $('' + currentLinkId + '').position().top - 25 }, "slow");

		if($(window).width() <= 768) {
			mobileNav.removeClass('opened');
		}
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
		slidesPerView: 1.6,
		// loop: true,
		autoplay: {
			delay: 2000,
		},
		coverflowEffect: {
			rotate: 0,
			stretch: '50%',
			slideShadows: true,
		},
		pagination: {
			el: '.start-banner-slider-dots', // селектор контейнера для точек
			clickable: true,          // чтобы точки были кликабельными
		},
		// Breakpoints
		breakpoints: {
			768: {
				slidesPerView: 1.6,
			},
			320: {
				slidesPerView: 1.85,
			}
		}
	})

	// Popups
	$('.start-banner-slider-item').on('click', function(e) {
		e.preventDefault();

		const videoSrc = $(this).find('source').attr('src');
		// const videoSrc = $(this).attr('video-src');
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
		effect: 'coverflow',
		grabCursor: true,
		centeredSlides: true,
		loop: true,
		autoplay: {
			delay: 12000,
		},
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
			el: '.portfolio-slider-dots', 
			clickable: true, 
			dynamicBullets: true, // точки сжимаются и показываются частично
    		dynamicMainBullets: 3, // максимум отображаемых точек одновременно
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

	$('.portfolio-slider-item').on('click', function() {
		let items = [];

		$('.portfolio-slider-item').each(function() {
			items.push({
				src: $(this).data('full-image'),
			});
		});

		let index = $('.portfolio-slider-item').index(this);

		// Открываем попап
		$.magnificPopup.open({
			items: items,
			type: 'image',
			gallery: {
				enabled: true
			},
			// mainClass: 'mfp-with-zoom',
			// zoom: {
			// 	enabled: true,
			// 	duration: 300
			// },
			callbacks: {
				open: function() {
					// Устанавливаем начальный индекс
					this.goTo(index);
				}
			}
		});
	});

	//! Contact form
	$(document).ready(function() {
		$('#phone-field').mask('+7 (999) 999-99-99');
	});

	//! Scroll top
	$(window).on('scroll', function (params) {
		if($(this).scrollTop() > $('.start-banner').height() && $('.start-banner').length > 0) {
			scrollTopBtn.show();
		} else {
			scrollTopBtn.hide();
		}
	});

	scrollTopBtn.on('click', function () {
		$("html, body").animate({ scrollTop: 0 }, "slow");
	});
});
