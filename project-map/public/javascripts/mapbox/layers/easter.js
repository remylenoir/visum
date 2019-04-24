let easterEgg = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        message: "Rémynator",
        iconSize: [40, 40],
        image: "./images/remy.png"
      },
      geometry: {
        type: "Point",
        coordinates: [-74.044943, 40.689742] // Statue of Liberty
      }
    },
    {
      type: "Feature",
      properties: {
        message: "Master Eddie",
        iconSize: [40, 40],
        image: "./images/eddie.png"
      },
      geometry: {
        type: "Point",
        coordinates: [-73.996651, 40.716199] // Chinatown
      }
    }
  ]
};
