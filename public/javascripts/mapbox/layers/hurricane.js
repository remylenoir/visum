const addHurricaneCenter = () => {
  const id = "hurricane-evacuation-center";
  const data = "https://data.cityofnewyork.us/resource/addd-ji6a.geojson";

  map.addLayer({
    id,
    type: "symbol",
    minzoom: 10,
    source: {
      type: "geojson",
      data
    },
    layout: {
      visibility: "none",
      "icon-image": "castle-15",
      "icon-allow-overlap": true
    }
  });

  // When a click event occurs on a feature in the places layer, open a popup at the
  // location of the feature, with description HTML from its properties.
  map.on("click", id, el => {
    const coordinates = el.features[0].geometry.coordinates.slice();
    const address = el.features[0].properties.address;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(el.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += el.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup({
      closeButton: true
    })
      .setLngLat(coordinates)
      .setHTML(address)
      .addTo(map);
  });

  // Change the cursor to a pointer when the mouse is over the places layer.
  HOVER_POINTER_MAP_ON(id);

  // Change it back to a pointer when it leaves.
  HOVER_POINTER_MAP_OFF(id);
};
