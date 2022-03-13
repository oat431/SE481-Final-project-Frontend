<template>
  <DefaultLayout>
    <Form @submit="search" :validation-schema="schema">
      <div class="grid grid-cols-3 gap-2 mt-2 sm:grid-cols-3">
        <div>
          <label class="text-gray-700 dark:text-gray-200" for="query"
            >fill your qeury:</label
          >
          <Field
            name="query"
            type="text"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
          <ErrorMessage name="query" class="text-red-500" />
          <p
            class="text-red-500"
            v-if="this.GlobalState.foodList.did_you_mean !== undefined"
          >
            Did you mean {{ this.GlobalState.foodList.did_you_mean[0] }}
          </p>
        </div>
        <div>
          <label class="text-gray-700 dark:text-gray-200" for="opt"
            >search type</label
          >
          <Field
            name="opt"
            as="select"
            :v-slot="{ opt }"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          >
            <option value="title">Title</option>
            <option value="ingredient">Ingredient</option>
            <option value="instruction">Instruction</option>
          </Field>
          <ErrorMessage name="opt" class="text-red-500" />
        </div>
        <div class="flex justify-center mt-6">
          <button
            class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            SEARCH
          </button>
        </div>
      </div>
    </Form>
  </DefaultLayout>
  <button
    @click="getMarkRecipe"
    class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
  >
    See Mark
  </button>
  <div
    v-if="this.markRecipeList.length !== 0"
    class="grid grid-cols-3 gap-2 mt-2 sm:grid-cols-3"
  >
    <RecipeCard v-for="i in this.markRecipeList" :key="i.id" :Recipe="i" />
  </div>
</template>

<script>
import DefaultLayout from "../layouts/DefaultLayout.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import FoodAPI from "../services/FoodAPI.js";
import RecipeCard from "@/components/RecipeCard.vue";

export default {
  name: "search",
  inject: ["GlobalState"],
  components: {
    RecipeCard,
    DefaultLayout,
    Form,
    ErrorMessage,
    Field,
  },
  data() {
    const schema = yup.object().shape({
      query: yup.string().required("query is required!"),
      opt: yup.string().required("option is required"),
    });
    return {
      schema,
      opt: "",
      markList: [],
      markRecipeList: [],
    };
  },
  methods: {
    search(query) {
      FoodAPI.search(query)
        .then((res) => {
          this.GlobalState.foodList = res;
        })
        .catch(() => {
          console.log("could not search");
        });
    },
    getMarkRecipe() {
      this.markList = [];
      for (let i of this.GlobalState.mark) {
        this.markList.push(i.title);
      }
      this.GlobalState.markIndex = Object.values(this.markList);
      FoodAPI.getMarkRecipe(Object.values(this.markList))
        .then((res) => {
          this.markRecipeList = res;
          this.GlobalState.markRecipe = res;
        })
        .catch(() => {
          console.log("could not search");
        });
    },
  },
};
</script>
