<template>
  <Header />
  <SearchBar />
  <div
    v-if="this.GlobalState.foodList.length === 50"
    class="grid grid-cols-3 gap-2 mt-2 sm:grid-cols-3"
  >
    <RecipeCard
      v-for="i in this.GlobalState.foodList"
      :key="i.id"
      :Recipe="i"
    />
  </div>
  <!-- <div v-if="this.GlobalState.foodList.did_you_mean !== undefined">
    <h3 class="text-green-700">Did you mean : {{this.GlobalState.foodList.did_you_mean[0]}}</h3>
  </div> -->
</template>

<script>
import Header from "@/components/Header.vue";
import SearchBar from "./SearchBar.vue";
import RecipeCard from "@/components/RecipeCard.vue";

export default {
  name: "Home",
  inject: ["GlobalState"],
  components: {
    Header,
    SearchBar,
    RecipeCard,
  },
};
</script>
