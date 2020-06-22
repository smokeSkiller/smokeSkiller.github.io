$(document).ready(function(){
  // Заменяю img с путём к svg, на тот же svg
  $('img.svg').each(function(){
    var $img = $(this);
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    $.get(imgURL, function(data) {
        var $svg = $(data).find('svg');
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        $img.replaceWith($svg);

    }, 'xml');

  });

  // Настройка option для смены языков
  $('.language__options').click(function () {
    $(this).find('.language__arrow').toggleClass('active');
    $(this).parent().toggleClass('active');
  });

  // $('.language__option').click(function () { 
  //   if($(this).index() != 0){
  //     const index = $(this).index()
  //     const option = $('.language__option').eq(index).find('.language__content').clone();
  //     const select = $('.language__option').eq(0).find('.language__content').clone();
  //     $('.language__option').eq(0).find('.language__content').replaceWith(option);
  //     $('.language__option').eq(index).find('.language__content').replaceWith(select);   
  //   }
  // });


  //  настройка якоря

  $('a.anchor').on('click', function(e){
    e.preventDefault();
    var id  = $(this).attr('href'),
    top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1000);
  });





  // Set the date we're counting down to
  let countDownDate = new Date("Sep 5, 2020 15:37:25").getTime();

  // Update the count down every 1 second
  let x = setInterval(function() {

      // Get todays date and time
      let now = new Date().getTime();
      
      // Find the distance between now an the count down date
      let distance = countDownDate - now;
      
      // Time calculations for days, hours, minutes and seconds
      var seconds = Math.floor((distance / 1000) % 60);
      var minutes = Math.floor((distance / 1000 / 60) % 60);
      var hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));

      let dayNum = String(days).split('');
      let dayHours = String(hours).split('');
      let dayMinutes = String(minutes).split('');
      let daySeconds = String(seconds).split('');

      // Output the result in an element with time

      // Проверки на наличие второй цыфры м звсена на ноль
      if(dayNum[1] === undefined){
        dayNum[1] = dayNum[0];
        dayNum[0] = 0
      }

      if(dayHours[1] === undefined){
        dayHours[1] = dayHours[0];
        dayHours[0] = 0
      }
      if(dayMinutes[1] === undefined){
        dayMinutes[1] = dayMinutes[0];
        dayMinutes[0] = 0
      }
      if(daySeconds[1] === undefined){
        daySeconds[1] = daySeconds[0];
        daySeconds[0] = 0
      }


      $('.time__item').eq(0).find('.time__num').eq(0).text(dayNum[0])
      $('.time__item').eq(0).find('.time__num').eq(1).text(dayNum[1])
      $('.time__item').eq(0).find('.time__month').eq(0).text("Дней")

      $('.time__item').eq(1).find('.time__num').eq(0).text(dayHours[0])
      $('.time__item').eq(1).find('.time__num').eq(1).text(dayHours[1])
      $('.time__item').eq(1).find('.time__month').eq(0).text("Часа")

      $('.time__item').eq(2).find('.time__num').eq(0).text(dayMinutes[0])
      $('.time__item').eq(2).find('.time__num').eq(1).text(dayMinutes[1])
      $('.time__item').eq(2).find('.time__month').eq(0).text("Минуты")

      $('.time__item').eq(3).find('.time__num').eq(0).text(daySeconds[0])
      $('.time__item').eq(3).find('.time__num').eq(1).text(daySeconds[1])
      $('.time__item').eq(3).find('.time__month').eq(0).text("Секунды")
      
      
      // document.getElementById("demo").innerHTML = days + "дней " + hours + "часов"
      // + minutes + "минуты" + seconds + "секунды";
      
      // If the count down is over, write some text 
      if (distance < 0) {
          clearInterval(x);
          document.getElementById("demo").innerHTML = "EXPIRED";
      }
  }, 1000);

  // настройка аккордеона
  $('.faq__item').click(function (e) { 
    $(this).toggleClass('active')
  });

  // Настройка табой у faq
  $('.faq__tab').click(function (e) { 
    $('.faq__tab').removeClass('active');
    $('.faq__tabContent').removeClass('active');
    $('.faq__item').removeClass('active');

    let index =  $(this).index()

    $(this).addClass('active');

    $('.faq__tabContent').eq(index).addClass('active');
  });

  // активация слайдера
  // активация слайдера
  $('.roadmap__list').slick({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: $('.roadmap__arrow_prev'),
    nextArrow: $('.roadmap__arrow_next'),
    responsive: [
      {
        breakpoint: 610,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
    ]
  });

  // моб меню
  $('.burger-btn').click(function () { 
    $(this).toggleClass('active');
    $('.header__menuAbs').toggleClass('active');
  });


  function BannerInner() {
    $('.bannersMore').addClass('active');
  }
  function Remove() {
    $('.banners').removeClass('active');
    $('.bannersMore').removeClass('active');
  }
  function Dots() {
    $('.banners').addClass('active');
    setTimeout(BannerInner, 1000);
  }
  setTimeout(Dots, 3000);

  // parallax
  $(window).scroll(function () { 
    let Scroll = $(this).scrollTop();
  
    $('.header__dots').css({
      'top' : -20 - Scroll/4 + 'px'
    }); 
  
  });
});