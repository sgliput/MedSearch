// Map with a marker at the input coordinates and pan/zoom interactivity
function renderMap(latitude, longitude) {
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

     // initialize a map
     var map = new H.Map(document.getElementById('locationMap'),
          defaultLayers.normal.map, {
               center: {
                    lat: latitude,
                    lng: longitude
               },
               zoom: 14,
               pixelRatio: pixelRatio
          });

     // make the map interactive for pan/zoom
     var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

     // Create the default UI components
     var ui = H.ui.UI.createDefault(map, defaultLayers);

     // add marker
     var locationMarker = new H.map.Marker({
          lat: latitude,
          lng: longitude
     });
     map.addObject(locationMarker);
}
//renderMap(37.649054, -77.615751);