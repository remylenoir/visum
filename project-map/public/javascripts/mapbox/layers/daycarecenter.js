const addDayCareCenter = () => {
  map.addSource("day-care-center-data", {
    type: "geojson",
    data: "https://data.cityofnewyork.us/resource/sd93-evwm.geojson",
    cluster: true,
    clusterMaxZoom: 14, // Max zoom to cluster points on
    clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
  });

  map.addLayer({
    id: "day-care-center",
    type: "circle",
    source: "day-care-center-data",
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
    id: "cluster-count",
    type: "symbol",
    source: "day-care-center-data",
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-size": 12
    }
  });

  map.addLayer({
    id: "unclustered-point",
    type: "circle",
    source: "day-care-center-data",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": "#11b4da",
      "circle-radius": 4,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff"
    }
  });

  // inspect a cluster on click
  map.on("click", "day-care-center", function(e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ["day-care-center"] });
    var clusterId = features[0].properties.cluster_id;
    map.getSource("day-care-center-data").getClusterExpansionZoom(clusterId, function(err, zoom) {
      if (err) return;

      map.easeTo({
        center: features[0].geometry.coordinates,
        zoom: zoom
      });
    });
  });

  map.on("mouseenter", "day-care-center", function() {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", "day-care-center", function() {
    map.getCanvas().style.cursor = "";
  });
};
