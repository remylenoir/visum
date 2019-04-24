// To hold the active layers IDs later
let activeLayers = [];

// Layers's IDs to show/hide
let toggleableLayerIds = [
  "day-care-center",
  "golf",
  "airport",
  "wifi-hotspot",
  "subway",
  "contours",
  "pools",
  "athletic-facilities",
  "skateparks",
  "collisions"
];

mapboxgl.accessToken =
  "pk.eyJ1IjoiYmFndWV0dGVkaW1zdW0iLCJhIjoiY2p1cjU5bWV3MDg4ejRkbjZ5YTF6bzNibSJ9.5TvJkViFSKc4l9p9JX-41w";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/baguettedimsum/cjur5aobc4eah1fmthgditusl",
  center: [-73.9978, 40.7209],
  zoom: 11 // starting zoom
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// Geo Search function
let geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  countries: "us",
  limit: 12,
  marker: true,
  bbox: [-74.10748919661376, 40.58020577579612, -73.74873634093505, 40.8590352814073],
  mapboxgl: mapboxgl
});

// Add the geocoder outside of the map
document.getElementById("geocoder").appendChild(geocoder.onAdd(map));

// Add the layers when the map is loaded
map.on("load", function() {
  // POI layers
  addGolf();
  addDayCareCenter();
  addAirport();

  // Miscellaneous
  addWiFi();

  // Others
  addContours();
  addCollisions();

  // Show the layers based on the URL parameters w/out being logged-in
  if ("URLSearchParams" in window) {
    var searchParams = new URLSearchParams(window.location.search);
    for (let params of searchParams) {
      map.setLayoutProperty(params[0], "visibility", "visible");
    }
  }

  // If the user is logged-in > retrieving its data and showing the saved layer
  axios
    .get(PROJECT_URL)
    .then(res => {
      // If the user is logged-in, pass its info from the /api/user
      if (!user) {
        user = res.data._id;
      }
      activeLayers = res.data[0].mapLayer;
      activeLayers.forEach(layer => {
        // Update the URL with the user's saved layers
        ADD_URL_PARAMS(layer);

        // Show the user's saved layers
        map.setLayoutProperty(layer, "visibility", "visible");
      });
      console.log("Active layers in the user's profile: ", activeLayers);
    })
    .catch(err => {
      console.error(err);
    });
});

// Show/hide layers function with buttons
toggleLayers();

// Add Pop-ups
addPop();
