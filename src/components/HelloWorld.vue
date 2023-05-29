<template>
  <!-- compositionAPI -->
  <Composition></Composition>
  <!-- teleport -->
  <ModalButton></ModalButton>
  <!-- emits -->
  <Emits @my-click="handleEmits"></Emits>
  <!-- 全局实例 -->
  <comp></comp>
  <!-- v-model使用 -->
  <VmodalTest v-model:counter="counter"></VmodalTest>
  <!-- 等价于下面 -->
  <!-- <VmodalTest :counter="counter" @update:counter=""></VmodalTest> -->
  <RenderTest v-model:counter="counter">
    <!-- slot -->
    <template v-slot> title </template>
    <template v-slot:content> content... </template>
  </RenderTest>
  <Functional level="3">函数式组件</Functional>
  <!-- 异步组件 -->
  <AsyncComp></AsyncComp>
  <!-- 自定义指令 -->
  <p v-highlight="'green'">highlight this text</p>
</template>

<script>
import Composition from "./Composition.vue";
import ModalButton from "./ModalButton.vue";
import Emits from "./Emits.vue";
import VmodalTest from "./VmodalTest.vue";
import Functional from "./Functional.js";
import { defineAsyncComponent, h } from "vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      counter: 1,
    };
  },
  components: {
    Composition,
    ModalButton,
    Emits,
    VmodalTest,
    // render Components
    RenderTest: {
      props: {
        counter: {
          type: Number,
          default: 0,
        },
      },
      render() {
        return h("div", [
          h("div", { onClick: this.onClick }, [
            "I am RenderTest" + this.counter,
            this.$slots.default(),
            this.$slots.content(),
          ]),
        ]);
      },
      methods: {
        onClick() {
          this.$emit("update:counter", this.counter + 1);
        },
      },
    },
    Functional,
    AsyncComp: defineAsyncComponent(() => import("./Nextpage.vue")),
  },
  methods: {
    handleEmits() {
      console.log("click");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
