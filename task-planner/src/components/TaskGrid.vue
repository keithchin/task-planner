<template>
    <v-row class="my-16">
        <v-col cols="12" sm="4">
            <h4>To-Do</h4>
            <template v-for="(todo, index) in toDoTasks" :key="`todo_` + index">
                <draggable #item="" v-model="toDoTasks" :animation="150" @start="log" @end="log" @change="log">
                    <TaskCard :task="todo" />
                </draggable>
            </template>
        </v-col>
        <v-col cols="12" sm="4">
            <h4>In Progress</h4>
            <draggable v-for="(ip, index) in inProgressTasks" :itemKey="`ip_` + index" #item=""
                v-model="inProgressTasks" :animation="150" @start="log" @end="log" @change="log">
                <TaskCard :task="ip" />
            </draggable>

        </v-col>
        <v-col cols="12" sm="4">
            <h4>Completed</h4>
            <template v-for="(comp, index) in completedTasks" :key="`comp_` + index">
                <draggable #item="" v-model="completedTasks" :animation="150" @start="log" @end="log" @change="log">
                    <TaskCard :task="comp" />
                </draggable>
            </template>
        </v-col>
    </v-row>
</template>

<script setup>
import TaskCard from '@/components/TaskCard.vue'
import draggable from 'vuedraggable'
import { useTaskStore } from '@/store/task'
import { computed, ref } from 'vue'

const taskStore = useTaskStore()
const toDoTasks = computed({
    get() {
        return taskStore.tasks.filter((task) => task.status === 'To-Do')
    },
    set(value) {
        taskStore.updateTaskStatus(value)
    }
})
const inProgressTasks = computed({
    get() {
        return taskStore.tasks.filter((task) => task.status === 'In-Progress')
    },
    set(value) {
        taskStore.updateTaskStatus(value)
    }
})
const completedTasks = computed({
    get() {
        return taskStore.tasks.filter((task) => task.status === 'Completed')
    },
    set(value) {
        taskStore.updateTaskStatus(value)
    }
})

const log = (event) => {
    // console.log(event)
}


</script>