const addGolf = () => {
  map.addLayer({
    id: "golf",
    type: "fill",
    layout: {
      visibility: "none"
    },
    source: {
      type: "geojson",
      data: "https://data.cityofnewyork.us/resource/snr4-t66y.geojson"
    }
  });
};
