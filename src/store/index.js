import { reactive } from "vue";

export default reactive({
  flashMessage: "",
  currentUser: JSON.parse(localStorage.getItem("user")),
  foodList: [],
  details: {},
  mark: [],
  markIndex: [],
  markRecipe: [],
});
