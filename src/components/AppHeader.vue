<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../api'

const router = useRouter()
const { currentUser, logout } = useAuth()

const navItems = [
  { name: 'Dashboard', label: 'Dashboard', icon: '📊' },
  { name: 'Students', label: '學生歷程', icon: '🎓' },
  { name: 'Courses', label: '課程管理', icon: '📚' },
  { name: 'AI', label: 'AI 服務', icon: '🤖' }
]

function handleLogout() {
  logout()
  router.push('/login')
}
</script>

<template>
  <header class="app-header">
    <div class="header-left">
      <div class="app-logo">
        <div class="logo-icon">E</div>
        <span class="logo-text">EWova</span>
        <span class="logo-badge">Vue 3</span>
      </div>
      <nav class="nav-tabs">
        <router-link
          v-for="item in navItems"
          :key="item.name"
          :to="{ name: item.name }"
          class="nav-tab"
          active-class="active"
        >
          {{ item.label }}
        </router-link>
      </nav>
    </div>
    <div class="header-right">
      <span class="user-name">{{ currentUser.name }}</span>
      <div class="user-avatar">{{ currentUser.name?.[0] || '?' }}</div>
      <button class="logout-btn" @click="handleLogout">登出</button>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background: #fff;
  border-bottom: 1px solid var(--border);
  padding: 0 24px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-left, .header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.app-logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: var(--primary);
  color: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 14px;
}

.logo-text {
  font-weight: 700;
  font-size: 18px;
}

.logo-badge {
  padding: 2px 8px;
  background: #ede9fe;
  color: var(--primary);
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}

.nav-tabs {
  display: flex;
  gap: 2px;
  margin-left: 8px;
}

.nav-tab {
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.15s;
}

.nav-tab:hover { background: #f1f5f9; }
.nav-tab.active { background: var(--primary); color: #fff; }

.user-name { font-size: 14px; color: var(--text-secondary); }

.user-avatar {
  width: 32px;
  height: 32px;
  background: var(--primary-light);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
}

.logout-btn {
  padding: 6px 12px;
  font-size: 12px;
  color: var(--text-secondary);
  background: none;
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
}

.logout-btn:hover { border-color: #ef4444; color: #ef4444; }
</style>
