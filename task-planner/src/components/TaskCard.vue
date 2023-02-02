<template>
    <draggable tag="v-card" itemKey="name">
        <template #item="{ element: item }">
            <!-- <v-card
                width="400"
                title="This is a title"
                subtitle="This is a subtitle"
                text="This is content"
            >
                <v-progress-linear :indeterminate="true"></v-progress-linear>
            </v-card> -->
            HEllo
        </template>
    </draggable>
</template>

<script setup>
import draggable from 'vuedraggable'

</script>

