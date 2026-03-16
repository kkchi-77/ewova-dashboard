<script setup>
defineProps({
  label: String,
  value: [String, Number],
  sub: String,
  color: { type: String, default: '' }
})
</script>

<template>
  <div class="stat-card">
    <div class="stat-label">{{ label }}</div>
    <div class="stat-value" :class="color">{{ value ?? '—' }}</div>
    <div class="stat-sub" v-if="sub">{{ sub }}</div>
  </div>
</template>

<style scoped>
.stat-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
}

.stat-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 6px;
}

.stat-value {
  font-size: 28px;
  font-weight: 800;
}

.stat-value.green { color: #22c55e; }
.stat-value.amber { color: #f59e0b; }
.stat-value.primary { color: var(--primary); }

.stat-sub {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 4px;
}
</style>
