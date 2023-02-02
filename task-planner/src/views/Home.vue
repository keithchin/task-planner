<template>
    <v-container>
      <ProgressBar />
      <v-row no-gutters class="my-16">
        <v-col 
          cols="12"
          sm="4"
        >
            <TaskCard />
        </v-col>
        <v-col 
          cols="12"
          sm="4"
        >
            <TaskCard />
        </v-col>
        <v-col 
          cols="12"
          sm="4"
        >
            <TaskCard />
        </v-col>
      </v-row>
    </v-container>
</template>

<script setup>
  import ProgressBar from '@/components/ProgressBar.vue'
  import TaskCard from '@/components/TaskCard.vue'
</script>
