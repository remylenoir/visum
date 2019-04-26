// To hold the active layers IDs later
let activeLayers = [];

// Hold the current URL for the Share to a friend function
let clipboard = new ClipboardJS(".copy-url");
const SHARE_URL = document.getElementById("current-url");

// Layers's IDs to show/hide
let toggleableLayerIds = [
  "collisions",
  "bike-routes",
  "bike-shelters",
  "wifi-hotspot",
  "day-care-center",
  "airport",
  "park",
  "athletic-facilities",
  "hurricane-evacuation-center",
  "golf"
];

//define awesome font to layers
let dayCare = "fa-child";
let bikeRoutes = "fa-bicycle";
let bikeShelters = "fa-warehouse";
let hurricaneCenter = "fa-wind";
let wifi = "fa-wifi";
let airport = "fa-plane";
let cityPark = "fa-tree";
let golf = "fa-golf-ball";
// let skateparks = "fa-smile";
let athletic = "fa-running";
let collisions = "fa-car-crash";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYmFndWV0dGVkaW1zdW0iLCJhIjoiY2p1cjU5bWV3MDg4ejRkbjZ5YTF6bzNibSJ9.5TvJkViFSKc4l9p9JX-41w";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/baguettedimsum/cjuwhqoe80f9v1fmlhjgkjlcd",
  // style: "mapbox://styles/baguettedimsum/cjur5aobc4eah1fmthgditusl",
  center: [-73.9978, 40.7209],
  bbox: [-74.10748919661376, 40.58020577579612, -73.74873634093505, 40.8590352814073],
  pitch: 40,
  zoom: 11
});

// Add zoom+rotation and fullscreen controls to the map.
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.FullscreenControl());

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
  addDayCareCenter();
  addCollisions();
  addWiFi();
  addAirport();
  addAthletic();
  addGolf();
  addBikeShelter();
  addHurricaneCenter();
  addBikeLane();
  addPark();

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
        // Update the Share-link URL
        SHARE_URL.value = window.location.href;

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

  SHARE_URL.value = window.location.href;

  // // add markers to map
  // easterEgg.features.forEach(function(marker) {
  //   // create a DOM element for the marker
  //   var el = document.createElement("div");
  //   el.className = "marker";
  //   el.style.backgroundImage = `url(${marker.properties.image})`;
  //   el.style.width = marker.properties.iconSize[0] + "px";
  //   el.style.height = marker.properties.iconSize[1] + "px";

  //   el.addEventListener("click", function() {});

  //   // add marker to map
  //   new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
  // });
});

//map filter panel toggle
document.querySelector(".toggle-collapse").addEventListener("click", e => {
  let target = e.target;
  if (target.classList.contains("fa-chevron-left")) {
    target.classList.remove("fa-chevron-left");
    target.classList.add("fa-chevron-right");
  } else if (target.classList.contains("fa-chevron-right")) {
    target.classList.add("fa-chevron-left");
    target.classList.remove("fa-chevron-right");
  }
  document.querySelector(".side-menu-content").classList.toggle("hide");
  document.querySelector(".side-menu").classList.toggle("collapsed");
  document.querySelector(".layer-icon").classList.toggle("show");
});

// Show/hide layers function with buttons
toggleLayers();
