const addHealthCenter = () => {
  map.addSource("health-center-data", {
    type: "geojson",
    data: "https://data.cityofnewyork.us/resource/b2sp-asbg.geojson"
  });

  map.addLayer({
    id: "health-center",
    type: "circle",
    source: "health-center-data",
    layout: {
      visibility: "none"
    }
  });
};
