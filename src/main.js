import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import GlobalState from "./store";
import "nprogress/nprogress.css";
import "./index.css";

const app = createApp(App).use(router).provide("GlobalState", GlobalState);

//await router.isReady()
app.mount("#app");
