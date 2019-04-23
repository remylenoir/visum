// To hold the active layers IDs later
let activeLayers = [];

// To check if the user is logged-in before doing axios request later
let user = undefined;

// Send the user's info to the user API if the user is logged-in
axios
  .get(`${PROJECT_URL}/user`)
  .then(res => {
    if (user) user = res.data._id;
  })
  .catch(err => {
    console.error(err);
  });

// Layers's IDs to show/hide
let toggleableLayerIds = [
  "subway",
  "contours",
  "airports",
  "wifi",
  "pools",
  "daycarecenter",
  "collisions",
  "athletic-facilities",
  "skateparks",
  "golfcourses"
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

map.on("load", function() {
  // Add the contours from another source
  map.addSource("contours", {
    type: "vector",
    url: "mapbox://mapbox.mapbox-terrain-v2"
  });
  map.addLayer({
    id: "contours",
    type: "line",
    source: "contours",
    "source-layer": "contour",
    layout: {
      visibility: "none",
      "line-join": "round",
      "line-cap": "round"
    },
    paint: {
      "line-color": "#877b59",
      "line-width": 1
    }
  });

  // Show the layers based on the URL parameters w/out being logged-in
  if ("URLSearchParams" in window) {
    var searchParams = new URLSearchParams(window.location.search);
    for (let params of searchParams) {
      map.setLayoutProperty(params[0], "visibility", "visible");
    }
  }

  // If the user is logged-in > retrieving its data and showing the saved layers
  if (user) {
    axios
      .get(PROJECT_URL)
      .then(res => {
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
  }

  // Interactive data's changes console
  var filterHour = ["==", ["number", ["get", "Hour"]], 12];
  var filterDay = ["!=", ["string", ["get", "Day"]], "placeholder"];

  map.addLayer({
    id: "collisions",
    type: "circle",
    layout: {
      visibility: "none"
    },
    source: {
      type: "geojson",
      data: "./javascripts/nyc-collisions.geojson" // replace this with the url of your own geojson
    },
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["number", ["get", "Casualty"]], 0, 4, 5, 24],
      "circle-color": [
        "interpolate",
        ["linear"],
        ["number", ["get", "Casualty"]],
        0,
        "#2DC4B2",
        1,
        "#3BB3C3",
        2,
        "#669EC4",
        3,
        "#8B88B6",
        4,
        "#A2719B",
        5,
        "#AA5E79"
      ],
      "circle-opacity": 0.8
    },
    filter: ["==", ["number", ["get", "Hour"]], 12]
  });

  // update hour filter when the slider is dragged
  document.getElementById("slider").addEventListener("input", function(e) {
    var hour = parseInt(e.target.value);
    // update the map
    map.setFilter("collisions", ["==", ["number", ["get", "Hour"]], hour]);

    // converting 0-23 hour to AMPM format
    var ampm = hour >= 12 ? "PM" : "AM";
    var hour12 = hour % 12 ? hour % 12 : 12;

    // update text in the UI
    document.getElementById("active-hour").innerText = hour12 + ampm;
  });

  document.getElementById("filters").addEventListener("change", function(e) {
    var day = e.target.value;
    // update the map filter
    if (day === "all") {
      filterDay = ["!=", ["string", ["get", "Day"]], "placeholder"];
    } else if (day === "weekday") {
      filterDay = ["match", ["get", "Day"], ["Sat", "Sun"], false, true];
    } else if (day === "weekend") {
      filterDay = ["match", ["get", "Day"], ["Sat", "Sun"], true, false];
    } else {
      console.log("error");
    }
    map.setFilter("collisions", ["all", filterDay]);
  });
});

// POP-UP w/ info on click
// map.on("click", function(e) {
//   var features = map.queryRenderedFeatures(e.point, {
//     layers: ["poi"] // replace this with the name of the layer
//   });

//   if (!features.length) {
//     return;
//   }

//   var feature = features[0];

//   var popup = new mapboxgl.Popup({ offset: [0, -15] })
//     .setLngLat(feature.geometry.coordinates)
//     .setHTML("<h3>" + feature.properties.name + "</h3>")
//     .setLngLat(feature.geometry.coordinates)
//     .addTo(map);
// });

for (var i = 0; i < toggleableLayerIds.length; i++) {
  var id = toggleableLayerIds[i];

  var link = document.createElement("a");
  link.id = id;
  link.href = "#";
  link.className = "";
  link.textContent = id;

  link.onclick = function(e) {
    var clickedLayer = this.textContent;
    e.preventDefault();
    e.stopPropagation();

    var visibility = map.getLayoutProperty(clickedLayer, "visibility");

    if (visibility === "visible") {
      map.setLayoutProperty(clickedLayer, "visibility", "none");
      this.className = "inactive";

      // If the user is logged-in > remove the layer from the user's profile
      if (user) {
        activeLayers = activeLayers.filter(layer => layer !== clickedLayer);
        axios
          .post(PROJECT_URL, { activeLayers })
          .then(() => {
            console.log("Layer removed from database");
          })
          .catch(err => {
            console.error(err);
          });
      }

      // Update the URL with the user's saved layers
      REMOVE_URL_PARAMS(clickedLayer);

      // Hide the collisions's console ONLY if the button collisions is cliked
      if (this.id === "collisions") {
        document.getElementById("console").classList.remove("active");
      }
    } else {
      this.className = "active";
      map.setLayoutProperty(clickedLayer, "visibility", "visible");

      // If the user is logged-in > add the layer to the user's profile
      if (user) {
        activeLayers.push(clickedLayer);
        axios
          .post(PROJECT_URL, { activeLayers })
          .then(() => console.log("Layer added to database"))
          .catch(err => {
            console.error(err);
          });
      }

      // Update the URL with the user's saved layers
      ADD_URL_PARAMS(clickedLayer);

      // Show the collisions's console ONLY if the button collisions is cliked
      if (this.id === "collisions") {
        document.getElementById("console").classList.add("active");
      }
    }
  };

  var layers = document.getElementById("menu");
  layers.appendChild(link);
}
