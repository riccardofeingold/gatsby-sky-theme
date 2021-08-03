//jshint esversion:6

// Search bar opening and closing
var focusToggler = true;

document.querySelector('.search-button').addEventListener('click', (event) => {
  
})

$('.search-button').click(function(){
  $(this).parent().toggleClass('open');

  // clears search input
  $('.search-box').val('');

  // puts and removes cursor
  if (focusToggler) {
    $('.search-box').focus();
  } else {
    $('.search-box').blur();
  }
  focusToggler = ! focusToggler;
});
