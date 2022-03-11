<template>
  heelo there
  <DefaultLayout>
    <Form @submit="search" :validation-schema="schema">
      <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div>
          <label class="text-gray-700 dark:text-gray-200" for="query"
            >fill your qeury:</label
          >
          <Field
            name="query"
            type="text"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
          <ErrorMessage name="username" class="text-red-500" />
        </div>
        <div></div>
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
            <option value="ingredient">ingredient</option>
            <option value="instruction">instruction</option>
          </Field>
          <ErrorMessage name="opt" class="text-red-500" />
        </div>
      </div>
      <div class="flex justify-center mt-6">
        <button
          class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
        >
          SEARCH
        </button>
      </div>
    </Form>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "../layouts/DefaultLayout.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import FoodAPI from "../services/FoodAPI.js";

export default {
  name: "search",
  inject: ["GlobalState"],
  components: {
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
    };
  },
  methods: {
    search(query) {
      FoodAPI.search(query)
        .then((res) => {
          //   this.$router.push({ name: "Home" });
          console.log(res);
        })
        .catch(() => {
          console.log("could not search");
        });
    },
  },
};
</script>
