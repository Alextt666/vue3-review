<template>
    <div class="hello">{{ counter }} -- {{ doubleCounter }}</div>
    <p ref="desc"></p>
  </template>
  
  <script>
  import {
    reactive,
    computed,
    onMounted,
    onUnmounted,
    toRefs,
    watch,
    ref,
  } from 'vue';
  export default {
    name: 'Composition',
    setup() {
      // counter 相关
      const { counter, doubleCounter } = useCounter();
      const desc = ref(null);
      // 侦听
      watch(counter, (value, oldValue) => {
        const p = desc.value;
        p.textContent = `Counter Change from ${oldValue} to ${value}`;
      });
      return { counter, doubleCounter, desc };
    },
  };
  function useCounter() {
    const data = reactive({
      counter: 1,
      doubleCounter: computed(() => data.counter * 2),
    });
    let timer;
    onMounted(() => {
      setInterval(() => {
        data.counter++;
      }, 1000);
    });
    onUnmounted(() => {
      clearTimeout(timer);
    });
    return toRefs(data);
  }
  </script>
  
  <style></style>
  