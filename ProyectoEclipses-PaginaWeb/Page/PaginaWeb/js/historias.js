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

fetch("./assets/data/historias.json").then(function(resp) {
    return resp.json();
})
.then(function(data){
    for (const i in data){
        var x = "titulo-noticia-" + i;
        var y = "subtitulo-noticia-" + i;
        var z = "img" + i;
        document.getElementById(x).innerHTML = data[i].titulo;
        document.getElementById(y).innerHTML = data[i].subtitulo;
        document.getElementById(z).src=data[i].imagen;
    }
});

function darkMode() {
    document.body.classList.toggle('dark');
    document.getElementById('contenedor').classList.toggle('dark');
    document.querySelectorAll(".Nuestra-Conexión .card").forEach(elem => elem.classList.toggle('dark'));
    document.querySelectorAll(".Nuestra-Conexión .titulo").forEach(elem => elem.classList.toggle('dark'));
    document.querySelector('footer').classList.toggle('dark');
    document.querySelectorAll("footer i").forEach(elem => elem.classList.toggle('dark'));
    document.getElementById('color-titulo').classList.toggle('dark');
}

/* RECORTAR TEXTO DE NOTICIA
function truncateText(selector, maxLength) {
    var element = document.querySelector(selector),
        truncated = element.innerText;

    if (truncated.length > maxLength) {
        truncated = truncated.substr(0,maxLength) + '...';
    }
    return truncated;
}
//You can then call the function with something like what i have below.
document.querySelector('p.card-text').innerText = truncateText('p.card-text', 107);
*/