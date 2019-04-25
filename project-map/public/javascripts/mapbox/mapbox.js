// To hold the active layers IDs later
let activeLayers = [];

// To hold the current URL
const CURRENT_URL = document.getElementById("current-url");
let clipboard = new ClipboardJS(".copy-url");

// Layers's IDs to show/hide
let toggleableLayerIds = [
  "day-care-center",
  "bike-lane",
  "bike-shelters",
  "hurricane-evacuation-center",
  "wifi-hotspot",
  "airport",
  "park",
  "golf",
  "skateparks",
  "athletic-facilities",
  //
  // "pools",
  "collisions"
];

//define awesome font to layers
let dayCare = "fa-child";
let bikeLane = "fa-bicycle";
let bikeShelters = "fa-warehouse";
let hurricaneCenter = "fa-wind";
let wifi = "fa-wifi";
let airport = "fa-plane";
let cityPark = "fa-tree";
let golf = "fa-golf-ball";
let skateparks = "fa-smile";
let athletic = "fa-running";
let collisions = "fa-car-crash";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYmFndWV0dGVkaW1zdW0iLCJhIjoiY2p1cjU5bWV3MDg4ejRkbjZ5YTF6bzNibSJ9.5TvJkViFSKc4l9p9JX-41w";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  // style: "mapbox://styles/baguettedimsum/cjur5aobc4eah1fmthgditusl",
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
  // addHealthCenter();
  addPark();
  addGolf();
  addAirport();
  addAthletic();
  addSkatepark();
  addDayCareCenter();

  // Miscellaneous
  addWiFi();

  // Others
  // addContours();
  addBikeLane();
  addCollisions();
  addBikeShelter();
  addHurricaneCenter();

  // Show the layers based on the URL parameters w/out being logged-in
  if ("URLSearchParams" in window) {
    var searchParams = new URLSearchParams(window.location.search);
    for (let params of searchParams) {
      // Show the elements linked to the layer if the layer is in the URL
      if (params[0] === "day-care-center") {
        map.setLayoutProperty("dcc-cluster-count", "visibility", "visible");
        map.setLayoutProperty("dcc-unclustered-point", "visibility", "visible");
      }
      if (params[0] === "collisions") {
        document.getElementById("collisions-infobox").classList.add("active");
      }
      map.setLayoutProperty(params[0], "visibility", "visible");
      // Add the active class to the buttons
      document.getElementById(params[0]).classList.add("active");
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

        // Add the active class to the buttons
        document.getElementById(layer).classList.add("active");
      });
      console.log("Active layers in the user's profile: ", activeLayers);
    })
    .catch(err => {
      console.error(err);
    });

  CURRENT_URL.value = window.location.href;

  // add markers to map
  easterEgg.features.forEach(function(marker) {
    // create a DOM element for the marker
    var el = document.createElement("div");
    el.className = "marker";
    el.style.backgroundImage = `url(${marker.properties.image})`;
    el.style.width = marker.properties.iconSize[0] + "px";
    el.style.height = marker.properties.iconSize[1] + "px";

    el.addEventListener("click", function() {});

    // add marker to map
    new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
  });
});

// Show/hide layers function with buttons
toggleLayers();
