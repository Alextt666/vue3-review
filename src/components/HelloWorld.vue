<template>
  <!-- <Composition></Composition>
  <ModalButton></ModalButton> -->
</template>

<script>
import Composition from './Composition.vue';
import ModalButton from './ModalButton.vue';
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  components: {
    Composition,
    ModalButton,
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
