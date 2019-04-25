let easterEgg = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        message: "Rémynator",
        iconSize: [40, 40],
        image: "https://res.cloudinary.com/baguettedimsum/image/upload/v1556192871/remy_wxjwzc.png"
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
        image: "https://res.cloudinary.com/baguettedimsum/image/upload/v1556192871/eddie_gr4iil.png"
      },
      geometry: {
        type: "Point",
        coordinates: [-73.996651, 40.716199] // Chinatown
      }
    }
  ]
};
