<script setup>
import { ref, onMounted } from 'vue'
import DataTable from '../components/DataTable.vue'
import { useCourse } from '../api'

const { fetchLatest } = useCourse()

const courses = ref([
  { name: '酸鹼中和 VR 實驗', startDate: '2026-03-10', spaceName: '實驗室 A', studentCount: 32, status: 'active' },
  { name: '人體解剖 VR 課程', startDate: '2026-03-11', spaceName: '實驗室 B', studentCount: 28, status: 'active' },
  { name: '氧化還原反應', startDate: '2026-03-12', spaceName: null, studentCount: 25, status: 'scheduled' }
])

const columns = [
  { key: 'name', label: '課程名稱' },
  { key: 'startDate', label: '日期' },
  { key: 'spaceName', label: '空間' },
  { key: 'studentCount', label: '人數' },
  { key: 'status', label: '狀態' }
]

onMounted(async () => {
  try {
    const data = await fetchLatest()
    if (data.courses?.length) courses.value = data.courses
  } catch (e) {
    // Use default mock data
  }
})
</script>

<template>
  <main class="page">
    <h2 class="page-title">課程管理</h2>

    <div class="card">
      <div class="card-header">
        <h3 class="card-title">課程列表</h3>
        <span class="badge badge-blue">共 {{ courses.length }} 門課程</span>
      </div>
      <DataTable :columns="columns" :data="courses">
        <template #name="{ value }">
          <strong>{{ value }}</strong>
        </template>
        <template #spaceName="{ value }">
          {{ value || '—' }}
        </template>
        <template #status="{ value }">
          <span class="badge" :class="value === 'active' ? 'badge-green' : 'badge-amber'">
            {{ value === 'active' ? '進行中' : '已排程' }}
          </span>
        </template>
      </DataTable>
    </div>
  </main>
</template>
