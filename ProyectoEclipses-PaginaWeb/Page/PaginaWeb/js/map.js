$(document).ready()
{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const date = urlParams.get('date')

    // Create the script tag, set the appropriate attributes
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAgulauiazZfBmnhNavzKUhWweWdkFmF2Q&callback=initMap';
    script.async = true;
    
    // Append the 'script' element to 'head'
    document.head.appendChild(script);

    // Attach ññyour callback function to the `window` object
    window.initMap = function() 
    {
      // JS API is loaded and available
      map = new google.maps.Map(document.getElementById('map'), 
      {
        center: {lat: 25.7264, lng: -100.3119}, //Coordenadas de la UANL
        zoom: 5
      });

      infoWindow = new google.maps.InfoWindow();

      const locationButton = document.createElement("button");

      locationButton.textContent = "Pan to Current Location";
      locationButton.classList.add("custom-map-control-button");
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

      locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              infoWindow.setPosition(pos);
              infoWindow.setContent("Location found.");
              infoWindow.open(map);
              map.setCenter(pos);
            },
            () => {
              handleLocationError(true, infoWindow, map.getCenter());
            }
          );
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      });

      getEclipses(date);

      // const iconBase = "https://maps.google.com/mapfiles/kml/shapes/";
      // const icons = {
      //   parking: {
      //     name: "Parking",
      //     icon: iconBase + "parking_lot_maps.png",
      //   },
      //   library: {
      //     name: "Library",
      //     icon: iconBase + "library_maps.png",
      //   }
      // };
      const iconBase = 'assets/';
      const icons = {
        parking: {
          name: "Linea central de trayectoria",
          icon: iconBase + "amarillo.png",
        },
        library: {
          name: "Límites de totalidad del eclipse",
          icon: iconBase + "naranja.png",
        }
      };
      
      for (const key in icons) {
        const type = icons[key];
        const name = type.name;
        const icon = type.icon;
        const div = document.createElement("div");
    
        div.innerHTML = '<img src="' + icon + '"> ' + name;
        legend.appendChild(div);
      }

      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('legend'));
    };
    
}

let loadEclipseOptions = (combobox) =>
{
  // Read all .txt files under ./Files/
  var fs = require('fs');
  var files = fs.readdirSync('./FILES/');
  // Load all filenames into an select (combobox)
  files.forEach(e => {
    var opt = document.createElement("option");
    opt.value = e;
    opt.innerHTML = e;

    combobox.appendChild(opt);
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: El servicio de geolocación falló."
      : "Error: Tu navegador no soporta geolocación."
  );
  infoWindow.open(map);
}

function getEclipses(inputDate)
{
  $.ajax({
    url: `http://localhost/ProyectoEclipses/Page/PHP_Controller/GET_Eclipse.php?date=${inputDate}`,
    type: 'GET',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data, textStatus, jqXHR)
    {
        eclipses = data;
        // data.forEach(e => 
        // {
        //   let option = document.createElement("OPTION");
        //   let date = e.calendarDate.split("T")[0];
        //   date = `${date.split("-")[0]}/${date.split("-")[1]}/${date.split("-")[2]}`;
        //   option.innerHTML = `${date}`;
        //   option.value = e.calendarDate;
        //   $("#eclipse_selection").append(option);
        // });
        displayData(data);
    },
    error: function(jqXHR, textStatus, errorThrown)
    {
        console.log(`${textStatus}: ${errorThrown}`);
        return false;
    },
  });

  // eclipses[0] = JSON.parse(eclipses_JSON[0]);
  // displayData(0);
}

function displayData(inputData)
{
  if(inputData != null && inputData != "" && inputData != undefined)
  {
    let northernLimit = [];
    let southernLimit = [];
    let centralLimit = [];

    console.log(inputData);

    inputData.UTSample.forEach(j => 
    {
      northernLimit.push({lat: +j.northernLimitLat, lng : +j.northernLimitLng});
      southernLimit.push({lat : +j.southernLimitLat, lng : +j.southernLimitLng});
      centralLimit.push({lat : +j.centralLineLat, lng : +j.centralLineLng});
    }); 

    // Eclipse's trajectory
    // const Trajectory = 
    //     [{lat:-8.44617,lng:-158.33793},
    //     {lat:-5.79536,lng:-145.29199},
    //     {lat:-2.43890,lng:-136.04538},
    //     {lat:1.29560,lng:-128.83835},
    //     {lat:4.67932,lng:-123.86248},
    //     {lat:7.86051,lng:-119.80714},
    //     {lat:10.91364,lng:-116.46730},
    //     {lat:13.98147,lng:-113.50099},
    //     {lat:16.90386,lng:-110.66652},
    //     {lat:19.80233,lng:-108.07374},
    //     {lat:22.63027,lng:-105.36888},
    //     {lat:25.46084,lng:-102.67932},
    //     {lat:28.27290,lng:-99.81753},
    //     {lat:31.07332,lng:-96.70638},
    //     {lat:33.85664,lng:-93.22844},
    //     {lat:36.62029,lng:-89.22320},
    //     {lat:39.35103,lng:-84.47583},
    //     {lat:42.02263,lng:-78.65718},
    //     {lat:44.57697,lng:-71.20361},
    //     {lat:46.86823,lng:-60.96334},
    //     {lat:48.39849,lng:-44.27656},
    //     {lat:48.23507,lng:-33.38359},
    //     {lat:47.01207,lng:-20.10438},
    //     {lat:48.24111,lng:-19.52210},
    //     {lat:49.55626,lng:-32.71334},
    //     {lat:49.83128,lng:-42.03779},
    //     {lat:48.48806,lng:-60.49370},
    //     {lat:46.19394,lng:-71.43506},
    //     {lat:43.57638,lng:-79.32061},
    //     {lat:40.85157,lng:-85.39776},
    //     {lat:38.05387,lng:-90.33311},
    //     {lat:35.22681,lng:-94.46928},
    //     {lat:32.38182,lng:-98.04080},
    //     {lat:29.52633,lng:-101.21385},
    //     {lat:26.66049,lng:-104.12041},
    //     {lat:23.78297,lng:-106.85840},
    //     {lat:20.88738,lng:-109.52284},
    //     {lat:17.95680,lng:-112.20356},
    //     {lat:14.98380,lng:-115.00180},
    //     {lat:11.96061,lng:-118.01205},
    //     {lat:8.86196,lng:-121.42746},
    //     {lat:5.62108,lng:-125.43524},
    //     {lat:2.20656,lng:-130.55048},
    //     {lat:-1.60172,lng:-137.97256},
    //     {lat:-4.40850,lng:-145.76448},
    //     {lat:-7.20140,lng:-158.73859}
    // ];
    
    const eclipsePathN = new google.maps.Polyline({
      path: northernLimit,
      // path: Trajectory,
      geodesic: true,
      strokeColor: "#DB4409",
      strokeOpacity: 0.5,
      strokeWeight: 3,
    });
    const eclipsePathC = new google.maps.Polyline({
      path: centralLimit,
      // path: Trajectory,
      geodesic: true,
      strokeColor: "#E9A835",
      strokeOpacity: 0.5,
      strokeWeight: 3,
    });
    const eclipsePathS = new google.maps.Polyline({
      path: southernLimit,
      // path: Trajectory,
      geodesic: true,
      strokeColor: "#DB4409",
      strokeOpacity: 0.5,
      strokeWeight: 3,
    });

    eclipsePathN.setMap(map);
    eclipsePathC.setMap(map);
    eclipsePathS.setMap(map);
  }
}

