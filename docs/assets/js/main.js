if ($(window).width() > 700) {
  $("nav a").on("click", function () {
    var scrollAnchor = $(this).attr("data-scroll"),
      scrollPoint =
        $('section[data-anchor="' + scrollAnchor + '"]').offset().top - 28;

    $("body,html").animate(
      {
        scrollTop: scrollPoint,
      },
      500,
    );

    return false;
  });

  $(window)
    .scroll(function () {
      var windscroll = $(window).scrollTop();
      if (windscroll >= 400) {
        $("nav").addClass("sticky");

        $("section[data-anchor]").each(function (i) {
          if ($(this).position().top <= windscroll + 80) {
            $("nav a.header__nav__link--active").removeClass(
              "header__nav__link--active",
            );
            $("nav a").eq(i).addClass("header__nav__link--active");
          }
        });
      } else {
        $("nav").removeClass("sticky");
        $("nav a.header__nav__link--active").removeClass(
          "header__nav__link--active",
        );
      }
    })
    .scroll();
}

$(document).ready(function () {

  $("#nav-burger").click(function () {
    $("body").toggleClass("active-nav");

    $(this)
      .find(".burger-text")
      .text(function (i, text) {
        return text === "Meny" ? "Lukk" : "Meny";
      });
  });

  $(".header__nav__link").click(function () {
    $("body").removeClass("active-nav");
  });



  $(".runner-row").each(function (i) {
    var bc1Score, bc2Score, bc3Score, totalScore;
    var bc1Time, bc2Time, bc3Time, totalTime;

    bc1Time = $(this).find(".bc1").data("time");
    bc2Time = $(this).find(".bc2").data("time");
    bc3Time = $(this).find(".bc3").data("time");

    if (bc1Time) {
      bc1Score = moment.duration(bc1Time).asSeconds();
      var parcedBc1Score = parseInt(bc1Score * (1 / 60));
      $(this).find(".bc1").attr('data-sort', parcedBc1Score);
      $(this).find(".bc1").find('.points').html(parcedBc1Score);
    }else{
      bc1Score = moment.duration('2:30:00').asSeconds();
      var parcedBc1Score = parseInt(bc1Score * (1 / 60));
      $(this).find(".bc1").attr('data-sort', parcedBc1Score);
      $(this).find(".bc1").find('.points').html(parcedBc1Score);
      $(this).attr("data-complete", false);
    }

    if (bc2Time) {
      bc2Score = moment.duration(bc2Time).asSeconds() / 2;
      var parcedBc2Score = parseInt(bc2Score * (1 / 60));
      $(this).find(".bc2").attr('data-sort', parcedBc2Score);
      $(this).find(".bc2").find('.points').html(parcedBc2Score);
    }else{
      bc2Score = moment.duration('5:00:00').asSeconds() / 2;
      var parcedBc2Score = parseInt(bc2Score * (1 / 60));
      $(this).find(".bc2").attr('data-sort', parcedBc2Score);
      $(this).find(".bc2").find('.points').html(parcedBc2Score);
      $(this).attr("data-complete", false);
    }
    
    if (bc3Time) {
      bc3Score = moment.duration(bc3Time).asSeconds() / 4; 
      var parsedBc3Score = parseInt(bc3Score * (1 / 60));
      $(this).find(".bc3").attr('data-sort', parsedBc3Score);
      $(this).find(".bc3").find('.points').html(parsedBc3Score);
    }else{
      bc3Score = moment.duration('10:00:00').asSeconds() / 4; 
      var parsedBc3Score = parseInt(bc3Score * (1 / 60));
      $(this).find(".bc3").attr('data-sort', parsedBc3Score);
      $(this).find(".bc3").find('.points').html(parsedBc3Score);
      $(this).attr("data-complete", false);
    }
    

    if (bc1Score && bc2Score && bc3Score) {
      totalScore = parseInt((bc1Score + bc2Score + bc3Score) * (1 / 60));

      totalTime = moment.duration(bc1Time).asSeconds() + moment.duration(bc2Time).asSeconds() + moment.duration(bc3Time).asSeconds();

      var formattedTotalTime = moment.utc(totalTime*1000).format('HH:mm:ss');

      $(this).attr("data-score", totalScore);
      $(this).attr("data-sort", totalScore);

      $(this).find(".total").find('.points').html(totalScore);
      $(this).find(".total").find('.time').html(formattedTotalTime);

    }

  });

  $(".leaderboards__table").attr("data-manipulated", true);
  new Tablesort(document.getElementById("scoreboardTable"), {
    
  });


  //Tabell-switch
  var timeIsVisible = $('#scoreSwitch').is(':checked');

  function tableSwitch(checkedStatus){
    checkedStatus = timeIsVisible;
    $('body').attr('data-time', checkedStatus);
  }

  tableSwitch(timeIsVisible);

  $('#scoreSwitch').change(function () {
    timeIsVisible = $(this).is(':checked');
    tableSwitch(timeIsVisible);
  });


  
  //Manuell tids-kalkulator
  
  var end = '14:55:56';
  var start = '09:06:44';
 
  var ms = moment(end,"HH:mm:ss").diff(moment(start,"HH:mm:ss"));
  var d = moment.duration(ms);
  var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

  console.log(ms, d, s)
   

});
 