<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" scrollable>
            <template v-slot:activator="{ props }">

                <v-btn v-bind="props" icon="mdi-plus" color="primary" class="add-task"></v-btn>
            </template>
            <v-card>
                <form @submit.prevent="submit">
                    <v-container>
                        <h2 class="mb-4">What would you like to achieve?</h2>
                        <v-text-field v-model="title.value.value" :counter="50"
                            :error-messages="title.errorMessage.value" label="Title"></v-text-field>

                        <v-textarea v-model="desc.value.value" :counter="500" :error-messages="desc.errorMessage.value"
                            label="Description"></v-textarea>
                        <v-row>
                            <v-col sm="4" v-for="(file, index) in files" :key="`file_` + index">
                                <v-card class="d-flex flex-column">
                                    <v-btn @click.prevent="deleteFile(file)" icon="mdi-delete-forever" color="error"
                                        class="file-delete-button">
                                    </v-btn>
                                    <img :ref="'fileUploaded'"
                                        src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                                        class="img-fluid" style="max-width: 100%;height: 200px;"
                                        :title="'file' + index" />
                                    <div class="px-4 py-4">
                                        {{ file.name }}
                                    </div>
                                </v-card>
                            </v-col>
                        </v-row>
                        <div class="d-flex mt-8">
                            <v-file-input v-model="files" multiple chips label="File input"
                                @change="uploadFile"></v-file-input>
                            <!-- <v-btn @change="uploadFile">Upload</v-btn> -->
                        </div>

                        <v-select v-model="select.value.value" :items="items"
                            :error-messages="select.errorMessage.value" label="Select board to assign task to">
                        </v-select>

                        <Datepicker class="mb-4" v-model="date.value.value" time-picker
                            :error-messages="date.errorMessage.value" placeholder="Select Time">
                        </Datepicker>
                        <span>{{ date.errorMessage.value }}</span>
                        <input v-model="date.value.value" v-show="false" v-validate="'required'" />
                        <v-combobox v-model="tags.value.value" multiple label="Add some labels or tags" :items="[]"
                            chips></v-combobox>

                        <v-btn class="me-4" type="submit">
                            submit
                        </v-btn>

                        <v-btn @click="reset">
                            clear
                        </v-btn>
                    </v-container>
                </form>
            </v-card>
        </v-dialog>
    </v-row>

</template>

<script setup>
import { v4 as uuidv4 } from 'uuid';
import { ref, watchEffect, onBeforeMount } from 'vue'
import { useTaskStore } from '@/store/task'
import { useField, useForm } from 'vee-validate'

// Refs

const files = ref([])
const fileUploaded = ref()
const readers = ref([])
const dialog = ref(false)
const dateJs = new Date()


// props
const props = defineProps(['open'])

// Before Mounting
onBeforeMount(() => {
    date.value.value = {
        hours: dateJs.getHours() + 1,
        minutes: dateJs.getMinutes(),
    }
})


// Store functions 
const taskStore = useTaskStore()

// Watchers
watchEffect(() => dialog.value = props.open);


// Delete file
const deleteFile = (file) => {
    files.value = files.value.filter((f) => f.name !== file.name)
}

// Upload file
const uploadFile = () => {
    files.value.forEach((file, f) => {
        readers.value[f] = new FileReader();
        if (file.type.includes("image")) {
            readers.value[f].onloadend = (e) => {
                let fileData = readers.value[f].result
                let imgRef = fileUploaded.value[f]
                imgRef.src = fileData
            }
        }

        readers.value[f].readAsDataURL(files.value[f]);
    })
}

const task = ref({
    title: '',
    desc: '',
    files: [],
    date: null,
    status: '',
    tags: [],
})


// Form functions
const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        title(value) {
            if (value?.length >= 2 && value?.length < 50) return true
            else if (value || value?.length < 2) {
                return 'Title needs to be at least 2 characters.'
            } else {
                return 'Title cannot exceed more than 50 characters.'

            }
        },
        desc(value) {
            if (value?.length < 500) return true
            return 'Description cannot exceed more than 500 characters.'


        },

        select(value) {
            if (value) return true

            return 'Select an item.'
        },

        date(value) {
            if (value) return true
            return 'Select a date.'
        },
        // checkbox(value) {
        //     if (value === '1') return true

        //     return 'Must be checked.'
        // },

        tags(value) {
            return true
        }
    },



})
const title = useField('title')
const desc = useField('desc')
const select = useField('select')
const date = useField('date')
const tags = useField('combobox')
const items = ref([
    'To-Do',
    'In-Progress',
    'Completed',
])

const submit = handleSubmit(values => {
    task.value = {
        id: uuidv4(),
        title: values.title,
        desc: values.desc,
        status: values.select,
        date: values.date,
        tags: values.combobox,
        files: files.value,
    }
    taskStore.addTask(task.value)
    handleReset()
    files.value = []
    dialog.value = false
})

const reset = () => {
    handleReset()
    files.value = []
}


</script>

<style scoped>
.add-task {
    position: fixed;
    right: 25px;
    bottom: 25px;
}

.file-delete-button {
    position: absolute;
    z-index: 999999;
    margin-left: 0.5rem;
    margin-top: 0.5rem;
}
</style>