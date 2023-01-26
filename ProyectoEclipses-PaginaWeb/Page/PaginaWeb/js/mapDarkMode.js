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

function darkMode() {
    document.body.classList.toggle('dark');
    document.getElementById('contenedor').classList.toggle('dark');
    document.querySelector('footer').classList.toggle('dark');
    document.querySelectorAll("footer i").forEach(elem => elem.classList.toggle('dark'));
  }