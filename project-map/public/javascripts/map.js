mapboxgl.accessToken =
  "pk.eyJ1IjoiYmFndWV0dGVkaW1zdW0iLCJhIjoiY2p1cjU5bWV3MDg4ejRkbjZ5YTF6bzNibSJ9.5TvJkViFSKc4l9p9JX-41w";

var map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/mapbox/dark-v10", //hosted style id
  center: [-77.38, 39], // starting position
  zoom: 3 // starting zoom
});
