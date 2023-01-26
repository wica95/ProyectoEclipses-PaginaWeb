/*$(function () {
    $(document).scroll(function () {
      var $nav = $(".navbar");
      $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});*/

//default to dark mode
var mode = 'dark';
const toggleButton = document.getElementById('toggleMode');

$( document ).ready(function() {

  if (localStorage.getItem("mode")){
    //check if there's a saved state already
    mode = localStorage.getItem("mode");
  } else{
    //check if dark mode is preferred
    mode = "dark";
    localStorage.setItem("mode", mode);
  }

  if (mode === 'dark') {
    darkMode();
    toggleButton.innerHTML = '<i class="bi bi-brightness-high-fill"></i>';
  } else {
    toggleButton.innerHTML = '<i class="bi bi-moon-fill"></i>';
  }

});

toggleButton.onclick = function(){
  
  if (mode === 'dark') {
    mode = 'light';
    toggleButton.innerHTML = '<i class="bi bi-moon-fill"></i>';
  } else {
    mode = 'dark';
    toggleButton.innerHTML = '<i class="bi bi-brightness-high-fill"></i>';
  }

  console.log(mode);
  console.log(document.getElementById('contenedor').classList);
  darkMode();
  document.activeElement.blur();

  localStorage.setItem("mode", mode);
}

$(function () {
  function getEclipseDate(date) {
    var diferencia = date.getTime() - Date.now();
    return new Date(new Date().valueOf() + diferencia);
  }

  var eclipse23 = new Date(2023, 9, 14, 12, 9, 21); //Año, Mes, Dia, Hora, Min, Seg.
  var eclipse24 = new Date(2024, 3, 8, 13, 14, 10); //Año, Mes, Dia, Hora, Min, Seg.

  $('#clock-2023').countdown(getEclipseDate(eclipse23), function(event) {
  var $this = $(this).html(event.strftime(''
    + '<div class="box">'
    + '<span class="num">%D</span>'
    + '<span class="text">Dia%!d</span>'
    + '</div>'
    + '<div class="box">'
    + '<span class="num">%H</span>'
    + '<span class="text">Hora%!d</span>'
    + '</div>'
    + '<div class="box">'
    + '<span class="num">%M</span>'
    + '<span class="text">Minuto%!d</span>'
    + '</div>'
    + '<div class="box">'
    + '<span class="num">%S</span>'
    + '<span class="text">Segundo%!d</span>'
    + '</div>'));
  });

  $('#clock-2024').countdown(getEclipseDate(eclipse24), function(event) {
    var $this = $(this).html(event.strftime(''
    + '<div class="box">'
    + '<span class="num">%D</span>'
    + '<span class="text">Dia%!d</span>'
    + '</div>'
    + '<div class="box">'
    + '<span class="num">%H</span>'
    + '<span class="text">Hora%!d</span>'
    + '</div>'
    + '<div class="box">'
    + '<span class="num">%M</span>'
    + '<span class="text">Minuto%!d</span>'
    + '</div>'
    + '<div class="box">'
    + '<span class="num">%S</span>'
    + '<span class="text">Segundo%!d</span>'
    + '</div>'));
  });
});

function darkMode() {
  document.getElementById('contenedor').classList.toggle('dark');
  document.querySelector(".borde").classList.toggle('dark');
  document.querySelectorAll('.borde .card').forEach(elem => elem.classList.toggle('dark'));
  document.querySelector('footer').classList.toggle('dark');
  document.querySelectorAll("footer i").forEach(elem => elem.classList.toggle('dark'));
}