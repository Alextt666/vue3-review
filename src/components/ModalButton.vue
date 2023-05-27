<template>
    <div>
      <button @click="modalOpen = true">弹出一个模态框</button>
      <teleport to="body">
        <div v-if="modalOpen">
          <div>我是框</div>
          <button @click="modalOpen = false">关闭</button>
        </div>
      </teleport>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ModalButton',
    data() {
      return {
        modalOpen: false,
      };
    },
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped></style>
  