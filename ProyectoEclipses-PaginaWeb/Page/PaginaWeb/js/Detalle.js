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

obtenerJson = fetch('./assets/data/Noticias.json').then(function(resp) {
    return resp.json();
})
.then(function(data){ 
    
    //sacamos los valores enviados
    const valores = window.location.search;

    //Creamos la instancia
    const urlParams = new URLSearchParams(valores);

    //conseguimos los valores
    const keys = urlParams.keys();
    const values = urlParams.values();
    const entries = urlParams.entries();

    //la variable valor va a tomar el numero que recibimos
    var valor;
    for (const value of values) valor=value;

    //convertimos valor en i (por mera costumbre)
    i = parseInt(valor);
    document.getElementById('detalle-titulo').innerHTML = data[i].titulo; 
    document.getElementById('detalle-subtitulo').innerHTML = data[i].subtitulo;
    document.getElementById('detalle-fecha').innerHTML = data[i].fecha;
    document.getElementById('detalle-periodista').innerHTML = "Por: " + data[i].periodista;
    document.getElementById('detalle-img').src=data[i].imagen;
    try { //Valida si se agrega más de una imagen
      document.getElementById('detalle-img2').src=data[i].imagen2;
    } catch (error) {
      console.error(error);
      // Expected output: ReferenceError: nonExistentFunction is not defined
      // (Note: the exact output may be browse  r-dependent)
    }
    document.getElementById('detalle-imgb').src=data[i].imagenb;

    //creamos un ciclo para recorrer el arreglo de párrafos e insertarlos de manera dinamica en las etiquetas <p></p>
    for (j in data[i].parrafos){
        //insertar los parrafos en los <p></p> con id 'pX' donde x es un valor de 0 al 20
        id = "p" + j;
        // document.getElementById(id).innerHTML += "<p>" + data[i].parrafos[j]; + "</p>";
        document.getElementById(id).innerHTML = data[i].parrafos[j];

    }

});

function darkMode() {
    document.getElementById('contenedor').classList.toggle('dark');
    document.querySelectorAll(".noticias-recientes .card").forEach(elem => elem.classList.toggle('dark'));
    document.querySelector('footer').classList.toggle('dark');
    document.querySelectorAll("footer i").forEach(elem => elem.classList.toggle('dark'));
}
    // Mostramos la información dependiendo del id en el html
    // document.getElementById('titulo-noticia').innerHTML = data.PM1.titulo;
    // document.getElementById('subtitulo-noticia').innerHTML = data.PM1.subtitulo;
    // document.getElementById('fecha-noticia').innerHTML = data.PM1.fecha;
    // document.getElementById('periodista-noticia').innerHTML = data.PM1.periodista;
    // document.getElementById('p1').innerHTML = data.PM1.parrafos[0];
    // document.getElementById('p2').innerHTML = data.PM1.parrafos[1]; 
    // document.getElementById('p3').innerHTML = data.PM1.parrafos[2]; 
    // document.getElementById('p4').innerHTML = data.PM1.parrafos[3]; 
    // document.getElementById('p5').innerHTML = data.PM1.parrafos[4]; 
    // document.getElementById('p6').innerHTML = data.PM1.parrafos[5]; 
    // document.getElementById('p7').innerHTML = data.PM1.parrafos[6]; 
    // document.getElementById('p8').innerHTML = data.PM1.parrafos[7]; 
    // document.getElementById('p9').innerHTML = data.PM1.parrafos[8]; 
    // document.getElementById('p10').innerHTML = data.PM1.parrafos[9]; 
    // document.getElementById('p11').innerHTML = data.PM1.parrafos[10]; 
    // document.getElementById('p12').innerHTML = data.PM1.parrafos[11]; 
    // document.getElementById('p13').innerHTML = data.PM1.parrafos[12]; 
    // document.getElementById('p14').innerHTML = data.PM1.parrafos[13]; 
    // document.getElementById('p15').innerHTML = data.PM1.parrafos[14]; 
    // document.getElementById('p16').innerHTML = data.PM1.parrafos[15]; 
    // document.getElementById('p17').innerHTML = data.PM1.parrafos[16]; 
    // document.getElementById('p18').innerHTML = data.PM1.parrafos[17]; 