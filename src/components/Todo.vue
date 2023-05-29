<template>
  <div>
    <!-- 新增todo  -->
    <input
      type="text"
      v-model="newTodo"
      @keyup.enter="addTodo"
      autofocus
      placeholder="新增今日代办"
      autocomplete="off"
    />
    <ul>
      <li
        v-for="todo of todos"
        :key="todo.id"
        :class="{ completed: todo.completed, editing: todo === editedTodo }"
      >
        <!-- 绑定完成状态 -->
        <div class="view">
          <input type="checkbox" v-model="todo.completed" />
          <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
          <button @click="removeTodo(todo)">X</button>
        </div>
        <!-- 编辑代办 -->
        <input
          type="text"
          class="edit"
          v-model="todo.title"
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          @keyup.escape="cancelEdit(todo)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  setup() {
    const state = reactive({
      newTodo: "",
      todos: [],
      beforeEditCache: "", // 缓存编辑前的内容
      editedTodo: null, // 正在编辑的项
    });
    const addTodo = () => {
      state.todos.push({
        id: state.todos.length + 1,
        title: state.newTodo,
        completed: false,
      });
      state.newTodo = "";
    };
    const removeTodo = (todo) => {
      state.todos.splice(state.todos.indexOf(todo), 1);
    };
    function editTodo(todo) {
      state.beforeEditCache = todo.title;
      state.editedTodo = todo;
    }
    function cancelEdit(todo) {
      todo.title = state.beforeEditCache;
      state.editedTodo = null;
    }
    function doneEdit(todo) {
      state.editedTodo = null;
    }
    return {
      ...toRefs(state),
      addTodo,
      removeTodo,
      editTodo,
      cancelEdit,
      doneEdit
    };
  },
};
</script>

<style scoped>
.completed label {
  text-decoration: line-through;
}
</style>
