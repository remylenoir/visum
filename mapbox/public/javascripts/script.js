mapboxgl.accessToken =
  "pk.eyJ1IjoicmVteWxlbm9pciIsImEiOiJjanVvNmg5ZGoycjl4NDRxanVlMWlieWJ2In0.lKu2DvqkVYPenlX3j5i0Xw";
const map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/remylenoir/cjupiwgea0r9u1fqp0au78mop",
  center: [13.49804, 52.52911],
  zoom: 13.2
  // style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
  // center: [-71.97722138410576, -13.517379300798098], // starting position [lng, lat]
  // zoom: 9 // starting zoom,
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

var swatches = document.getElementById("swatches");
var layer = document.getElementById("layer");
var colors = [
  "#ffffcc",
  "#a1dab4",
  "#41b6c4",
  "#2c7fb8",
  "#253494",
  "#fed976",
  "#feb24c",
  "#fd8d3c",
  "#f03b20",
  "#bd0026"
];

colors.forEach(function(color) {
  var swatch = document.createElement("button");
  swatch.style.backgroundColor = color;
  swatch.addEventListener("click", function() {
    map.setPaintProperty(layer.value, "fill-color", color);
  });
  swatches.appendChild(swatch);
});

map.on("load", function() {
  map.addSource("museums", {
    type: "vector",
    url: "mapbox://mapbox.2opop9hr"
  });
  map.addLayer({
    id: "museums",
    type: "circle",
    source: "museums",
    layout: {
      visibility: "visible"
    },
    paint: {
      "circle-radius": 8,
      "circle-color": "rgba(55,148,179,1)"
    },
    "source-layer": "museum-cusco"
  });

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
      visibility: "visible",
      "line-join": "round",
      "line-cap": "round"
    },
    paint: {
      "line-color": "#877b59",
      "line-width": 3
    }
  });
});

var toggleableLayerIds = ["toiletten", "contours", "museums"];

let activeLayers = [];

for (var i = 0; i < toggleableLayerIds.length; i++) {
  var id = toggleableLayerIds[i];

  var link = document.createElement("a");
  link.href = "#";
  link.className = "active";
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
    } else {
      this.className = "active";
      map.setLayoutProperty(clickedLayer, "visibility", "visible");
      // window.history.replaceState(clickedLayer, "Layer", `/?${clickedLayer}=visible`);
      // add the layer in the array
      activeLayers.push(clickedLayer);
    }

    console.log(activeLayers);
  };

  var layers = document.getElementById("menu");
  layers.appendChild(link);
}
