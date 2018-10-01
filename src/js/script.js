
$(document).ready(function(){
  var canCounterStart = true;

    $('*[data-animate]').addClass('hide').each(function(){
        $(this).viewportChecker({
            classToAdd: 'show animated ' + $(this).data('animate'),
            classToRemove: 'hide',
            offset: 250
        });
    });

    var sections = [];
    var scrolled_id = false;
    var id = false;
    var $navbar = $('.nav');
    var $navbar__links = $navbar.find('.top-bar__nav__link');

    $navbar__links.each(function(){
        sections.push($($(this).attr('href')));
    });

    $navbar__links.click(function(e){
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 60
        });
    });
    $(window).on('scroll',   _.debounce(function() {
      if (isScrolledIntoView(document.getElementById('stats')) && canCounterStart) {
        $('.timer').countTo();

        canCounterStart = false;
      }
      var scrollTop = $(this).scrollTop() + ($(window).height() / 3);


      for(var i in sections){
          var section = sections[i];

          if(scrollTop > section.offset().top){
              scrolled_id = section.attr('id');
          }

          if(scrolled_id !== id){
              id = scrolled_id;

              $navbar__links.removeClass('top-bar__nav__link--current');

              $('a[href="#'+ id + '"]', $navbar).addClass('top-bar__nav__link--current');
          }
      }

      var scrollTop = $(window).scrollTop();
      var paralasicValue = $('.paralasic').attr('data-paralasic');

      $('.paralasic').css('background-position', 'center top -' + scrollTop * paralasicValue + 'px');
    },0));
});

function isScrolledIntoView(el) {
  var elemTop = el.getBoundingClientRect().top;
  var elemBottom = el.getBoundingClientRect().bottom;
  var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  return isVisible;
}
