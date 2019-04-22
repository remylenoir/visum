mapboxgl.accessToken =
  "pk.eyJ1IjoiYmFndWV0dGVkaW1zdW0iLCJhIjoiY2p1cjU5bWV3MDg4ejRkbjZ5YTF6bzNibSJ9.5TvJkViFSKc4l9p9JX-41w";

var map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/baguettedimsum/cjur5aobc4eah1fmthgditusl", //hosted style id
  center: [-73.957894, 40.734769], // starting position
  zoom: 12 // starting zoom
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  })
);

map.on("load", function() {
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
});

let activeLayers = [];

// Mapbox show/hide layers
var toggleableLayerIds = ["contours"];

for (var i = 0; i < toggleableLayerIds.length; i++) {
  var id = toggleableLayerIds[i];

  var link = document.createElement("a");
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

      // remove the layer from the array
      activeLayers = activeLayers.filter(layer => layer !== clickedLayer);

      if ("URLSearchParams" in window) {
        var searchParams = new URLSearchParams(window.location.search);
        searchParams.delete(clickedLayer);
        var newRelativePathQuery = window.location.pathname + "?" + searchParams.toString();
        history.pushState(null, "", newRelativePathQuery);
      }
    } else {
      this.className = "active";
      map.setLayoutProperty(clickedLayer, "visibility", "visible");

      // add the layer in the array
      activeLayers.push(clickedLayer);

      // pass query strings to the URL
      if ("URLSearchParams" in window) {
        var searchParams = new URLSearchParams(window.location.search);
        searchParams.set(clickedLayer, "active");
        var newRelativePathQuery = window.location.pathname + "?" + searchParams.toString();
        history.pushState(null, "", newRelativePathQuery);
      }

      // pass query strings to the URL
      // window.history.replaceState(null, null, `/?${clickedLayer}=visible`);
      // console.log(location.search);
    }
    console.log(activeLayers);
  };

  var layers = document.getElementById("menu");
  layers.appendChild(link);
}
