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
                <h4>To-Do ({{ taskStore.toDo.length }}/{{
                    taskStore.size
                }})</h4>
                <div class="draggable-wrapper">

                    <draggable class="draggable-container" :ghostClass="`sortable-ghost`" :move="checkMove"
                        v-model="toDoTasks" itemKey="id" group="tasks" direction="vertical" :animation="150"
                        @drag="handleDrag" @start="startDrag" @end="endDrag">
                        <template #item="{ element, index }">
                            <TaskCard v-bind:style="{ 'top': 'calc(100px * ' + index + ')' }" :key="index"
                                :task="element" />

                        </template>
                    </draggable>
                    <div class="drag-preview" :style="dragStyle" ref="dragPreview"></div>

                </div>
            </v-col>
            <v-col cols="12" sm="4">
                <h4>In Progress ({{ taskStore.inProgress.length }}/{{
                    taskStore.size
                }})</h4>
                <div class="draggable-wrapper">
                    <draggable class="draggable-container" :ghostClass="`sortable-ghost`" :move="checkMove"
                        v-model="inProgressTasks" itemKey="id" direction="vertical" group="tasks" :animation="150"
                        @drag="handleDrag" @start="startDrag" @end="endDrag">
                        <template #item="{ element, index }">
                            <TaskCard v-bind:style="{ 'top': 'calc(100px * ' + index + ')' }" :key="index"
                                :task="element" />

                        </template>
                    </draggable>
                    <div class="drag-preview" :style="dragStyle" ref="dragPreview"></div>


                </div>
            </v-col>
            <v-col cols="12" sm="4">
                <h4>Completed ({{ taskStore.completed.length }}/{{
                    taskStore.size
                }})</h4>
                <div class="draggable-wrapper">
                    <draggable class="draggable-container" :ghostClass="`sortable-ghost`" :move="checkMove"
                        v-model="completedTasks" itemKey="id" direction="vertical" group="tasks" :animation="150"
                        @drag="handleDrag" @start="startDrag" @end="endDrag">
                        <template #item="{ element, index }">
                            <TaskCard v-bind:style="{ 'top': 'calc(100px * ' + index + ')' }" :key="index"
                                :task="element" />

                        </template>
                    </draggable>
                    <div class="drag-preview" :style="dragStyle" ref="dragPreview"></div>

                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import TaskCard from '@/components/TaskCard.vue'
import draggable from 'vuedraggable'
import { useTaskStore } from '@/store/task'
import { computed, reactive, ref, watch, onBeforeMount } from 'vue'

const taskStore = useTaskStore()

const drag = ref(false)
const search = ref('')
const range = ref([0, 24])
const dateJs = new Date()
const rangeMoved = ref(false)
const dragImage = ref()
const dragIndex = ref(0)
const dragPreview = ref()

const x = reactive(0)
const y = reactive(0)

const top = ref()
const left = ref()

watch(() => range.value, () => {
    rangeMoved.value = true
})

onBeforeMount(() => {
    let img = new Image()
    img.src = 'https://www.google.no/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
    dragImage.value = img
})

// Methods

const setCardHeight = (idx) => {
    console.log(idx)
    return "calc(100px * " + idx + ")"
}



// const setCardHeight = computed({
//     get() {
//         return "calc(100px * " + idx + ")"

//     }, 
//     set() {

//     }
// })

const handler = (dataTransfer) => {
    dataTransfer.setDragImage(dragImage.value, 0, 0)
}

// Check movement of draggable card
const checkMove = (evt) => {
    console.log(evt.draggedContext.futureIndex)
    console.log(evt.relatedContext.index)

}

const startDrag = (evt) => {
    dragPreview.value = evt.originalEvent.target.cloneNode(true)
    //   this.$refs["dragPreview"].appendChild(dragPreview);
    evt.originalEvent.dataTransfer.setDragImage(new Image(), 0, 0);
}

const endDrag = (evt) => {
    dragPreview.value.remove()
    dragPreview.value = null
}

const handleDrag = (evt) => {

}

const dragStyle = computed(() => {
    top.value = `${y}px`
    left.value = `${x}px`
})

const toDoTasks = computed({
    get() {
        if (search.value.length > 2 || rangeMoved.value == true) {
            return taskStore.toDo
                .filter(checkTime)
                .filter(tasks => ["title", "desc", "tags"].some(val => String(tasks[val]).toLowerCase().includes(search.value)))
        } else {
            return taskStore.toDo
        }
    },
    set(value) {
        let task = value.find((task) => task.status !== "To-Do")
        if (task) {
            taskStore.updateTaskStatus(task.id, task.status, 'To-Do')
        }
        taskStore.updateTaskList(value, 'To-Do')
    }
})
const inProgressTasks = computed({
    get() {
        if (search.value.length > 2) {
            return taskStore.inProgress
                .filter(checkTime)
                .filter(tasks => ["title", "desc", "tags"].some(val => String(tasks[val]).toLowerCase().includes(search.value)))
        } else {
            return taskStore.inProgress
        }
    },
    set(value) {
        let task = value.find((task) => task.status !== "In-Progress")
        if (task) {
            taskStore.updateTaskStatus(task.id, task.status, 'In-Progress')
        }
        taskStore.updateTaskList(value, 'In-Progress')

    }
})

// 
const completedTasks = computed({
    get() {
        if (search.value.length > 2) {
            return taskStore.completed
                .filter(checkTime)
                .filter(tasks => ["title", "desc", "tags"].some(val => String(tasks[val]).toLowerCase().includes(search.value)))
        } else {
            return taskStore.completed
        }
    },
    set(value) {
        let task = value.find((task) => task.status !== "Completed")
        if (task) {
            taskStore.updateTaskStatus(task.id, task.status, 'Completed')
        }
        taskStore.updateTaskList(value, 'Completed')


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

<style scoped lang="scss">
.drag-preview {
    position: absolute;
    transform: translateX(-50%) translateY(-50%) rotate(7deg) translateY(55%);
    z-index: 99999;
}

.sortable-ghost {
    border: 1px dashed grey;
    display: none;

    /* font-size: 0; */
    /* overflow: hidden; */
}

.sortable-chosen {
    cursor: grabbing;

    &:active {
        cursor: grabbing;
    }
}

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