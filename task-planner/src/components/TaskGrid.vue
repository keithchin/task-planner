<template>
    <div>
        <!-- <div class="d-flex mx-4 mt-4 flex-column justify-end search-filter-bar">
            <h4 class="mb-4">Search / Filter Time</h4>
            <v-text-field v-model="search" label="Search a task (e.g. title, description, tags)">

            </v-text-field>
            <v-range-slider v-model="range" :min="0" :max="24" :step="1" thumb-label="always">
                <template v-slot:thumb-label="{ modelValue }" style="d-flex">
                    {{ modelValue > 1 ? modelValue + ' hours' : modelValue + ' hour'}}
                </template>
            </v-range-slider>
        </div> -->
        <v-row class="my-16">
            <v-col cols="12" sm="4">
                <h4>To-Do ({{ taskStore.tasks.filter((task) => task.status === 'To-Do').length }}/{{
                    taskStore.tasks.length
                }})</h4>
                <div class="draggable-wrapper">

                    <draggable class="draggable-container" :move="checkMove" v-model="toDoTasks" itemKey="id" group="tasks" 
                        :animation="150" @start="startDrag" @end="drag =  false">
                        <template #item="{ element, index }">
                            <TaskCard v-bind:style="{'top': setCardHeight(index)}" :task="element" />

                        </template>
                    </draggable>
                </div>
            </v-col>
            <v-col cols="12" sm="4">
                <h4>In Progress ({{ taskStore.tasks.filter((task) => task.status === 'In-Progress').length }}/{{
                    taskStore.tasks.length
                }})</h4>
                <div class="draggable-wrapper">
                    <draggable class="draggable-container" :move="checkMove"  v-model="inProgressTasks" itemKey="id" group="tasks" :animation="150" @start="startDrag" @end="drag =  false" 
                         >
                        <template #item="{ element, index }">
                            <TaskCard v-bind:style="{'top': setCardHeight(index)}" :task="element" />

                        </template>
                    </draggable>

                </div>
            </v-col>
            <v-col cols="12" sm="4">
                <h4>Completed ({{ taskStore.tasks.filter((task) => task.status === 'Completed').length }}/{{
                    taskStore.tasks.length
                }})</h4>
                <div class="draggable-wrapper">
                    <draggable class="draggable-container" :move="checkMove"  v-model="completedTasks" itemKey="id" group="tasks" :animation="150" @start="startDrag" @end="drag =  false" 
                        >
                        <template #item="{ element, index }">
                            <TaskCard v-bind:style="{'top': setCardHeight(index)}" :task="element" />

                        </template>
                    </draggable>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import TaskCard from '@/components/TaskCard.vue'
import draggable from 'vuedraggable'
import { useTaskStore } from '@/store/task'
import { computed, ref, watch, onBeforeMount } from 'vue'

const taskStore = useTaskStore()

const drag = ref(false)
const search = ref('')
const range = ref([0, 24])
const dateJs = new Date()
const rangeMoved = ref(false)
const dragImage = ref()
const dragIndex = ref(0)

watch(() => range.value, () => {
    rangeMoved.value = true
})

onBeforeMount(() => {
    let img = new Image()
    img.src = 'https://www.google.no/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
    dragImage.value = img
})

// Methods

const setCardHeight = (idx) => { return "calc(100px * " + idx + ")"}

const handler = (dataTransfer) => {
    dataTransfer.setDragImage(dragImage.value, 0, 0)
}

// Check movement of draggable card
const checkMove = (evt) => {
    console.log(evt.draggedContext.futureIndex)
    console.log(evt.relatedContext.index)

}

const startDrag = (evt) => {
    console.log(evt)
}

const toDoTasks = computed({
    get() {
        if (search.value.length > 2 || rangeMoved.value == true) {
            return taskStore.tasks.filter((task) => task.status === 'To-Do')
                .filter(checkTime)
                .filter(tasks => ["title", "desc", "tags"].some(val => String(tasks[val]).toLowerCase().includes(search.value)))
        } else {
            return taskStore.tasks.filter((task) => task.status === 'To-Do')
        }
    },
    set(value) {
        let task = value.find((task) => task.status !== "To-Do")
        if (task) {
            console.log(value)
            taskStore.updateTaskStatus(task.id, 'To-Do')
        }
    }
})
const inProgressTasks = computed({
    get() {
        if (search.value.length > 2) {
            return taskStore.tasks.filter((task) => task.status === 'In-Progress')
                .filter(checkTime)
                .filter(tasks => ["title", "desc", "tags"].some(val => String(tasks[val]).toLowerCase().includes(search.value)))
        } else {
            return taskStore.tasks.filter((task) => task.status === 'In-Progress')
        }
    },
    set(value) {
        let task = value.find((task) => task.status !== "In-Progress")
        if (task) {
            console.log(value)
            taskStore.updateTaskStatus(task.id, 'In-Progress')
        }
    }
})

// 
const completedTasks = computed({
    get() {
        if (search.value.length > 2) {
            return taskStore.tasks.filter((task) => task.status === 'Completed')
                .filter(checkTime)
                .filter(tasks => ["title", "desc", "tags"].some(val => String(tasks[val]).toLowerCase().includes(search.value)))
        } else {
            return taskStore.tasks.filter((task) => task.status === 'Completed')
        }
    },
    set(value) {
        let task = value.find((task) => task.status !== "Completed")

        if (task) {
            taskStore.updateTaskStatus(task.id, 'Completed')
        }

    }
})

const checkTime = (task) => {
    if (task.date.hours < dateJs.getHours()) {
        if (24 - dateJs.getHours() + task.date.hours > range.value[0] && (24 - dateJs.getHours() + task.date.hours < range.value[1])) {
            return task
        }
    } else {
        if (task.date.hours - dateJs.getHours() > range.value[0] && task.date.hours - dateJs.getHours() < range.value[1]) {
            return task
        }

    }
}

</script>

<style scoped>
.draggable-wrapper {
    min-height: 800px;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 1rem;
    border: 1px gray solid;
}

.draggable-container {
    position: relative;
}

.search-filter-bar {
    max-width: 400px;
}

.ghost-class {
    top: 200px;
}
</style>