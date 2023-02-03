// Utilities
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'


export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: useStorage('tasks', [])
  }),
  getters: {
    inProgressTasks(state) {
      return state.tasks.filter((task) => task.status === 'In Progress')
    },
    toDoTasks(state) {
      return state.tasks.filter((task) => task.status === 'To Do')
    },
    completedTasks(state) {
      return state.tasks.filter((task) => task.status === 'Completed')
    }
  },
  actions: {
    addTask(task) {
      this.tasks.push(task)
    },

    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id)
    },

    updateTaskStatus(task) {
      console.log(task)
    }
  },
})
