<template>
  <div>
    <v-container>
      <ProgressBar />
      <TaskGrid />
    </v-container>
    <AddTask :open="open" />


  </div>
</template>

<script setup>
import ProgressBar from '@/components/ProgressBar.vue'
import TaskGrid from '@/components/TaskGrid.vue'
import AddTask from '@/components/AddTask.vue'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const open = ref(false)
const route = useRoute()
const router = useRouter()

watch(() => route, () => {
  if (route.params.uuid) {
    open.value = true;
  } else {
    open.value = false;
  }
})

watch(() => open, () => {
  if (open.value == false) {
    if (route.params.modal) {
      router.push('/')
    }
  }
})

</script>
