
<template>
    <v-banner class="progress__banner">
        <h2 class="mb-4 d-flex justify-center">Progress</h2>
        <v-progress-linear height="45" color="purple" :model-value="taskStore.tasks.length > 0 ? progress : 100">
            <template v-slot:default="{ value }">
                <strong class="progress__percent">{{ Math.ceil(value) }}% (Done {{ completedTasks }} out of {{
                    totalProgressTasks
                }})</strong>
            </template>
        </v-progress-linear>
    </v-banner>
</template>

<script setup>
import { useTaskStore } from '@/store/task'
import { computed } from 'vue';

const taskStore = useTaskStore()

// Computed
const completedTasks = computed(() => taskStore.tasks.get('completed').length)
const totalProgressTasks = computed(() => taskStore.tasks.length)
const progress = computed(() => (
    taskStore.tasks.filter((task) => task.status === 'Completed').length / taskStore.tasks.length
) * 100
)

</script>

<style lang="scss" scoped>
.progress {
    &__banner {
        border: 1px black solid;
        padding: 1.5rem 3rem;
    }

    &__percent {
        color: grey;
    }
}
</style>