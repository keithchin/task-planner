<template>
    <div>
        <v-card class="px-6 py-8">
            <div class="d-flex justify-end">
                <RouterLink :to="props.task.id" @click="showTaskModal = true">
                    <v-icon class="task-card__icon px-4" icon="mdi-pencil"></v-icon>
                </RouterLink>
                <v-icon @click="openModal = true" class="task-card__icon px-4" icon="mdi-delete-forever"></v-icon>
            </div>
            <ul>
                <li>Title</li>
                <span>{{ props.task.title }}</span>
                <li>Description</li>
                <span>{{ props.task.desc }}</span>
                <li>Estimated Time</li>
                <span>{{ props.task.date }}</span>
            </ul>
        </v-card>
        <DeleteTask :open="openModal" @close="closeModal" />
    </div>
</template>

<script setup>
import DeleteTask from '@/components/DeleteTask.vue'
import { ref } from 'vue'
import { useTaskStore } from '@/store/task'

const props = defineProps(['task'])
// const emits = defineEmits(['showTaskModal'])
const taskStore = useTaskStore()

const openModal = ref(false)
const closeModal = (value) => {
    openModal.value = false
    if (value == true) {
        taskStore.deleteTask(props.task.id)
    }
}

// watchEffect(() => )

// const deleteTask = (id) => {
//     taskStore.deleteTask(id)
// }

</script>

<style scoped lang="scss">
.task-card {
    &__icon {
        cursor: pointer;

        &:hover {
            opacity: 0.7;
        }
    }
}
</style>

