<template>
    <v-row class="my-16">
        <v-col cols="12" sm="4">
            <h4>To-Do</h4>
            <TaskCard v-for="(todo, index) in taskStore.toDoTasks" :key="`todo_` + index" :task="todo" />
        </v-col>
        <v-col cols="12" sm="4">
            <h4>In Progress</h4>
            <TaskCard v-for="(ip, index) in taskStore.inProgressTasks" :key="`ip_` + index" :task="ip" />
        </v-col>
        <v-col cols="12" sm="4">
            <h4>Completed</h4>
            <TaskCard v-for="(comp, index) in taskStore.completedTasks" :key="`comp_` + index" :task="comp" />
        </v-col>
    </v-row>
</template>

<script setup>
import TaskCard from '@/components/TaskCard.vue'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/store/task'
import { watch } from 'vue'

const taskStore = useTaskStore()
const { toDoTasks, inProgressTasks, completedTasks } = storeToRefs(taskStore)

watch(toDoTasks, () => {
    console.log('toDoTasks changed', taskStore.toDoTasks)
})

watch(inProgressTasks, () => {
    console.log('inProgressTasks changed', taskStore.inProgressTasks)
})

watch(completedTasks, () => {
    console.log('completedTasks changed', taskStore.completedTasks)
})


</script>