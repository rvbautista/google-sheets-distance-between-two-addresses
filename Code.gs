//Distance functions modified from originals by github.com/rvbautista
//DRIVEDIST modified from https://www.bpwebs.com/calculate-the-distance-between-two-addresses/
//GEODIST modified from https://www.labnol.org/code/19735-find-distance-in-google-sheets
//Please make attribution to my github and to the listed websites above when using this code. Thank you

function DRIVEDIST(origin, destination, unit) {
  var directions = Maps.newDirectionFinder()
    .setOrigin(origin)
    .setDestination(destination)
    .setMode(Maps.DirectionFinder.Mode.DRIVING)
    .getDirections();

  var distance = directions.routes[0].legs[0].distance.value;
  switch (unit){
    case "km":
      distance = distance/1000;
      return Number (distance.toFixed(2));
    case "m": 
      return Number (distance.toFixed(2));
    case "mi":
      distance = distance/1609.34;
      return Number (distance.toFixed(2));
    case "ft":
      distance = distance*3.28084;
      return Number (distance.toFixed(2));
    case "nm":
      distance = distance/1852;
      return Number (distance.toFixed(2));
  }
}

function GEODIST(origin, destination, unit) {
  var geocoder = Maps.newGeocoder();
  var start = geocoder.geocode(origin);
  if (start.status == 'OK') {
    var coords1 = [ start["results"][0]["geometry"]["location"]["lat"], start["results"][0]["geometry"]["location"]["lng"] ];
  }
  var lat1 = ( coords1[0] * Math.PI) / 180;
  var lng1 = ( coords1[1] * Math.PI) / 180;
  var endd = geocoder.geocode(destination);
  if (endd.status == 'OK') {
    var coords2 = [ endd["results"][0]["geometry"]["location"]["lat"], endd["results"][0]["geometry"]["location"]["lng"] ];
  }
  var lat2 = ( coords2[0] * Math.PI) / 180;
  var lng2 = ( coords2[1] * Math.PI) / 180;

  var dLng = lng2 - lng1,
    dLat = lat2 - lat1;

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  switch (unit){
    case "km":
      return parseInt(6371 * c);
    case "m": 
      return parseInt(6371230 * c);
    case "mi":
      return parseInt((6371230/1609.34) * c);
    case "ft":
      return parseInt(6371230*3.28084 * c);
    case "nm":
      return parseInt((6371230/1852) * c);
  }
}
