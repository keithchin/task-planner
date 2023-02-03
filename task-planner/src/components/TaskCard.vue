<template>

    <v-card>
        <ul>
            <li>Title</li>
            <span>{{ props.task.title }}</span>
            <li>Description</li>
            <span>{{ props.task.desc }}</span>
            <li>Estimated Time</li>
            <span>{{ props.task.date }}</span>
        </ul>
    </v-card>
</template>

<script setup>
import draggable from 'vuedraggable'
import { ref } from 'vue'

const props = defineProps(['task'])

</script>

