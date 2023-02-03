<template>
  <div>
    <v-container>
      <ProgressBar />
      <TaskGrid />
    </v-container>
    <AddTask />

  </div>
</template>

<script setup>
import ProgressBar from '@/components/ProgressBar.vue'
import TaskGrid from '@/components/TaskGrid.vue'
import AddTask from '@/components/AddTask.vue'
</script>
