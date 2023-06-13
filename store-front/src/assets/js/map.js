function initMap() {
    google.maps.event.addDomListener(window, 'load', initialize);
  }
  function initialize() {
    var $latitude = 51.51891,
        $longitude = -0.11905,
        $image = 'http://www.mishcon.com/map-logo.jpg',
        $mapZoom = 14;
       
     
    var myLatlng = new google.maps.LatLng($latitude,$longitude);
    var mapOptions = {
      zoom: $mapZoom,
      center: myLatlng
    }
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  
    var image = $image;
    
    var marker = new google.maps.Marker({
        position: myLatlng,
        icon: image,
        map: map,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        title: 'Mishcon De Reya'
    });
    
    // Editable string with html markup for tooltip content
    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '<h3 id="firstHeading" class="mapHeading">Mishcon de Reya</h3>'+
        '</div>'+
        '<div id="mapContent">'+
        '<p>Summit House,<br />'+
        '12 Red Lion Square</p>'+
        '</div>'+
        '</div>';
  
  var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    
   // open tooltip on load
  infowindow.open(map, marker);
    
   // open tooltip  on click on the marker
   /* google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    }); */ 
     
     
  }
  
  
  
module.exports = {
    initMap : initMap,
}