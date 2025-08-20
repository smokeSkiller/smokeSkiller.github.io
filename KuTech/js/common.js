$(function() {

	//* DOM
	// Header
	const burgerBtn = $('.burger-btn');
	const mobileNav = $('.mobile-nav');
	const mobileClose = $('.mobile-nav__close');
	// Start banner
	const superTitle = $('.main-banner__supertitle');
	const lists = $('.start-banner-lists');
	const breadcrumbs = $('.start-banner-breadcrumb');
	const stripes = $('.start-banner-grid .stripes');
	const square = $('.start-banner-grid .square');
	// Modal
	const modal = $('.modal');
	const openModalBtn = $('.open-modal-btn');
	// Tabs
	const tab = $('.tab');
	// Tooltip
	const tooltipBtn = $('.tooltip-btn');
	// Equipment catalog
	const showMoreEquipmentsBtn = $('.catalog-equipment__show-more');
	// Solutions
	const solutionsBannerText = $('.solutions-banner__text');

	//! AOS init
	AOS.init({
		once: true
	});

	//! Header & menu
	// Open mobile menu
	burgerBtn.on('click', function () {
		mobileNav.slideDown();
	});

	// Close mobile menu
	mobileClose.on('click', function () {
		mobileNav.fadeOut();
	});

	$('body').on('click', function () {
		mobileNav.fadeOut();
	});

	// Stop propagation of mobile menu
	mobileNav.add('header').on('click', e => e.stopPropagation());

	// Window on resize
	$(window).on('resize', function () {
		mobileNav.fadeOut();
	});

	//! Start banner
	// Animation
	$(document).ready(function () {
		let tl = gsap.timeline();

		// Square
		const squareWidth = square.width() / 2;

		// Flash
		function flashBanner() {
			gsap.fromTo('.start-banner__flash',
				{ opacity: 0 },
				{ opacity: .4, duration: 0.3, yoyo: true, repeat: 1 }
			);
		}

		if($(window).width() >= 768 && $('.start-banner').hasClass('contact-banner') !== true) {
			// Stripes animation
			gsap.to(stripes, { 
				left: `100vw`,
				duration: 1.9,
			});

			// Square animation
			tl.to(square, {
				duration: .7, 
				left: `calc(100% - 10px - ${squareWidth}px)`,
				onComplete: () => {
					flashBanner();
				}
			})
			.to(square, {
				duration: .7, 
				top: `calc(100% - ${squareWidth}px)`,
				onComplete: () => {
					// Show super title
					if(superTitle.length > 0) {
						gsap.to(superTitle, { 
							opacity: 1,
							duration: 0.2
						});
					}

					// Show breadcrumbs
					if(breadcrumbs.length > 0) {
						gsap.to(breadcrumbs, { 
							opacity: 1,
							duration: 0.2
						});
					}

					// Show lists from bottom to top
					if(lists.length > 0) {
						let fadeTime = 0;
						const listsItems = lists.find('li');
						let i = listsItems.length;

						while (i > 0) {
							i--;
							fadeTime += 300;

							const listItem = listsItems.eq(i);
							setTimeout(function () {
								listItem.css('opacity', '1');
							}, fadeTime);
						}
					}

					// Show text
					if(solutionsBannerText.length > 0) {
						solutionsBannerText.fadeIn(200);
					}

					square.hide();
				}
			});
		}
	});

	//! Main equipment & certificates & description-slider
	$(document).ready(function () {
		//* Main equipment slider
		const mainEquipmentSlider = new Swiper('.main-equipment-slider', {
			// Optional parameters
			// slidesPerView: 'auto',
			spaceBetween: 100,
			loop: true,
			centeredSlides: true,

			breakpoints: {
				// 1200: {
				// 	slidesPerView: 4
				// },
				992: {
					slidesPerView: 3,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 10,
				},
				320: {
					slidesPerView: 1,
					spaceBetween: 5
				}
			},

			// Navigation arrows
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});

		mainEquipmentSlider.on('slideChange', function () {
			let activeSlide = mainEquipmentSlider.slides[mainEquipmentSlider.activeIndex];
        	let title = $(activeSlide).data('title');
			
			$('.main-equipment-slider__text').text(title);
		});

		//* Certificates slider
		const certificatesSlider = new Swiper('.modal-slider', {
			slidesPerView: 1,
			loop: true,

			navigation: {
				nextEl: '.modal-slider__next',
				prevEl: '.modal-slider__prev',
			},
		});

		//* Description slider
		const descriptionSlider = new Swiper('.description-slider', {
			// Optional parameters
			spaceBetween: 20,

			breakpoints: {
				992: {
					slidesPerView: 3
				},
				768: {
					slidesPerView: 2
				},
				512: {
					slidesPerView: 1
				},
				320: {
					slidesPerView: 'auto',
				}
			},

			// Navigation arrows
			navigation: {
				nextEl: '.slider-nav__next',
				prevEl: '.slider-nav__prev',
			},
		});

		// Zoom images
		$('.description-slider-item').on('click', function () {
			let items = [];

			$('.description-slider-item').each(function() {
				let slideBgSrc = $(this).css('background-image').replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');

				items.push({
					src: slideBgSrc,
				});
			});

			var index = $('.description-slider-item').index(this);

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

	//! Tabs
	tab.on('click', function () {
		const tabTargetAttr = $(this).attr('tab-target');
		const tabTarget = $(`#${tabTargetAttr}`);

		if($(this).hasClass('active') == false) {
			// Add class to tab link
			$(this).parent().find('.tab').removeClass('active');
			$(this).addClass('active');

			// Remove active in all tab-content
			if($(this).closest('.tabs').find('.tabs').length > 0) {
				$(this).closest('.tabs').find('.tab-content:not(.tab-child-content)').hide().removeClass('active');
			} else {
				$(this).closest('.tabs').find('.tab-content').hide().removeClass('active');
			}

			// Add active class to tab target
			tabTarget.fadeIn({
				start: function () {
					$(this).addClass('active');
					$(this).css('display', 'flex');
				}
			});
		}

		// Interface tabs
		if($(this).hasClass('solutions-interface-content-nav__item') && $(this).hasClass('active')) {
			
		}
	});

	//! Tooltip
	tooltipBtn.on('click', function (e) {
		e.stopPropagation();
		tooltipBtn.removeClass('active');
		$('.tooltip-content').fadeOut();

		$(this).toggleClass('active');
		$(this).closest('.has-tooltip').find('.tooltip-content').fadeToggle();
	});

	$('.tooltip-content').on('click', function (e) {
		e.stopPropagation();
	});

	$('body').on('click', function () {
		tooltipBtn.removeClass('active');
		$('.tooltip-content').fadeOut();
	});

	// Show more equipments
	showMoreEquipmentsBtn.on('click', function () {
		$(this).closest('.catalog-equipment-content').find('.catalog-equipment-item.hidden').removeClass('hidden');
		$(this).parent().removeClass('d-flex').addClass('d-none');
	});

	//! Solutions slider
	$(window).on('load', function () {
		const solutionsSlider = new Swiper('.solutions-custom-slider', {
			centeredSlides: true,
			autoplay: {
				delay: 3000,
				pauseOnMouseEnter: true,
				// disableOnInteraction: true,
			},
			initialSlide: 5,
			spaceBetween: 100,
			rewind: true,
			loop: true,
			allowTouchMove: false,
			slideToClickedSlide: true,

			// Navigation arrows
			navigation: {
				nextEl: '.solutions-custom-slider-nav__next',
				prevEl: '.solutions-custom-slider-nav__prev',
			},

			breakpoints: {
				1200: {
					slidesPerView: 7,
				},
				992: {
					slidesPerView: 5,
				},
				576: {
					slidesPerView: 4,
				},
				320: {
					loop: false,
					slidesPerView: 'auto',
					allowTouchMove: true,
				},
			},

			on: {
				init: function() {
					updateSlideClasses(this);
				},
				slideChange: function () {
					updateSlideClasses(this);
				},
			}
		});

		// Update slide classes
		function updateSlideClasses(swiperInstance) {
			// Удаляем все старые классы
			$('.swiper-slide').removeClass(function() {
				return $(this).attr('class').split(' ').filter(c => c.startsWith('prev-group-') || c.startsWith('next-group-')).join(' ');
			});

			// Находим ближайшие слайды
			const $activeSlide = $(swiperInstance.slides[swiperInstance.activeIndex]);
			const $prevSlide = $activeSlide.prev('.swiper-slide');
			const $nextSlide = $activeSlide.next('.swiper-slide');

			// Добавляем prev-group-* (макс. 4 шт.)
			if ($prevSlide.length) {
				$prevSlide.prevAll('.swiper-slide').each(function(index) {
					if (index < 4) $(this).addClass(`prev-group-${index + 1}`);
				});
			}

			// Добавляем next-group-* (макс. 4 шт.)
			if ($nextSlide.length) {
				$nextSlide.nextAll('.swiper-slide').each(function(index) {
					if (index < 4) $(this).addClass(`next-group-${index + 1}`);
				});
			}

			$('.solutions-custom-content-item').hide();
			$('#custom-' + (swiperInstance.realIndex + 1)).fadeIn({
				start: function () {
					$(this).css('display', 'flex');
				}
			});
		}

		let isAutoplayStopped = false;

		function checkSliderVisibility() {
			if($('.solutions-custom-slider').length > 0) {
				const $sliderSection = $('.solutions-custom-slider'); // Замените на ваш селектор
				const sliderTop = $sliderSection.offset().top;
				const sliderBottom = sliderTop + $sliderSection.outerHeight();
				const windowTop = $(window).scrollTop();
				
				// Если прокрутили ВНИЗ и слайдер не виден
				if (windowTop > sliderBottom) {
					if (solutionsSlider.autoplay.running && !isAutoplayStopped) {
						solutionsSlider.autoplay.stop();
						isAutoplayStopped = true;
						console.log('Autoplay остановлен - прокрутка вниз');
					}
				} else {
					if (!solutionsSlider.autoplay.running && isAutoplayStopped) {
						solutionsSlider.autoplay.start();
						isAutoplayStopped = false;
						console.log('Autoplay запущен - прокрутка вверх');
					}
				}
			}
		}

		// Оптимизированный скролл с debounce
		$(window).on('scroll', function() {
			checkSliderVisibility();
		});

		// Проверяем при загрузке
		checkSliderVisibility();
	});
});
