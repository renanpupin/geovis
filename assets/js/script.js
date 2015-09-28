$(document).ready(function(){

	// INIT SMOOTHWHEEL
    $("body").smoothWheel();

	//NAV ACTIVE ITENS
	$("#nav-links li a").click( function() {
		$("#nav-links li a").removeClass("nav-active");
		$(this).addClass("nav-active");
	});

	var test_data = [{"geodata": {"lat": 52.5212, "lon": 4.589}, "infodata": "infodata here"}];


});
	var json_data = [
	    ['First Shoppe', "215 West Girard Avenue 19123", "+1-111-111-1111", 52.360986,4.89153],
	    ['Second Shoppe', "215 West Girard Avenue 19123", "+2-222-222-2222", 52.360847,4.897027],
	    ['Third Shoppe', "215 West Girard Avenue 19123", "+3-333-333-3333", 52.366062,4.892607],
	    ['Fourth Shoppe', "215 West Girard Avenue 19123", "+4-444-444-4444", 52.368263,4.892607],
	    ['Fifth Shoppe', "215 West Girard Avenue 19123", "+5-555-555-5555", 52.373398,4.892607],
	    ['Sixth Shoppe', "215 West Girard Avenue 19123", "+6-666-666-6666", 52.374604,4.896383],
	    ['Seventh Shoppe', "215 West Girard Avenue 19123", "+8-888-888-8888", 52.360847,4.897027],
	    ['Eighth Shoppe', "215 West Girard Avenue 19123", "+9-999-999-9999", 52.371512,4.877586],
	    ['Tenth Shoppe', "215 West Girard Avenue 19123", "+7-777-777-7777", 52.359877,4.893036],
	    ['Eleventh Shoppe', "215 West Girard Avenue 19123", "+7-777-777-7777", 52.370988,4.915438],
	    ['Twoelveth Shoppe', "215 West Girard Avenue 19123", "+7-777-777-7777", 52.368997,4.886998],
	    ['Thirtieth Shoppe', "215 West Girard Avenue 19123", "+7-777-777-7777", 52.377943,4.900104],
	    ['Fourth Shoppe', "215 West Girard Avenue 19123", "+7-777-777-7777", 52.37146,4.890633]
	];

	var app1 = new App(json_data);
	app1.initMap();
	app1.addMarkers();
	// addMarkers(app1.map, app1.data);
