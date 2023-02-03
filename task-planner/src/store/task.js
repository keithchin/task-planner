// Utilities
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
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
      console.log("adding task..")
      this.tasks.push(task)
    }
  }
})
