<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import { useAuth } from './api'

const router = useRouter()
const { isLoggedIn } = useAuth()
const showHeader = computed(() => isLoggedIn.value && router.currentRoute.value.name !== 'Login')
</script>

<template>
  <AppHeader v-if="showHeader" />
  <router-view />
</template>
