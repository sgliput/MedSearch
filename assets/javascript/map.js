function renderMap(myLat, myLng) {

     // initialize communication with the platform
     var platform = new H.service.Platform({
          app_id: 'devportal-demo-20180625',
          app_code: '9v2BkviRwi9Ot26kp2IysQ',
          useHTTPS: true
     });
     var pixelRatio = window.devicePixelRatio || 1;
     var defaultLayers = platform.createDefaultLayers({
          tileSize: pixelRatio === 1 ? 256 : 512,
          ppi: pixelRatio === 1 ? undefined : 320
     });

     // initialize a map - this map is centered over Europe
     var map = new H.Map(document.getElementById('map'),
          defaultLayers.normal.map, {
               center: {
                    lat: myLat,
                    lng: myLng
               },
               zoom: 15,
               pixelRatio: pixelRatio
          });

     // make the map interactive
     var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

     // Create the default UI components
     var ui = H.ui.UI.createDefault(map, defaultLayers);

     // Now use the map as required...
     var locationMarker = new H.map.Marker({
          lat: myLat,
          lng: myLng
     });
     map.addObject(locationMarker);
}

//  ----- this call is just for testing ----
renderMap(37.649054, -77.615751);