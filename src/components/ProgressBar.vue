<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, default: 0 }
})

const colorClass = computed(() => {
  if (props.value === 100) return 'green'
  if (props.value > 50) return 'primary'
  if (props.value > 25) return 'amber'
  return 'red'
})
</script>

<template>
  <div class="progress-bar">
    <div class="progress-fill" :class="colorClass" :style="{ width: value + '%' }"></div>
  </div>
</template>

<style scoped>
.progress-bar {
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.6s ease;
}

.progress-fill.green { background: #22c55e; }
.progress-fill.primary { background: var(--primary); }
.progress-fill.amber { background: #f59e0b; }
.progress-fill.red { background: #ef4444; }
</style>
