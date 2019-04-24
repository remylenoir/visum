const addCollisions = () => {
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
      data: "./javascripts/mapbox/layers/nyc-collisions.geojson" // replace this with the url of your own geojson
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
};
