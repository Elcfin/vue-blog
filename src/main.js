import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import "@/assets/style/base.less";

const app = createApp(App);
app.use(router);
app.mount("#app");
