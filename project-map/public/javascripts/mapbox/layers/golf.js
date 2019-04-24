const addGolf = () => {
  map.addLayer({
    id: "golf",
    type: "fill",
    source: {
      type: "geojson",
      data: "https://data.cityofnewyork.us/resource/snr4-t66y.geojson"
    },
    layout: {
      visibility: "none"
    }
  });
};
