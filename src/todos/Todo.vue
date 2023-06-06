<template>
  <div>
    <!-- 新增todo  -->
    <EditTodo
      v-model:todo-title="newTodo"
      @keyup.enter="addTodo"
      autofocus
      placeholder="新增今日代办"
      autocomplete="off"
    >
    </EditTodo>

    <ul>
      <li
        v-for="todo of filteredTodos"
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
        <EditTodo
          class="edit"
          v-model:todo-title="todo.title"
          v-todo-focus="todo === editedTodo"
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          @keyup.escape="cancelEdit(todo)"
        >
        </EditTodo>
      </li>
    </ul>
    <!-- 过滤 -->
    <p class="filters">
      <span
        @click="visibility = 'all'"
        :class="{ selected: visibility === 'all' }"
        >All</span
      ><span
        @click="visibility = 'active'"
        :class="{ selected: visibility === 'active' }"
        >Actived</span
      ><span
        @click="visibility = 'compeleted'"
        :class="{ selected: visibility === 'compeleted' }"
        >Compelted</span
      >
    </p>
  </div>
</template>

<script>
import { reactive, toRefs, computed, watchEffect } from "vue";
// 筛选功能 - 指令集
const filters = {
  all(todos) {
    return todos;
  },
  active(todos) {
    return todos.filter((item) => !item.completed);
  },
  compeleted(todos) {
    return todos.filter((item) => item.completed);
  },
};
// 缓存操作 - 指令集
const todoStorage = {
  fetchTodos() {
    let todos = JSON.parse(localStorage.getItem("vue3-todos") || "[]");
    todos.forEach((item, index) => {
      item.id = index + 1;
    });
    return todos;
  },
  save(todos) {
    localStorage.setItem("vue3-todos", JSON.stringify(todos));
  },
};
export default {
  setup() {
    const state = reactive({
      newTodo: "",
      todos: todoStorage.fetchTodos(),
      beforeEditCache: "", // 缓存编辑前的内容
      editedTodo: null, // 正在编辑的项,
      visibility: "all",
      filteredTodos: computed(() => {
        return filters[state.visibility](state.todos);
      }),
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
    // 缓存数据
    watchEffect(() => {
      todoStorage.save(state.todos);
    });
    return {
      ...toRefs(state),
      addTodo,
      removeTodo,
      editTodo,
      cancelEdit,
      doneEdit,
    };
  },
  directives: {
    "todo-focus": (el, { value }) => {
      if (value) {
        el.focus();
      }
    },
  },
};
</script>

<style scoped>
.completed label {
  text-decoration: line-through;
}

.edit,
.editing .view {
  display: none;
}
.view,
.editing .edit {
  display: block;
}
.filters > span {
  padding: 2px 4px;
  margin-right: 4px;
  border: 1px solid transparent;
}
.filters > span.selected {
  border-color: rgba(117, 47, 32, 0.7);
}
</style>
