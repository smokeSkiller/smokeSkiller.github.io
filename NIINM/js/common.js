//! MMenu
$( document ).ready(() => {
    new Mmenu( "#my-menu", {
    	// Extensions
        "extensions": [
          "border-none",
          "pagedim-black",
          "position-right",
       ],

       navbar: {
       	title: "Меню",
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

    // Close btn
    $("header .burger-btn").on("click", function () {
      $(this).addClass("on");
    });

    $(".mm-wrapper__blocker").on("touchstart", function() {
      closeMenuBtn();
    });

    $(".mm-wrapper__blocker").on("click", function() {
      closeMenuBtn();
    });

    function closeMenuBtn() {
      $("header .burger-btn").removeClass("on");
    }

    // Adding arrow icons
    $('.mm-listitem__btn span').remove(); // Remove span
    
  	$('.mm-btn_prev').append('<i class="fas fa-arrow-left"></i>');
  	$('.mm-btn_next').append('<i class="fas fa-arrow-right"></i>');
});

//! DOM
// Header
const header = $("header.fixed-for-menu");

// Start banner
const startBanner = $(".start-banner");

// News
const newsContent = $(".news-content"); 
const newsItem = $(".news-item");

//! Fixed header
$(window).on("scroll", function() {
  if($(this).scrollTop() > header.outerHeight()) {
    header.addClass("fixed");
  } else {
    header.removeClass("fixed");
  }
});

//! Setting height to start banner
startBanner.css('height', 'calc(100vh - ' + header.height() + 'px)');

// Responsive support for news
if ($(window).width() < 1483) {
  newsItem.width(newsContent.width() / 2.1);
} 

if ($(window).width() < 992) {
  newsItem.width(newsContent.width());
}

//! News scrolling
$('.news-content').sly({
  slidee: $('.news-items'),

  // Item based navigation
  horizontal: true,
  itemNav: 'basic',
  smart: true,

  // Mouse
  scrollSource: $(".news-content"),  // Element for catching the mouse wheel scrolling. Default is FRAME.
  scrollBy: 1,
  scrollTrap: true,

  // Dragging
  mouseDragging: true,
  // touchDragging: true,

  // Scrollbar
  scrollBar: $('.scrollbar'),
  dragHandle: true,
  clickBar: true,
  // dynamicHandle: true,

  // Navigation buttons
  prevPage: $(".prev-slide"),
  nextPage: $(".next-slide"),

  // Mixed options
  speed: 500,
});

if ($(window).width() < 1400) {
  newsItem.width(newsContent.width() / 2.1 - 1);
} 

if ($(window).width() < 992) {
  newsItem.width(newsContent.width() - 0.19);
}