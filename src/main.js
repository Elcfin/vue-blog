import { createApp } from "vue";

/* markdown 编辑器插件 v-md-editor */
import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import Prism from "prismjs";
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

import App from "@/App.vue";
import router from "@/router";

/* 全局样式 */
import "@/assets/style/index.less";

const app = createApp(App);
app.use(VueMarkdownEditor);
app.use(router);
app.mount("#app");
