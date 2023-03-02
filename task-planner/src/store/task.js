// Utilities
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'


export const useTaskStore = defineStore('task', {
  state: () => ({
    inProgress: useStorage('inProgressTasks', []),
    toDo: useStorage('toDoTasks', []),
    completed: useStorage('completedTasks', [])
    // tasks: useStorage('tasks', {
    //   inProgress: [],
    //   toDo: [],
    //   completed: []
    // })
  }),
  getters: {
    inProgressTasks(state) {
      return state.inProgress
    },
    toDoTasks(state) {
      return state.toDo
    },
    completedTasks(state) {
      return state.completed
    },
    size(state) {
      return state.inProgress.length + state.toDo.length + state.completed.length
    }
  },
  actions: {
    addTask(task, status) {
      if (status == 'To-Do') {
        this.toDo.push(task)
      } else if (status == 'In-Progress') {
        this.inProgress.push(task)
      } else {
        this.completed.push(task)
      }
    },

    deleteTask(id, status) {
      if (status == 'To-Do') {
        this.toDo = this.toDo.filter(task => task.id !== id)
      } else if (status == 'In-Progress') {
        this.inProgress = this.inProgress.filter(task => task.id !== id)
      } else {
        this.completed = this.completed.filter(task => task.id !== id)
      }
    },

    updateTask(task, status) {
      let taskToUpdate = []
      if (status == 'To-Do') {
        taskToUpdate = this.toDo.find(t => t.id == task.id)
      } else if (status == 'In-Progress') {
        taskToUpdate = this.inProgress.find(t => t.id == task.id)
      } else {
        taskToUpdate = this.completed.find(t => t.id == task.id)
      }
      taskToUpdate = task
      taskToUpdate.id = task.id
      this.deleteTask(task.id, status)
      this.addTask(taskToUpdate, status)
    },

    updateTaskStatus(id, oldStatus, newStatus) {
      let taskToUpdate
      if (oldStatus == 'To-Do') {
        taskToUpdate = this.toDo.find(t => t.id == id)
      } else if (oldStatus == 'In-Progress') {
        taskToUpdate = this.inProgress.find(t => t.id == id)
      } else {
        taskToUpdate = this.completed.find(t => t.id == id)
      }
      taskToUpdate.status = newStatus
      this.deleteTask(taskToUpdate.id, oldStatus)

    },

    updateTaskList(list, status) {
      if (status == 'To-Do') {
        this.toDo = list
      } else if (status == 'In-Progress') {
        this.inProgress = list
      } else {
        this.completed = list
      }
    }
  },
})
