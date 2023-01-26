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
  $(document).scroll(function () {
    var $nav = $(".navbar");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
});

fetch('./assets/data/Noticias.json').then(function(resp) {
  return resp.json();
})
.then(function(data){
  
  //Primer Noticia que aparece en index
  var x = 0;
  document.getElementById('titulo1-noticia').innerHTML = data[x].titulo;
  document.getElementById('texto1-noticia').innerHTML = data[x].subtitulo;
  document.getElementById("img1").src=data[x].imagen;

  var y = 4;
  //Segunda Noticia que aparece en index
  document.getElementById('titulo2-noticia').innerHTML = data[y].titulo;
  document.getElementById('texto2-noticia').innerHTML = data[y].subtitulo;
  document.getElementById("img2").src=data[y].imagen;
});

function navbarColor(){
  var $nav = $(".navbar");
  console.log($nav.css('background-color'));
  if($nav.css('background-color') == "rgb(0, 0, 0)") {
    setTimeout(function(){
      $nav.css('background-color', "rgba(0, 0, 0, 0)");
    }, 300);
    
  } else {
    $nav.css('background-color', "rgb(0, 0, 0)");
  }
}

function darkMode() {
  document.getElementById('contenedor').classList.toggle('dark');
  document.querySelectorAll(".noticias-recientes .card").forEach(elem => elem.classList.toggle('dark'));
  document.querySelector('.nosotros .card').classList.toggle('dark');
  document.querySelector('footer').classList.toggle('dark');
  document.querySelectorAll("footer i").forEach(elem => elem.classList.toggle('dark'));
}