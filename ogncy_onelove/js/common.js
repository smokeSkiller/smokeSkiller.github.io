$(function() {

  //! DOM
  // Header
  const header = $('.header');
  const headerFixed = $('.header.fixed-for-menu')
  const menu = $('#my-menu');
  const burgerBtn = $('.burger-btn');
  // Slider 
  const projectsSlider = $('.projects-slider');
  const clientSlider = $('.client-slider')
  // Scroll
  const scrollToTop = $('.scroll-to-top-btn');

  $(window).on("scroll", function() {
    //! Fixed header
    if($(this).scrollTop() > $('.static-header').outerHeight()) {
      header.addClass("fixed");

      setTimeout(() => {
        menu.css('top', '' + header.innerHeight() + 'px');
      }, 200);
    } else {
      header.removeClass("fixed");

      setTimeout(() => {
        menu.css('top', '' + header.innerHeight() + 'px');
      }, 200);
    }

    // Scroll to top
    if($(this).scrollTop() > $('.services-section').scrollTop() + $('.services-section').outerHeight()) {
      scrollToTop.fadeIn();
    } else {
      scrollToTop.fadeOut();
    }
  });

  //! Scroll to top 
  scrollToTop.on('click', function () {
    $(window).scrollTop(0);
  });

  //! Slider
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
  $('.team-section-grid').masonry({
    itemSelector: '.team-section-grid-item',
  })

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

        setTimeout(() => {
          header.addClass('dark');
        }, 360);
      } 
      // else {
      //   header.removeClass('dark');
      //   burgerBtn.removeClass('on');
      // }
    });

    $(document.body).on('click', function () {
      if (menu.hasClass('mm-menu_opened')) {
        header.removeClass('dark');
        burgerBtn.removeClass('on');
      }
    });
    
    menu.on("click", function (e) {
      e.stopPropagation();
    });

    $(".mm-wrapper__blocker").on("touchstart", function() {
      burgerBtn.removeClass('on');
      header.removeClass('dark');
    });
});
