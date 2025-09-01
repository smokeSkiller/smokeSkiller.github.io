$(function() {

	//! DOM
	const header = $('.header');
	const burgerBtn = $('.header-burger-btn');
	const mainNav = $('.main-nav');
	// Auto scale
	const scaleWrapper = $('.scale-wrapper');

	//! Header menu
	burgerBtn.on('click', function (e) {
		e.stopPropagation();
		[$(this), mainNav, header].map(x=>x.toggleClass('active'));
	});

	// Close menu on clicking to header
	header.on('click', function () {
		[$(this), mainNav, burgerBtn].map(x=>x.removeClass('active'));
	});

	//! AutoScale
	function autoscale() {
		var windowWidth = $(window).width();
		var baseWidth = 1920;
		var scale = windowWidth / baseWidth;

		if(windowWidth >= 768) {
			scaleWrapper.css({
			// 	'transform': 'scale(' + scale + ')',
				'zoom': scale,
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

	//! Section A
	if($('.section-a-slider').length > 0) {
		let PER_VIEW = 4; // показываем/меняем по 4
		const SLOTS_PCT = (n) => Array.from({length:n}, (_,i) => (100/n)*i); // [0,25,50,75] при 4

		if ($(window).width() <= 768) {
			PER_VIEW = 2;
		}

		const sectionAslider = new Swiper('.section-a-slider', {
			slidesPerView: PER_VIEW,
			spaceBetween: 10,
			slidesPerGroup: PER_VIEW,  // логика смены по 4
			virtualTranslate: true,
			loop: true,

			on: {
				init(s) {
					renderGroup(s); 
				},
				slideChange(s) { 
					renderGroup(s); 
				},
				resize(s) { 
					renderGroup(s); 
				},
			},
		
		});

		function renderGroup(s) {
			const total = s.slides.length;
			if (total === 0) return;

			const per = Math.min(PER_VIEW, total);
			const slots = SLOTS_PCT(per);
			const start = Math.floor(s.activeIndex / PER_VIEW) * PER_VIEW; // «страница» по 4

			// Скрыть всё
			s.slides.forEach(slide => {
				slide.style.opacity = "0";
				slide.style.pointerEvents = "none";
				slide.style.zIndex = "1";
			});

			// Показать текущие 4 в слотах 0..3, без движения контейнера
			for (let i = 0; i < per; i++) {
				const idx = (start + i) % total; // если total не кратно 4 — замкнём по кругу
				const slide = s.slides[idx];
				slide.style.left = `${slots[i]}%`; // кладём в «ячейки» 0/25/50/75%
				slide.style.opacity = "1";
				slide.style.pointerEvents = "auto";
				slide.style.zIndex = "2";
			}
		}

		let currentPage = 0;

		setInterval(() => {
			const totalPages = Math.ceil(sectionAslider.slides.length / PER_VIEW);
			currentPage = (currentPage + 1) % totalPages;

			// Программно двигаем "активный индекс" (но не wrapper!)
			sectionAslider.slideTo(currentPage * PER_VIEW, 0); 
			renderGroup(sectionAslider);
		}, 3000);
	}

	//! Section C
	// Tel mask
	const $input = $("#form-phone");
	if($input.length > 0) {
		window.intlTelInput($input[0], {
			initialCountry: "ru",
			geoIpLookup: callback => {
				fetch("https://ipapi.co/json")
				.then(res => res.json())
				.then(data => callback(data.country_code))
				.catch(() => callback("ru"));
			},
			preferredCountries: ["ru"], // Приоритетные страны
			separateDialCode: true, // Показывать код страны отдельно (+7)
			strictMode: true,
			loadUtils: () => import("https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/utils.js")
		});
	}

	//! FAQ
	$('.faq-item-question').on('click', function () {
		if($(this).hasClass('opened') == false) {
			$(this).closest('.faq').find('.faq-item').removeClass('opened');
			$(this).closest('.faq').find('.faq-item-question').removeClass('opened');

			$(this).closest('.faq-item').addClass('opened');
			$(this).closest('.faq').find('.faq-item-answer').slideUp();
			$(this).next().slideToggle();
			$(this).toggleClass('opened');
		} else {
			$(this).closest('.faq-item').removeClass('opened');
			$(this).closest('.faq').find('.faq-item-question').removeClass('opened');
			$(this).next().slideUp();
			$(this).removeClass('opened');
		}
	});

	//! Section E
	const sectionEslider = new Swiper('.section-e-slider', {
		spaceBetween: 10,
		// Navigation arrows
		navigation: {
			nextEl: '.section-e-slider__next',
			prevEl: '.section-e-slider__prev',
		},
		breakpoints: {
			768: {
				slidesPerView: 4,
			},
			510: {
				slidesPerView: 2,
			},
			310: {
				slidesPerView: 1,
			}
		}
	});

	//! Section F
	const sectionFslider = new Swiper('.section-f-slider', {
		autoplay: {
			delay: 3000,
		},
		effect: 'fade',
		fadeEffect: {
			crossFade: true, // Дополнительное затемнение
		},
		loop: true,
		allowTouchMove: false,
	});

	//! Section G
	const sectionGslider = new Swiper('.section-g-slider', {
		spaceBetween: 10,
		autoplay: {
			delay: 5000,
		},
		loop: true,
		// Navigation arrows
		navigation: {
			nextEl: '.section-g-slider__next',
			prevEl: '.section-g-slider__prev',
		},
		breakpoints: {
			768: {
				slidesPerView: 4,
			},
			576: {
				slidesPerView: 2,
			},
			310: {
				slidesPerView: 'auto',
			}
		}
	});

	//! Section J
	const sectionJslider = new Swiper('.section-j-slider', {
		spaceBetween: 10,
		// rewind: true,
		// Navigation arrows
		navigation: {
			nextEl: '.section-j-slider__next',
			prevEl: '.section-j-slider__prev',
		},
		breakpoints: {
			768: {
				slidesPerView: 4,
			},
			576: {
				slidesPerView: 2,
			},
			310: {
				slidesPerView: 1,
			}
		}
	});

	//! Master slider
	const masterSlider = new Swiper('.master-info-slider', {
		slidesPerView: 1,
		rewind: true,
		// Navigation arrows
		navigation: {
			nextEl: '.master-info-slider__next',
			prevEl: '.master-info-slider__prev',
		},
	});
});