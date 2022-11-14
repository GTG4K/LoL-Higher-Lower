import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import HomePage from "./components/Pages/HomePage.vue";
import ClassicPage from "./components/Pages/ClassicPage.vue";

import BaseButton from "./components/UI/BaseButton.vue";
import BaseInfobox from "./components/UI/BaseInfobox.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: HomePage,
    },
    {
      path: "/classic",
      component: ClassicPage,
    },
  ],
});

const app = createApp(App);
app.component("base-button", BaseButton);
app.component("base-infobox", BaseInfobox);

app.use(router);

app.mount("#app");
