mapboxgl.accessToken =
  "pk.eyJ1IjoiYmFndWV0dGVkaW1zdW0iLCJhIjoiY2p1cjU5bWV3MDg4ejRkbjZ5YTF6bzNibSJ9.5TvJkViFSKc4l9p9JX-41w";

var map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/baguettedimsum/cjur5aobc4eah1fmthgditusl", //hosted style id
  center: [-73.957894, 40.734769], // starting position
  zoom: 12 // starting zoom
});
