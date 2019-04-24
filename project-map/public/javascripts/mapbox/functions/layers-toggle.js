// To check if the user is logged-in before doing axios request later
let user = undefined;

// Send the user's info to the user API if the user is logged-in
axios
  .get(`${PROJECT_URL}/user`)
  .then(res => {
    if (!user) {
      user = res.data._id;
    }
  })
  .catch(err => {
    console.error(err);
  });

const toggleLayers = () => {
  for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    let icon = document.createElement("div");
    icon.className = "icon";

    var link = document.createElement("a");
    link.id = id;
    link.href = "#";
    link.className = "";
    link.textContent = id;
    link.appendChild(icon);

    link.onclick = function(e) {
      var clickedLayer = this.textContent;
      e.preventDefault();
      e.stopPropagation();

      var visibility = map.getLayoutProperty(clickedLayer, "visibility");

      // Adjust the zoom if the data is outside ouf the view
      if (clickedLayer === "airport" && visibility === "none") {
        map.zoomTo(11, { duration: 2000 });
      }
      if (clickedLayer === "golf" && visibility === "none") {
        map.zoomTo(10, { duration: 2000 });
      }

      if (visibility === "visible") {
        map.setLayoutProperty(clickedLayer, "visibility", "none");
        this.classList.add("inactive");
        this.classList.remove("active");

        // If the user is logged-in > remove the layer from the user's profile
        // console.log(user);
        activeLayers = activeLayers.filter(layer => layer !== clickedLayer);
        axios
          .post(PROJECT_URL, { activeLayers })
          .then(res => {
            if (!user) {
              user = res.data._id;
            }
            console.log("Layer removed from database");
          })
          .catch(err => {
            console.error(err);
          });

        // Update the URL with the user's saved layers
        REMOVE_URL_PARAMS(clickedLayer);

        // Hide the collisions's console ONLY if the button collisions is cliked
        if (this.id === "collisions") {
          document.getElementById("console").classList.remove("active");
        }
      } else {
        this.classList.add("active");
        this.classList.remove("inactive");
        map.setLayoutProperty(clickedLayer, "visibility", "visible");

        // If the user is logged-in > add the layer to the user's profile
        activeLayers.push(clickedLayer);
        axios
          .post(PROJECT_URL, { activeLayers })
          .then(res => {
            if (!user) {
              user = res.data._id;
            }
            console.log("Layer added to database");
          })
          .catch(err => {
            console.error(err);
          });

        // Update the URL with the user's saved layers
        ADD_URL_PARAMS(clickedLayer);

        // Show the collisions's console ONLY if the button collisions is cliked
        if (this.id === "collisions") {
          document.getElementById("console").classList.add("active");
        }
      }
    };
    var layers = document.getElementById("menu");
    layers.appendChild(link);
  }
};
