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

    var bc1Time, bc2Time, bc3Time;

    bc1Time = $(this).find(".bc1-time").data("time");
    bc2Time = $(this).find(".bc2-time").data("time");
    bc3Time = $(this).find(".bc3-time").data("time");

    if (bc1Time) {
      bc1Score = moment.duration(bc1Time).asSeconds();
      $(this) 
        .find(".bc1-time")
        .text(parseInt(bc1Score * (1 / 60)));
    }
    if (bc2Time) {
      bc2Score = moment.duration(bc2Time).asSeconds() / 2;
      $(this)
        .find(".bc2-time")
        .text(parseInt(bc2Score * (1 / 60)));
    }
    if (bc3Time) {
      bc3Score = moment.duration(bc3Time).asSeconds() / 4;
      $(this)
        .find(".bc3-time")
        .text(parseInt(bc3Score * (1 / 60)));
    }

    if (bc1Score && bc2Score && bc3Score) {
      totalScore = parseInt((bc1Score + bc2Score + bc3Score) * (1 / 60));
      $(this).addClass("complete");
      $(this).find(".score").text(totalScore);
      $(this).attr("data-score", totalScore);
      $(this).attr("data-sort", totalScore);
    }
  });

  $(".leaderboards__table").attr("data-manipulated", true);
  new Tablesort(document.getElementById("scoreboardTable"));
});
