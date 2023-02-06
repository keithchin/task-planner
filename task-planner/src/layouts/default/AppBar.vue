<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-6" />

      Task Planner
    </v-app-bar-title>

    <v-btn :icon="theme.global.current.value.dark ? `mdi-weather-night` : `mdi-weather-sunny`"
      @click="toggleTheme"></v-btn>
  </v-app-bar>
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>
