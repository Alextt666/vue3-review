import { createApp, h } from "vue";
import "./style.css";
import App from "./App.vue";

createApp(App)
  .component("comp", {
    render() {
      return h("div", "I am comp");
    },
  })
  .directive("highlight", {
    beforeMount(el, binding, vnode) {
      el.style.background = binding.value;
    },
  })
  .mount("#app");
