// Utilities
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'


export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: useStorage('tasks', [])
    // tasks: []
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

    updateTask(task) {
      let taskToUpdate = this.tasks.find(t => t.id == task.id)
      taskToUpdate = task
      taskToUpdate.id = task.id
      this.deleteTask(task.id)
      this.addTask(taskToUpdate)
    },

    updateTaskStatus(id, status) {
      let taskToUpdate = this.tasks.find(t => t.id == id)
      taskToUpdate.status = status
    }
  },
})
