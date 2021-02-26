$(function() {

  //! DOM
  // Header
  const header = $('.header');
  const headerFixed = $('.header.fixed-for-menu');
  const topEmpty = $('.top-header-empty-line');
  const menu = $('#my-menu');
  const burgerBtn = $('.burger-btn');

  // Slider 
  const clientSlider2 = $('.client-slider-2');
  const projectsSlider = $('.projects-slider');
  const clientSlider = $('.client-slider');

  // Scroll
  const scrollToTop = $('.scroll-to-top-btn');
  const scrollToBottom = $('.scroll-to-bottom-btn');

  // Offer
  const openOfferBtn = $('.section-offers-item .line-btn__btn');

  //! Open offer 
  openOfferBtn.on('click', function () {
    $(this).toggleClass('opened');

    let offerText = $(this).closest('.section-offers-item').find('.section-offers-item__text');
    offerText.toggleClass('opened');

    if($(this).hasClass('opened')) {
      offerText.css({height: '100%'});
      var offerTextHeight = offerText.height();
      offerText.css({height: '80px'});
      
      offerText.animate({height: offerTextHeight});
    } else {
      offerText.animate({height: '80px'});
    }
    
  });

  $(window).on("scroll", function() {
    //! Fixed header
    if($(this).scrollTop() > 0) {
      headerFixed.addClass("fixed");

      setTimeout(() => {
        menu.css('top', '' + headerFixed.innerHeight() + 'px');
      }, 200);
    } else {
      headerFixed.removeClass("fixed");

      setTimeout(() => {
        menu.css('top', '' + headerFixed.innerHeight() + 'px');
      }, 200);
    }

    // Scroll to top
    if($(this).scrollTop() > 1000) {
      scrollToTop.fadeIn();
    } else {
      scrollToTop.fadeOut();
    }
  });

  //! Scroll to section
  scrollToBottom.on('click', function () {
    $("html, body").animate({ scrollTop: $('.section-offers').scrollTop() + $('.section-offers').height() }, 500);
        return false;
  });

  //! Scroll to top 
  scrollToTop.on('click', function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
        return false;
  });

  //! Slider
  clientSlider2.slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        }
      },
    ]
  });

  // Client
  clientSlider.slick({
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

  // Projects
  projectsSlider.slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: true,
    dots: true,
    appendArrows: '.section-projects__nav',
    appendDots: '.section-projects__nav',
    nextArrow: '<button type="button" class="slide-next"><i class="fas fa-angle-right"></i></button>',
    prevArrow: '<button type="button" class="slide-prev"><i class="fas fa-angle-left"></i></button>',
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  });

  //! Masonry
  // Team section grid
  $('.team-section-grid').masonry({
    itemSelector: '.team-section-grid-item',
  });

  // Projects grid
  $('.projects-grid').masonry({
    itemSelector: '.projects-grid-item',
    gutter: 20
  });

  //! Main menu 
	new Mmenu( "#my-menu", {   
    	// Extensions
        "extensions": [
          "border-none",
          "position-front",
          "position-right",
          "fullscreen",
       ],

       navbar: {
		      add: false,
       },

       "pageScroll": true,
    }, {
        // configuration
        classNames: {
          fixedElements: {
              fixed: "fixed-for-menu"
          }
        }
    });

    menu.css('top', '' + header.innerHeight() + 'px');

    burgerBtn.on('click', function (e) {
      e.stopPropagation();

      if (menu.hasClass('mm-menu_opened')) {
        burgerBtn.addClass('on');
        header.addClass('dark');
      } 
    });

    $(document.body).on('click', function () {
      if (menu.hasClass('mm-menu_opened')) {
        burgerBtn.removeClass('on');
        header.removeClass('dark');
      }
    });
    
    menu.on("click", function (e) {
      e.stopPropagation();
    });

    $(".mm-wrapper__blocker").on("touchstart", function() {
      burgerBtn.removeClass('on');
      header.removeClass('dark');
    });

    menu.find('li').on('click', function () {
      burgerBtn.removeClass('on');
      header.removeClass('dark');
    });
});
