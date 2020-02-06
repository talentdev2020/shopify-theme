Shopify.theme.dropdownMenu = function () {

  const domElements = {
    $submenuInput: $('.has-submenu input')
  }

  domElements.$submenuInput.on('click', function () {
    if ($(this).hasClass('is-opened')) {
      let parentLink = $(this).closest('navbar-link').attr('href');
      window.location.href = parentLink;
    } else {
      $(this).addClass('is-opened');
    }
  })
}