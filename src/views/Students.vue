<script setup>
import { ref, onMounted, nextTick } from 'vue'
import Chart from 'chart.js/auto'
import DataTable from '../components/DataTable.vue'
import ProgressBar from '../components/ProgressBar.vue'

const sheets = ref([
  { userName: '陳小明', progress: 71 },
  { userName: '王美玲', progress: 43 },
  { userName: '劉建宏', progress: 100 },
  { userName: '林雅婷', progress: 29 }
])

const members = ref([
  { name: '沈家豪', role: 'Student' },
  { name: '林志明', role: 'Teacher' },
  { name: '陳小明', role: 'Student' },
  { name: '王美玲', role: 'Student' },
  { name: '劉建宏', role: 'Student' },
  { name: '林雅婷', role: 'Student' }
])

const sheetColumns = [
  { key: 'userName', label: '學生' },
  { key: 'progress', label: '進度' },
  { key: 'pct', label: '%' },
  { key: 'status', label: '狀態' }
]

const memberColumns = [
  { key: 'name', label: '姓名' },
  { key: 'role', label: '角色' }
]

let progressChart = null

onMounted(async () => {
  await nextTick()
  renderChart()
})

function renderChart() {
  const ctx = document.getElementById('progressChart')
  if (!ctx) return
  if (progressChart) progressChart.destroy()

  progressChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sheets.value.map(s => s.userName),
      datasets: [{
        label: '完成度 %',
        data: sheets.value.map(s => s.progress),
        backgroundColor: sheets.value.map(s =>
          s.progress === 100 ? '#22c55e' : s.progress > 50 ? '#6366f1' : '#f59e0b'
        ),
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true, max: 100, ticks: { callback: v => v + '%' } } },
      plugins: { legend: { display: false } }
    }
  })
}

function statusLabel(p) {
  if (p === 100) return '已完成'
  if (p > 50) return '進行中'
  return '學習中'
}

function statusClass(p) {
  if (p === 100) return 'badge-green'
  if (p > 50) return 'badge-blue'
  return 'badge-amber'
}
</script>

<template>
  <main class="page">
    <h2 class="page-title">學生學習歷程</h2>

    <div class="card">
      <div class="card-header">
        <h3 class="card-title">歷程表列表</h3>
        <span class="badge badge-purple">Project: VR 化學實驗模擬</span>
      </div>
      <DataTable :columns="sheetColumns" :data="sheets">
        <template #userName="{ value }">
          <strong>{{ value }}</strong>
        </template>
        <template #progress="{ row }">
          <ProgressBar :value="row.progress" />
        </template>
        <template #pct="{ row }">
          <span style="font-weight:700;font-variant-numeric:tabular-nums">{{ row.progress }}%</span>
        </template>
        <template #status="{ row }">
          <span class="badge" :class="statusClass(row.progress)">{{ statusLabel(row.progress) }}</span>
        </template>
      </DataTable>
    </div>

    <div class="grid-2">
      <div class="card">
        <h3 class="card-title">進度分布</h3>
        <div class="chart-container">
          <canvas id="progressChart"></canvas>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">組織成員</h3>
        <DataTable :columns="memberColumns" :data="members">
          <template #name="{ value }">
            <strong>{{ value }}</strong>
          </template>
          <template #role="{ value }">
            <span class="badge" :class="value === 'Teacher' ? 'badge-purple' : 'badge-blue'">{{ value }}</span>
          </template>
        </DataTable>
      </div>
    </div>
  </main>
</template>
