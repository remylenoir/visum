const addPop = () => {
  map.on("click", function(e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: ["golf"] // replace this with the name of the layer
    });

    if (!features.length) {
      return;
    }

    var feature = features[0];

    var popup = new mapboxgl.Popup({ offset: [0, -15] })
      .setLngLat(feature.geometry.coordinates)
      .setHTML("<h3>" + feature.properties.name + "</h3>")
      .setLngLat(feature.geometry.coordinates)
      .addTo(map);
  });
};
