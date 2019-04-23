const BASE_URL = "http://localhost:3000";
const PROJECT_URL = `${BASE_URL}/api`;

// URL query parameters handling
const ADD_URL_PARAMS = layer => {
  var searchParams = new URLSearchParams(window.location.search);
  searchParams.set(layer, "active");
  var newRelativePathQuery = window.location.pathname + "?" + searchParams.toString();
  history.pushState(null, "", newRelativePathQuery);
};

const REMOVE_URL_PARAMS = layer => {
  var searchParams = new URLSearchParams(window.location.search);
  searchParams.delete(layer, "active");
  var newRelativePathQuery = window.location.pathname + "?" + searchParams.toString();
  history.pushState(null, "", newRelativePathQuery);
};
