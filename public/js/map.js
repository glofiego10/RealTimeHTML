const uberStyle = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            { "color": "#878787" }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            { "color": "#ffffff" },
            { "visibility": "off" }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            { "color": "#e9e9e9" }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            { "color": "#ffffff" },
            { "visibility": "off" }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            { "color": "#ffffff" }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            { "color": "#c5c5c5" }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            { "color": "#f5f5f2" }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            { "color": "#c9c9c9" }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            { "visibility": "off" }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            { "visibility": "off" }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            { "visibility": "off" }
        ]
    }
];


let map, marker;

function initMap(lat = 0, lng = 0) {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: { lat, lng },
        styles: uberStyle,
        disableDefaultUI: true
    });
}

function updateMap(lat, lng) {
    if (marker) marker.setMap(null);
    marker = new google.maps.Marker({
        position: { lat, lng },
        map: map
    });
    map.setCenter({ lat, lng });
    map.setZoom(15);
}
