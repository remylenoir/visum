const addDayCareCenter = () => {
  const source = "day-care-center-data";
  const id = "day-care-center";
  const data = "https://data.cityofnewyork.us/resource/sd93-evwm.geojson";

  map.addSource(source, {
    type: "geojson",
    data,
    cluster: true,
    clusterMaxZoom: 14, // Max zoom to cluster points on
    clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
  });

  map.addLayer({
    id,
    type: "circle",
    source,
    layout: {
      visibility: "none"
    },
    filter: ["has", "point_count"],
    paint: {
      // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
      // with three steps to implement three types of circles:
      //   * Blue, 20px circles when point count is less than 5
      //   * Yellow, 30px circles when point count is between 5 and 20
      //   * Pink, 40px circles when point count is greater than or equal to 20
      "circle-color": ["step", ["get", "point_count"], "#51bbd6", 5, "#f1f075", 20, "#f28cb1"],
      "circle-radius": ["step", ["get", "point_count"], 20, 5, 30, 20, 40],
      "circle-opacity": ["interpolate", ["linear", 0.5], ["zoom"], 0, 0.3, 11, 0.6, 14, 0.9, 22, 1]
    }
  });

  map.addLayer({
    id: "dcc-cluster-count",
    type: "symbol",
    source,
    filter: ["has", "point_count"],
    layout: {
      visibility: "none",
      "text-field": "{point_count_abbreviated}",
      "text-size": 12
    }
  });

  map.addLayer({
    id: "dcc-unclustered-point",
    type: "circle",
    source,
    layout: {
      visibility: "none"
    },
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": "#11b4da",
      "circle-radius": 4,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff"
    }
  });

  // inspect a cluster on click
  map.on("click", id, el => {
    var features = map.queryRenderedFeatures(el.point, { layers: [id] });
    var clusterId = features[0].properties.cluster_id;

    map.getSource(source).getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) return;
      map.easeTo({
        center: features[0].geometry.coordinates,
        zoom: zoom
      });
    });
  });

  // When a click event occurs on a feature in the places layer, open a popup at the
  // location of the feature, with description HTML from its properties.
  map.on("click", "dcc-unclustered-point", el => {
    const coordinates = el.features[0].geometry.coordinates.slice();
    const name = el.features[0].properties.name;
    const streetname = el.features[0].properties.streetname;
    const streenumber = el.features[0].properties.housenum;
    const address = `${streenumber} ${streetname}`;

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
      .setHTML(`<b>${name}</b> <br>${address}`)
      .addTo(map);
  });

  // Change the cursor to a pointer when the mouse is over the places layer.
  HOVER_POINTER_MAP_ON(id);
  HOVER_POINTER_MAP_ON("dcc-unclustered-point");

  // Change it back to a pointer when it leaves.
  HOVER_POINTER_MAP_OFF(id);
  HOVER_POINTER_MAP_OFF("dcc-unclustered-point");
};
