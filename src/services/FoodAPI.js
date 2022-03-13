import apiIRCore from "./IRCore.js";
import apiBackend from "./axiosClient";
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
  getById(id) {
    return apiIRCore.get("/recipe/" + id).then((res) => {
      return Promise.resolve(res.data);
    });
  },
  getUserById(id) {
    return apiBackend.get("/user/" + id).then((res) => {
      return Promise.resolve(res.data);
    });
  },
  getMarkRecipe(li) {
    return apiIRCore
      .post("/see-mark-recipe", {
        mark: li,
      })
      .then((res) => {
        return Promise.resolve(res.data);
      });
  },
  markingRecipe(userID, index) {
    return apiBackend
      .post("/mark/" + userID, {
        title: index,
      })
      .then((res) => {
        return Promise.resolve(res.data);
      });
  },
  unmarkingRecipe(userID, index) {
    return apiBackend
      .post("/unmark/" + userID, {
        title: index,
      })
      .then((res) => {
        return Promise.resolve(res.data);
      });
  },
};
