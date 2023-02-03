<template>
    <v-row justify="center">
        <v-dialog v-model="props.open" :max-width="800" persistent>
            <v-card>
                <v-card-title class="text-h5">
                    Are you sure that you want to delete this task?
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="$emit('close', true)">
                        Yes
                    </v-btn>
                    <v-btn color="green-darken-1" @click="$emit('close', false)">
                        No
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script setup>
const props = defineProps(['open'])
defineEmits(['close'])

</script>