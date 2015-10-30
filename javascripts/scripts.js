function getQuakes(callback) {
  $.get("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson", function( data ) {

    var items, markers_data = [];
    if (data.features.length > 0) {
      items = data.features;

      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var icon = 'http://mapapps.bgs.ac.uk/geologyofbritain/images/earthquake.png';

        markers_data.push({
          lng : item.geometry.coordinates[0],
          lat : item.geometry.coordinates[1],
          title : item.properties.title,
          infoWindow: {
            content: '<p>Earthquake: ' + item.properties.title + '</p>'
          },
          icon : {
            size : new google.maps.Size(32, 32),
            url : icon
          }
        });

        $('#quakes').append('<div class="item"><i class="map marker icon"></i><div class="content">' + '<div class="header">' + item.properties.place + '</div>' + '<div class="description">' + item.properties.mag + ' Magnitude</div>' + '</div></div>');
      }
    }

    map.addMarkers(markers_data);

    callback();
  });
}

function in10Seconds() {
  setTimeout(function() {
    getQuakes(in10Seconds);
    $('#quakes').empty();
  }, 10000);
}


var map;
$(function() {
  map = new GMaps({
    el: '#map',
    lat: 0,
    lng: 0,
    zoom: 2
  });

  getQuakes(in10Seconds);
});
