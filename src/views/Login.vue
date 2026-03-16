<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../api'

const router = useRouter()
const { login } = useAuth()

const form = reactive({ email: 'demo@ewova.com', password: 'demo1234' })
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  loading.value = true
  error.value = ''
  try {
    await login(form.email, form.password)
    router.push('/')
  } catch (e) {
    error.value = e.message || '連線失敗，請確認 Mock Server 是否啟動'
  }
  loading.value = false
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <div class="logo-icon">E</div>
        <div>
          <h1>EWova Dashboard</h1>
          <p>學習歷程管理儀表板</p>
        </div>
      </div>

      <div v-if="error" class="login-error">{{ error }}</div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input class="form-input" type="email" v-model="form.email" placeholder="輸入 Email" required>
        </div>
        <div class="form-group">
          <label>密碼</label>
          <input class="form-input" type="password" v-model="form.password" placeholder="輸入密碼" required>
        </div>
        <button class="btn-login" type="submit" :disabled="loading">
          {{ loading ? '登入中...' : '登入' }}
        </button>
      </form>

      <div class="login-hint">
        Mock 測試帳號：<code>demo@ewova.com</code> / <code>demo1234</code>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  background: #fff;
  border-radius: 16px;
  padding: 40px;
  width: 400px;
  box-shadow: 0 25px 50px rgba(0,0,0,0.15);
}

.login-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.login-header h1 { font-size: 22px; margin: 0; }
.login-header p { font-size: 14px; color: var(--text-secondary); margin: 0; }

.logo-icon {
  width: 40px;
  height: 40px;
  background: var(--primary);
  color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 18px;
  flex-shrink: 0;
}

.login-error {
  background: #fef2f2;
  color: #dc2626;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  margin-bottom: 16px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.form-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.form-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
}

.btn-login {
  width: 100%;
  padding: 12px;
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-login:hover { background: #4f46e5; }
.btn-login:disabled { opacity: 0.6; cursor: not-allowed; }

.login-hint {
  margin-top: 16px;
  padding: 12px;
  background: #f0fdf4;
  border-radius: 8px;
  font-size: 12px;
  color: #166534;
}

.login-hint code {
  background: #dcfce7;
  padding: 1px 4px;
  border-radius: 3px;
}
</style>
