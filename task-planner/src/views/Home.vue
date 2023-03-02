<template>
  <div>
    <v-container>
      <!-- <ProgressBar /> -->
      <TaskGrid />
    </v-container>
    <AddTask :open="open" />
    <template v-if="is_edit">
      <EditTask :open="is_edit" :taskId="taskId" @close="closeModal" />

    </template>
  </div>
</template>

<script setup>
import ProgressBar from '@/components/ProgressBar.vue'
import TaskGrid from '@/components/TaskGrid.vue'
import AddTask from '@/components/AddTask.vue'
import EditTask from '@/components/EditTask.vue'

import { ref, watch, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const open = ref(false)
const is_edit = ref(false)
const taskId = ref()

const route = useRoute()
const router = useRouter()

// Before mounting
onBeforeMount(() => {
  if (route.params.taskId) {
    is_edit.value = true;
    taskId.value = route.params.taskId
  }
})

// Watchers 
watch(() => route.params, () => {
  if (route.params.taskId) {
    taskId.value = route.params.taskId
    is_edit.value = true;
  } else {
    is_edit.value = false;
  }
})

watch(() => is_edit, () => {
  if (is_edit.value == false) {
    if (route.params.taskId) {
      taskId.value = ''
      router.push('/')
    }
  }
})

const closeModal = () => {
  router.push('/')
}

</script>
