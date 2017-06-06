$(document).ready(cargarPagina);
// HOISTING
function cargarPagina() {
  obtenerUbicacionActual();
  $(".rest").click(cambiarUbicacion);
  $("#search-form").submit(filtrarResultados);
  

};

function obtenerUbicacionActual() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(mostrarPosicionActual);
  } else {
    alert("Geolocalización no es soportado en tu navegador");
  }
};

function mostrarPosicionActual(posicion) {
  var latitud = posicion.coords.latitude;
  var longitud = posicion.coords.longitude;

  var coordenadas = {
    lat: latitud,
    lng: longitud
  }

  mostrarMapa(coordenadas);
};

// @coordenadas: { lat: <number>, lng: <number> }
function mostrarMapa(coordenadas) {
  var map = new google.maps.Map($('#map')[0], {
    zoom: 15,
    center: coordenadas
  });
  var marker = new google.maps.Marker({
    position: coordenadas,
    map: map
  });
}

function cambiarUbicacion(e) {
   e.preventDefault();
  var latitud = $(this).data("latitud");
  var longitud = $(this).data("longitud");

  var coordenadas = {
    lat: latitud,
    lng: longitud
  }

  console.log(coordenadas);
  mostrarMapa(coordenadas);
}


var restaurantes = [
	{
		"nombre": "La Taberna del leon",
		"numero": "01 (55) 5616-2110",
		"direccion": "Altamirano No. 46 Local 173, Ciudad de México",
		"lat":19.3390229,
		"lng":-99.1954311
	},
	{
		"nombre": "Máximo Bistro",
		"numero": "01 (55) 5264-4291",
		"direccion": "Tonalá No. 133 esquina Zacatecas, Ciudad de México",
		"lat":19.4152165,
		"lng":-99.164261
	},
	{
		"nombre": "Delirio",
		"numero": "01 (55) 5584-0870",
		"direccion": "Monterrey No. 116 - B esquina Álvaro Obregón, Ciudad de México",
		"lat":19.417174,
		"lng":-99.1660937
	},
	{
		"nombre": "Danubio",
		"numero": "01 (55) 5512-0912",
		"direccion": "República de Uruguay No. 3, Ciudad de México",
		"lat":19.4310795,
		"lng":-99.1431798
	},
	{
		"nombre": "Zoku por Hiroshi",
		"numero": "01 (55) 5211-9855",
		"direccion": "Durango No. 359, Ciudad de México",
		"lat":19.4184402,
		"lng":-99.1765809
	},
];
var plantillaRestaurante = '<article class="row contact">' +
        '<div class="card-panel hoverable grey lighten-5 z-depth-1">' +
          '<div class="row valign-wrapper">' +
            '<div class="col s3">' +
              '<h4 class="name">__nombre__ </h4> '+
            '</div>' +
            '<div class="col s9">' +
            	'<h6 class="direccion">__direccion__</h6>' +
              '<span class="black-text">' +
                'Phone: __numero__' +
              '</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
	'</article>';
 var filtrarResultados = function (e) {
	e.preventDefault();
	var criterioBusqueda = $("#search").val().toLowerCase();
	var restauranteFiltrado = restaurantes.filter(function (restaurante) {
		return restaurante.nombre.toLowerCase().indexOf(criterioBusqueda) >= 0;
	});
	mostrarResultados(restauranteFiltrado);
};

var mostrarResultados = function (restaurantes) {
	var plantillaFinal = "";
	restaurantes.forEach(function (restaurante) {
		plantillaFinal += plantillaRestaurante.replace("__nombre__", restaurante.nombre)
			.replace("__numero__", restaurante.numero)
			.replace("__direccion__", restaurante.direccion);
	});
	$(".Restaurante").html(plantillaFinal);
	mostrarEnMapa(restaurantes);
};
var mostrarEnMapa= function(restaurantes) {
	restaurantes.forEach(function(restaurante){
		var latitud = restaurante.lat;
        var longitud = restaurante.lng
  

  var newCoordenadas = {
    lat: latitud,
    lng: longitud
  };
 
  console.log(newCoordenadas);
  mostrarMapa(newCoordenadas);
  });
}