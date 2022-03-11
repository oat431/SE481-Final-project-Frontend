import apiIRCore from "./IRCore.js";
// import GlobalStorage from "../store";
export default {
  search(_query) {
    console.log(_query);
    return apiIRCore
      .post("/search-recipe", {
        query: _query.query,
        type: _query.opt,
      })
      .then((response) => {
        // localStorage.setItem("token", response.data.token);
        // localStorage.setItem("user", JSON.stringify(response.data.user));
        // GlobalStorage.currentUser = response.data.user;
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        console.log("here err");
        return Promise.reject(error);
      });
  },
};
