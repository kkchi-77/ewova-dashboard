<script setup>
import { ref, onMounted, nextTick } from 'vue'
import Chart from 'chart.js/auto'
import StatCard from '../components/StatCard.vue'
import DataTable from '../components/DataTable.vue'
import { useWallet, useChat, useModel3D } from '../api'

const { wallet, fetchBalance, fetchOrgTransactions } = useWallet()
const { fetchDailyLimit } = useChat()
const { fetchUserBalance } = useModel3D()

const aiLimit = ref({})
const modelBalance = ref({})
const transactions = ref([])
let usageChart = null

const txColumns = [
  { key: 'actionType', label: '動作' },
  { key: 'toUser', label: '對象' },
  { key: 'amount', label: '金額' }
]

onMounted(async () => {
  const [limitData, modelData, txData] = await Promise.all([
    fetchDailyLimit('dddd0001-0000-0000-0000-000000000001'),
    fetchUserBalance(),
    fetchOrgTransactions('aaaa0001-0000-0000-0000-000000000001'),
    fetchBalance()
  ])

  aiLimit.value = limitData
  modelBalance.value = modelData
  transactions.value = txData.transactions || []

  await nextTick()
  renderChart()
})

function renderChart() {
  const ctx = document.getElementById('usageChart')
  if (!ctx) return
  if (usageChart) usageChart.destroy()

  usageChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['AI 模型生成', 'AI 聊天', '剩餘額度'],
      datasets: [{
        data: [1800, 500, wallet.credits || 1500],
        backgroundColor: ['#6366f1', '#22c55e', '#e2e8f0'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { padding: 16, font: { size: 12 } } }
      }
    }
  })
}
</script>

<template>
  <main class="page">
    <h2 class="page-title">Dashboard</h2>

    <div class="stats-row">
      <StatCard label="錢包餘額" :value="wallet.credits" sub="EWova Credits" color="green" />
      <StatCard label="遊戲幣" :value="wallet.coins" sub="Wova Coin" color="amber" />
      <StatCard label="AI 今日剩餘" :value="aiLimit.remaining" :sub="`每日上限 ${aiLimit.dailyLimit || 20} 次`" />
      <StatCard label="AI 模型額度" :value="modelBalance.balance" :sub="`本月已用 ${modelBalance.monthlyUsed || 0}`" />
    </div>

    <div class="grid-2">
      <div class="card">
        <h3 class="card-title">消費統計</h3>
        <div class="chart-container">
          <canvas id="usageChart"></canvas>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">最近交易</h3>
        <DataTable :columns="txColumns" :data="transactions">
          <template #actionType="{ value }">
            <span class="badge" :class="value === 'allocate' ? 'badge-blue' : value === 'consume' ? 'badge-amber' : 'badge-green'">{{ value }}</span>
          </template>
          <template #amount="{ row }">
            <span class="tx-amount" :class="row.actionType === 'allocate' ? 'negative' : 'positive'">
              {{ row.actionType === 'allocate' ? '-' : '+' }}{{ row.amount }}
            </span>
          </template>
        </DataTable>
      </div>
    </div>
  </main>
</template>

<style scoped>
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.tx-amount { font-weight: 700; font-variant-numeric: tabular-nums; }
.tx-amount.positive { color: #22c55e; }
.tx-amount.negative { color: #ef4444; }

@media (max-width: 768px) {
  .stats-row { grid-template-columns: repeat(2, 1fr); }
}
</style>
