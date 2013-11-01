google.maps.event.addDomListener(window, 'load', function()
{
	var lng = 139.718997;
	var lat = 35.66933;

	//option
	var mapOptions = {
		zoom: 17,
		center: new google.maps.LatLng(lat, lng),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		panControl: false,
		zoomControl: true,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		navigationControl: true,
		scrollwheel: false,
		mapTypeControlOptions: { mapTypeIds: ['textChange', google.maps.MapTypeId.ROADMAP] }
	};

	var map = new google.maps.Map(document.getElementById('gmap'), mapOptions);

	//icon
	new google.maps.Marker({
		position: new google.maps.LatLng(lat, lng),
		map: map,
		icon: "images/icon_gmap.png"
	});

	//style
	var styleOptions = [{
		featureType: 'all',
		elementType: 'labels',
		elementType: 'geometry',
		stylers: [
		{ saturation: '0' },
		{ gamma: '2' },
		{ lightness: '0' },
		{ hue: '#008bb2'}
		]
	}];

	var styledMapOptions = { name: 'pelican cafe' }

	var myMapType = new google.maps.StyledMapType(styleOptions, styledMapOptions);
	map.mapTypes.set('textChange', myMapType);
	map.setMapTypeId('textChange');

});