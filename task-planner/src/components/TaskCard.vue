<template>
    <div>
        <v-card :title="props.task.title" variant="outlined" class=" py-4 my-4">
            <template v-slot:title>
                <div class="d-flex justify-space-between">
                    <h3>{{ props.task.title }}</h3>
                    <div class="d-flex justify-end">
                        <RouterLink :to="props.task.id" @click="editModal = true">
                            <v-icon class="task-card__icon px-4" icon="mdi-pencil"></v-icon>
                        </RouterLink>
                        <v-icon @click="openModal = true" class="task-card__icon px-4"
                            icon="mdi-delete-forever"></v-icon>
                    </div>
                </div>
            </template>
            <template v-slot:subtitle>
                <v-chip v-for="(tag, index) in props.task.tags">
                    {{ tag }}
                </v-chip>
            </template>
            <div class="d-flex flex-column px-4">
                <span class="task-card__title">Title: </span>
                <span>{{ props.task.title }}</span>
                <span class="task-card__title">Description: </span>
                <span>{{ props.task.desc }}</span>
                <span class="task-card__title">Estimated Time: </span>
                <span>{{
                    props.task.date.hours < date.getHours() ? 24 - date.getHours() + props.task.date.hours :
                        props.task.date.minutes > date.getMinutes() ? props.task.date.hours - date.getHours() :
                            props.task.date.hours - date.getHours() - 1
                }} hours and {{
    props.task.date.minutes > date.getMinutes() ?
        props.task.date.minutes -
        date.getMinutes() :
        60 - date.getMinutes() + props.task.date.minutes
}} minutes remaining</span>
                <span v-if="props.task.comments" class="task-card__title">Comments: </span>
                <span class="task-card__comments"> {{ props.task.comments }}</span>
            </div>
        </v-card>
        <DeleteTask :open="openModal" @close="closeModal" />
    </div>
</template>

<script setup>
import DeleteTask from '@/components/DeleteTask.vue'
import { ref, onBeforeMount } from 'vue'
import { useTaskStore } from '@/store/task'

const props = defineProps(['task'])
const taskStore = useTaskStore()
const date = new Date()

// Refs
const openModal = ref(false)

const closeModal = (value) => {
    openModal.value = false
    if (value == true) {
        taskStore.deleteTask(props.task.id)
    }
}

</script>

<style scoped lang="scss">
.task-card {
    &__icon {
        cursor: pointer;

        &:hover {
            opacity: 0.7;
        }
    }

    &__title {
        color: grey;
    }

    &__comments {
        color: grey;
        font-style: italic;
        font-size: 12px;
    }
}
</style>

