(function ($) {
    "use strict";
	
	var $window = $(window); 
	var $body = $('body'); 

	// Search
	if( $( '.search-close-btn' ).length ){

		$( '.search-close-btn' ).on( 'click', function(){

			$( '.search__popup' ).removeClass( 'search-opened' );

			$( '.search-popup-overlay' ).removeClass( 'search-popup-overlay-open' );
		} );

		$('.search-popup-overlay').on('click', function () {
			$( '.search__popup' ).removeClass( 'search-opened' );

			$( '.search-popup-overlay' ).removeClass( 'search-popup-overlay-open' );
		});
	}

	/* Sticky Header */	
	if($('.active-sticky-header').length){
		$window.on('resize', function(){
			setHeaderHeight();
		});

		function setHeaderHeight(){
	 		$("header.active-sticky-header").css("height", $('header.active-sticky-header .header-sticky').outerHeight());
		}	
	
		$window.on("scroll", function() {
			var fromTop = $(window).scrollTop();
			setHeaderHeight();
			var headerHeight = $('header.active-sticky-header .header-sticky').outerHeight()
			$("header.active-sticky-header .header-sticky").toggleClass("hide", (fromTop > headerHeight + 100));
			$("header.active-sticky-header .header-sticky").toggleClass("active", (fromTop > 600));
		});
	}	

	//! Mobile menu js
	var $src    = $('#menu');
    var $target = $('[data-mobile-nav]');
    var $panel  = $('#mobilePanel');
    var $toggle = $('.mobile-toggle');
	const isMobile = $(window).width() <= 768

    if (!$src.length || !$target.length || !$panel.length || !$toggle.length) return;

	if(isMobile) {
		$panel.css('height', $(window).height() + 'px')
	}

    // 1. Клонируем меню и чистим классы шаблона
    var $clone = $src.clone();
    $clone.removeAttr('id class');
    $clone.find('*').removeAttr('class');
    $clone.addClass('m-list');

    // 2. Пункты с подменю: строка (ссылка + стрелка) и аккордеон
    $clone.find('li').each(function () {
        var $li   = $(this);
        var $link = $li.children('a');
        var $sub  = $li.children('ul');

        if (!$link.length || !$sub.length) return;

        $li.addClass('has-sub');

        var $row = $('<div class="m-row"></div>');
        $link.before($row);
        $row.append($link);

        var $btn = $(
            '<button type="button" class="m-arrow" aria-label="Раскрыть подменю" aria-expanded="false">' +
                '<svg width="16" height="16" viewBox="0 0 12 12" fill="none">' +
                    '<path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
                '</svg>' +
            '</button>'
        );
        $row.append($btn);

        // обёртка для плавной анимации высоты
        $sub.wrap('<div class="m-sub"></div>');

        $btn.on('click', function () {
            var open = !$li.hasClass('is-open');
            $li.toggleClass('is-open', open);
            $btn.attr('aria-expanded', open);
        });
    });

    $target.append($clone);

    // 3. Открытие / закрытие
    function setOpen(state) {
        $body.toggleClass('mobile-menu-open', state);
        $toggle.attr('aria-expanded', state);
        $panel.attr('aria-hidden', !state);
    }

    $toggle.on('click', function () {
        setOpen(!$body.hasClass('mobile-menu-open'));
    });

    $('[data-mobile-close]').on('click', function () {
        setOpen(false);
    });

    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') setOpen(false);
    });

    $(window).on('resize', function () {
        if (window.innerWidth >= 992) setOpen(false);
    });

    // Закрываем меню при переходе по обычной ссылке (не по «#»)
    $clone.on('click', 'a', function () {
        if ($(this).attr('href') !== '#') setOpen(false);
    });
	
	/* Slick Menu JS */
	// $('#menu').slicknav({
	// 	label : '',
	// 	prependTo : '.responsive-menu'
	// });

	if($("a[href='#top']").length){
		$(document).on("click", "a[href='#top']", function() {
			$("html, body").animate({ scrollTop: 0 }, "slow");
			return false;
		});
	}

	/* Interactive Process Layout Start */
	var element = $('.interactive');
    if (element.hasClass('interactive-process-layout')) {                
		var items = element.find('.interactive-inner-process');
		if (items.length) {
			items.on({
				mouseenter: function() {
					var index = $(this).data('index'),
						targetImg = element.find(`.interactive-process-image.img-${index}`);
		
					if($(this).hasClass('activate')) return;

					items.removeClass('activate');
					$(this).addClass('activate');

					element.find('.interactive-process-image').removeClass('show');
					targetImg.addClass('show');
				},
				mouseleave: function() {
					//stuff to do on mouse leave
				}
			});
		}                 
	}

	/* Service Slider JS */
	if ($('.service-slider').length) {
		const service_slider = new Swiper('.service-slider .swiper', {
			slidesPerView : 1,
			speed: 1500,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: '.service-pagination',
				clickable: true,
			},
			breakpoints: {
				768:{
					slidesPerView: 2,
				},
				1300:{
					slidesPerView: 3,
				}
			}
		});
	}

	/* Youtube Background Video JS */
	if ($('#herovideo').length) {
		var myPlayer = $("#herovideo").YTPlayer();
	}

	/* Image Reveal Animation */
	if ($('.reveal').length) {
        gsap.registerPlugin(ScrollTrigger);
        let revealContainers = document.querySelectorAll(".reveal");
        revealContainers.forEach((container) => {
            let image = container.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    toggleActions: "play none none none"
                }
            });
            tl.set(container, {
                autoAlpha: 1
            });
            tl.from(container, 1, {
                xPercent: -100,
                ease: Power2.out
            });
            tl.from(image, 1, {
                xPercent: 100,
                scale: 1,
                delay: -1,
                ease: Power2.out
            });
        });
    }

	/* Text Effect Animation */
	function initHeadingAnimation() {
		
		if($('.text-effect').length) {
			var textheading = $(".text-effect");

			if(textheading.length === 0) return; gsap.registerPlugin(SplitText); textheading.each(function(index, el) {
				
				el.split = new SplitText(el, { 
					type: "lines,words,chars",
					linesClass: "split-line"
				});
				
				if( $(el).hasClass('text-effect') ){
					gsap.set(el.split.chars, {
						opacity: .3,
						x: "-7",
					});
				}
				el.anim = gsap.to(el.split.chars, {
					scrollTrigger: {
						trigger: el,
						start: "top 92%",
						end: "top 60%",
						markers: false,
						scrub: 1,
					},

					x: "0",
					y: "0",
					opacity: 1,
					duration: .7,
					stagger: 0.2,
				});
				
			});
		}
		
		if ($('.text-anime-style-1').length) {
			let staggerAmount 	= 0.05,
				translateXValue = 0,
				delayValue 		= 0.5,
			   animatedTextElements = document.querySelectorAll('.text-anime-style-1');
			
			animatedTextElements.forEach((element) => {
				let animationSplitText = new SplitText(element, { type: "chars, words" });
					gsap.from(animationSplitText.words, {
					duration: 1,
					delay: delayValue,
					x: 20,
					autoAlpha: 0,
					stagger: staggerAmount,
					scrollTrigger: { trigger: element, start: "top 85%" },
					});
			});		
		}
		
		if ($('.text-anime-style-2').length) {				
			let	 staggerAmount 		= 0.03,
				 translateXValue	= 20,
				 delayValue 		= 0.1,
				 easeType 			= "power2.out",
				 animatedTextElements = document.querySelectorAll('.text-anime-style-2');
			
			animatedTextElements.forEach((element) => {
				let animationSplitText = new SplitText(element, { type: "chars, words" });
					gsap.from(animationSplitText.chars, {
						duration: 1,
						delay: delayValue,
						x: translateXValue,
						autoAlpha: 0,
						stagger: staggerAmount,
						ease: easeType,
						scrollTrigger: { trigger: element, start: "top 85%"},
					});
			});		
		}
		
		if ($('.text-anime-style-3').length) {		
			let	animatedTextElements = document.querySelectorAll('.text-anime-style-3');
			
			 animatedTextElements.forEach((element) => {
				//Reset if needed
				if (element.animation) {
					element.animation.progress(1).kill();
					element.split.revert();
				}

				element.split = new SplitText(element, {
					type: "lines,words,chars",
					linesClass: "split-line",
				});
				gsap.set(element, { perspective: 400 });

				gsap.set(element.split.chars, {
					opacity: 0,
					x: "50",
				});

				element.animation = gsap.to(element.split.chars, {
					scrollTrigger: { trigger: element,	start: "top 90%" },
					x: "0",
					y: "0",
					rotateX: "0",
					opacity: 1,
					duration: 1,
					ease: Back.easeOut,
					stagger: 0.02,
				});
			});		
		}
	}
	
	if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            initHeadingAnimation();
        });
    } else {
        window.addEventListener("load", initHeadingAnimation);
    }

	/* Parallaxie js */
	var $parallaxie = $('.parallaxie');
	if($parallaxie.length && ($window.width() > 1024))
	{
		if ($window.width() > 768) {
			$parallaxie.parallaxie({
				speed: 0.55,
				offset: 0,
			});
		}
	}

	/* Zoom Gallery screenshot */
	$('.gallery-items').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom',
		image: {
			verticalFit: true,
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
			  	return element.find('img');
			}
		}
	});

	/* Animated Wow Js */	
	new WOW().init();

	/* Popup Video */
	if ($('.popup-video').length) {
		$('.popup-video').magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: true
		});
	}

	/* What We Item List */
	var $what_we_item_list = $('.what-we-item-list');
	if ($what_we_item_list.length) {
		var $what_we_item = $what_we_item_list.find('.what-we-item');

		if ($what_we_item.length) {
			$what_we_item.on({
				mouseenter: function () {
					if (!$(this).hasClass('active')) {
						$what_we_item.removeClass('active'); 
						$(this).addClass('active'); 
					}
				},
				mouseleave: function () {
					// Optional: Add logic for mouse leave if needed
				}
			});
		}
	}

	//! Search
	if( $( '.search-open-btn' ).length ){

		$( '.search-open-btn' ).on( 'click', function(e){
			e.stopPropagation();

			$( '.search__popup' ).addClass( 'search-opened' );

			$( '.search-popup-overlay' ).addClass( 'search-popup-overlay-open' );

		} );
	}

	//! Our blog slider
	if( $( '.our-blog-slider' ).length ){
		const service_slider = new Swiper('.our-blog-slider', {
			speed: 600,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: '.our-blog-slider-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.our-blog-slider-next',
				prevEl: '.our-blog-slider-prev',
			},
			breakpoints: {
				512:{
					slidesPerView: 1,
				},
				768:{
					slidesPerView: 2,
				},
				1300:{
					slidesPerView: 3,
				}
			}
		});
	}

	//! Gallery slider
	if($( '.post-gallery' ).length) {
		const post_gallery = new Swiper('.post-gallery', {
			speed: 600,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: '.post-gallery-pagination',
				clickable: true,
			},
			// navigation: {
			// 	nextEl: '.our-blog-slider-next',
			// 	prevEl: '.our-blog-slider-prev',
			// },
			breakpoints: {
				512:{
					slidesPerView: 1,
				},
				768:{
					slidesPerView: 2,
				},
				1300:{
					slidesPerView: 3,
				}
			}
		});

		// Magnific popup
		$('.post-gallery .swiper-wrapper').magnificPopup({
			delegate: '.swiper-slide:not(.swiper-slide-duplicate) a',
			type: 'image',
			gallery: {
				enabled: true
			}
		});

		var $items = $('.post-gallery .swiper-slide:not(.swiper-slide-duplicate) a');

		var items = $items.map(function () {
			return { src: $(this).attr('href'), type: 'image' };
		}).get();

		$('.post-gallery').on('click', 'a', function (e) {
			e.preventDefault();

			var index = $items.index(
				$items.filter('[href="' + $(this).attr('href') + '"]')
			);

			$.magnificPopup.open({
				items: items,
				type: 'image',
				gallery: { enabled: true },
				mainClass: 'mfp-fade',
				removalDelay: 300
			}, index);
		});
	}

	//! Scroll top
	if($('.scroll-top').length) {
		const scrollTop = $('.scroll-top');

		$(window).on('scroll', function() {
			if($(this).scrollTop() > 500) {
				scrollTop.show()
			} else {
				scrollTop.hide()
			}

			if(isMobile) {
				const scrollBottom = $(this).scrollTop() + $(window).height()
				const dpBarTab = $('.dp-bar-tab')

				if(scrollBottom >= $('.main-footer').offset().top + ($('.main-footer').height() / 3)) {
					scrollTop.addClass('ended')
					dpBarTab.addClass('ended')
				} else {
					scrollTop.removeClass('ended')
					dpBarTab.removeClass('ended')
				}
			}
		})

		scrollTop.on('click', function() {
			$("html, body").animate({ scrollTop: 0 }, "slow");
		});
	}

	//! For all forms
	// Name
	if($('input[name="name"]').length) {
		$('input[name="name"]').on('input', function () {
			var value = $(this).val();
			// Оставляем только кириллицу, латиницу, пробелы и дефисы
			value = value.replace(/[^а-яА-ЯёЁa-zA-Z\s\-]/g, '');
			$(this).val(value); // Устанавливаем отфильтрованное значение обратно в поле    
		});
	}

	// Email
	if($('input[name="email"]').length) {
		$('input[name="email"]').on('input', function() {
			var value = $(this).val();
			// Удаляем кириллицу и всё, что не входит в валидный формат email
			value = value.replace(/[а-яА-ЯёЁ]/g, '');
			$(this).val(value);
		});
	}

	// Phone
	if($('input[name="phone"]').length) {
		$('input[name="phone"]').mask('+7 (999) 999-99-99');
	}

	// Policy accepting
	if($('.term-checkbox').length) {
		// Disable submit button if privacy checkbox is not checked
		let disableSubmit = true;
		const privacyCheckbox = $('.term-checkbox input');

		privacyCheckbox.on('change', function () {
			const $submit = $('button[type="submit"]');

			const allChecked = privacyCheckbox.filter(':checked').length === privacyCheckbox.length;

			$submit.prop('disabled', !allChecked);
		});
	}

	//! Memorial
	if($('.memorial-form').length) {
		// Notes
		var memorialNotesBtn = $('.memorial-notes .add-btn');
		var memorialRedImg = $('.memorial-notes img').attr('red-src');
		var memorialDarkImg = $('.memorial-notes img').attr('dark-src');
		// Fields
		var name = $('input[name="name"]');
		var email = $('input[name="email"]');
		var serviceType = $('input[name="service"]');
		var memorialDuration = $('input[name="memorial_duration"]');

		//* Change color of notes
		serviceType.on('change', function () {
			if($(this).val() == 'О упокоении') {
				$('.memorial-notes').addClass('dark');
				$('.memorial-notes img').attr('src', memorialDarkImg);
			} else {
				$('.memorial-notes').removeClass('dark');
				$('.memorial-notes img').attr('src', memorialRedImg);
			}
		});

		//* Add new note
		memorialNotesBtn.on('click', function (e) {
			$('.memorial-notes ol').append('<li><input type="text" name="memorial_names[]"></li>');
		});

		$('input[name="memorial_names[]"]').on('input', function() {
			let value = $(this).val();
			// Оставляем только кириллицу, латиницу, пробелы и дефисы
			value = value.replace(/[^а-яА-ЯёЁa-zA-Z\s\-]/g, '');
			$(this).val(value);

			calculateAmount(); // Recalculate amount
		});

		// Memorial duration
		$('input[name="memorial_duration"]').on('change', function () {
			calculateAmount();
		});

		function calculateAmount() {
			var price = $('input[name="memorial_duration"]:checked').data('price');
			var list = [];

			$('input[name="memorial_names[]"]').each(function () {
				if ($(this).val() !== '') {
					list.push($(this).val());
				}
			})

			$('.memorial-form-amount').val(price * list.length);
		}

		//* Submit
		// $('.memorial-form').on('submit', function (e) {
		//     e.preventDefault();

		//     var errorField = $('.contact-form-error');
		//     var contactFormSpinner = $('.contact-form-spinner');
		//     var memorial_names = [];
		//     var form = $(this);

		//     errorField.html('');

		//     $('input[name="memorial_names[]"]').each(function () {
		//         if ($(this).val() !== '') {
		//             memorial_names.push($(this).val());
		//         }
		//     });

		//     if(name.val() == '' || email.val() == '' || memorialDuration.is(':checked') == false
		//     || serviceType.is(':checked') == false) {
		//         errorField.html('Заполните все поля');
		//         return;
		//     }

		//     if (email.val().trim().length < 5) {
		//         errorField.html('Email слишком короткий');
		//         return;
		//     }
			
		//     if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.val().trim())) {
		//         errorField.html('Некорректный формат email');
		//         return;
		//     }

		//     contactFormSpinner.removeClass('d-none');

		//     $.ajax({
		//         url: '/wp-admin/admin-ajax.php',
		//         type: 'POST',
		//         data: {
		//             action: 'pay_memorial',
		//             name: name.val(),
		//             email: email.val(),
		//             serviceType: form.find('input[name="service"]:checked').val(),
		//             memorialDuration: form.find('input[name="memorial_duration"]:checked').val(),
		//             memorial_names: memorial_names,
		//             price: form.find('input[name="memorial_duration"]:checked').data('price'),
		//             amount: $('.memorial-form-amount').val(),
		//             website: form.find('input[name="website"]').val(),
		//             form_start_time: form.find('input[name="form_start_time"]').val(),
		//         },
		//         success: function(response) {
		//             if (response.success) {
		//                 window.location.href = response.data.payment_url;
		//                 contactFormSpinner.addClass('d-none');
		//                 errorField.html('');

		//                 form[0].reset();
		//             } else {
		//                 errorField.html(response.data);
		//             }
		//         },
		//         error: function() {
		//             errorField.html('Ошибка! Нет соединения с сервером!');
		//         }
		//     });
		// });
	}

	//! Donate form
	if($('#donateForm').length) {
		
	}

	//! Donation panel
	if($('.dp-cards').length) {
		var PREFIX = 'dp_closed_';
		var TTL = {                       // на сколько запоминать закрытие (в часах)
			memorial: 24 * 7,
			donate:   24,
			bar:      24
		};
		
		function save(key) {
			try { localStorage.setItem(PREFIX + key, String(Date.now())); } catch (e) {}
		}
		function remove(key) {
			try { localStorage.removeItem(PREFIX + key); } catch (e) {}
		}
		function isClosed(key) {
			try {
				var t = parseInt(localStorage.getItem(PREFIX + key), 10);
				if (!t) return false;
				if (Date.now() - t > (TTL[key] || 24) * 3600 * 1000) {
					remove(key);
					return false;
				}
				return true;
			} catch (e) { return false; }
		}
		
		/* ---------- Карточки на ПК ---------- */
		$('.dp-item').each(function () {
			var $item = $(this);
			var key = $item.data('dp-key');
		
			if (isClosed(key)) $item.addClass('is-closed');
		
			$item.find('.dp-close').on('click', function () {
				$item.addClass('is-closed');
				save(key);
			});
		
			$item.find('.dp-tab').on('click', function () {
				$item.removeClass('is-closed');
				remove(key);
			});
		});
		
		/* ---------- Нижняя панель (планшеты и телефоны) ---------- */
		var $body = $('body');
		
		if (isClosed('bar')) $body.addClass('dp-bar-closed');
		
		$('.dp-bar__close').on('click', function () {
			$body.addClass('dp-bar-closed');
			save('bar');
		});
		
		$('.dp-bar-tab').on('click', function () {
			$body.removeClass('dp-bar-closed');
			remove('bar');
		});
	}

	//! Ministry cards
	if($('.ministries-item').length && !isMobile) {
		const ministryItem = $('.ministries-item');

		ministryItem.hover(
			function() {
				// Код при наведении мыши (туда)
				$(this).find('p').slideDown()
			}, 
			function() {
				// Код при уходе мыши (обратно)
				$(this).find('p').slideUp()
			}
		);
	}

	//! Text clamp
	if($('.text-clamp').length) {
		$('.text-clamp').each(function () {
			var $p = $(this);

			// Если текст помещается в 3 строки, раскрытие не нужно
			if (this.scrollHeight <= this.clientHeight) {
				$p.css('cursor', 'default').removeAttr('role tabindex title');
				return;
			}

			function toggle() {
				var open = $p.toggleClass('is-open').hasClass('is-open');
				$p.attr('aria-expanded', open);
			}

			$p.on('click', toggle);

			$p.on('keydown', function (e) {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					toggle();
				}
			});
		});
	}

	if($('.google-map-iframe')) {
		$('.google-map-iframe').on('click', function() {
			$(this).addClass('active')
		})
	}

	/**
	 *  Found Class ?
	 *  -------------
	 */
	
	
})(jQuery);