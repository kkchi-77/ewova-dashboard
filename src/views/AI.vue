<script setup>
import { ref, onMounted, nextTick } from 'vue'
import Chart from 'chart.js/auto'
import StatCard from '../components/StatCard.vue'
import ChatList from '../components/ChatList.vue'
import { useChat, useModel3D } from '../api'

const { fetchSessions, fetchDailyLimit } = useChat()
const { fetchUserBalance } = useModel3D()

const aiLimit = ref({})
const modelBalance = ref({})
const chatSessions = ref([])
let modelChart = null

onMounted(async () => {
  const [limitData, modelData, sessionData] = await Promise.all([
    fetchDailyLimit('dddd0001-0000-0000-0000-000000000001'),
    fetchUserBalance(),
    fetchSessions('dddd0001-0000-0000-0000-000000000001')
  ])

  aiLimit.value = limitData
  modelBalance.value = modelData
  chatSessions.value = sessionData.sessions || []

  await nextTick()
  renderChart()
})

function renderChart() {
  const ctx = document.getElementById('modelChart')
  if (!ctx) return
  if (modelChart) modelChart.destroy()

  modelChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['3/7', '3/8', '3/9', '3/10', '3/11', '3/12', '3/13'],
      datasets: [{
        label: 'AI 模型生成次數',
        data: [3, 5, 2, 8, 4, 6, 10],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99,102,241,0.1)',
        fill: true,
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#6366f1'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true } },
      plugins: { legend: { display: false } }
    }
  })
}
</script>

<template>
  <main class="page">
    <h2 class="page-title">AI 服務</h2>

    <div class="stats-row-3">
      <StatCard label="今日 AI 剩餘問答" :value="`${aiLimit.remaining ?? '—'} / ${aiLimit.dailyLimit || 20}`" />
      <StatCard label="3D 模型額度" :value="modelBalance.balance" :sub="`累計使用 ${modelBalance.allTimeUsed || 0}`" color="primary" />
      <StatCard label="本月 3D 模型生成" :value="modelBalance.monthlyUsed" color="amber" />
    </div>

    <div class="grid-2">
      <div class="card">
        <h3 class="card-title">AI 對話紀錄</h3>
        <ChatList :sessions="chatSessions" />
      </div>

      <div class="card">
        <h3 class="card-title">AI 模型生成趨勢</h3>
        <div class="chart-container">
          <canvas id="modelChart"></canvas>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.stats-row-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .stats-row-3 { grid-template-columns: 1fr; }
}
</style>
