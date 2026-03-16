import { ref, reactive } from 'vue'

// ===== Auth State (Global Singleton) =====
const isLoggedIn = ref(false)
const currentUser = reactive({ name: '', role: '', guid: '' })
let authToken = ''

export function useAuth() {
  async function login(email, password) {
    const res = await apiPost('/api/login', { email, password })
    if (res.token) {
      authToken = res.token
      currentUser.name = res.user?.name || '沈家豪'
      currentUser.role = res.user?.role || 'Student'
      currentUser.guid = res.user?.guid || 'dddd0001-0000-0000-0000-000000000001'
      isLoggedIn.value = true
      return true
    }
    throw new Error(res.message || '登入失敗')
  }

  function logout() {
    isLoggedIn.value = false
    authToken = ''
    currentUser.name = ''
    currentUser.role = ''
    currentUser.guid = ''
  }

  return { isLoggedIn, currentUser, login, logout }
}

// ===== HTTP Helpers =====
async function apiGet(path) {
  const headers = {}
  if (authToken) headers['Authorization'] = `Bearer ${authToken}`

  const res = await fetch(path, { headers })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const contentType = res.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return res.json()
  }
  return res.text()
}

async function apiPost(path, body) {
  const headers = { 'Content-Type': 'application/json' }
  if (authToken) headers['Authorization'] = `Bearer ${authToken}`

  const res = await fetch(path, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

// ===== API Modules =====
export function useWallet() {
  const wallet = reactive({ credits: null, coins: null, totalTopUp: null, totalGifted: null })

  async function fetchBalance() {
    const data = await apiGet('/api/wallet/balance')
    Object.assign(wallet, data)
  }

  async function fetchUsageStats(start, end) {
    let query = '/api/wallet/usage-stats'
    const params = []
    if (start) params.push(`start=${start}`)
    if (end) params.push(`end=${end}`)
    if (params.length) query += '?' + params.join('&')
    return apiGet(query)
  }

  async function fetchOrgTransactions(orgGuid, limit = 100) {
    return apiGet(`/api/organization/${orgGuid}/transactions?limit=${limit}`)
  }

  return { wallet, fetchBalance, fetchUsageStats, fetchOrgTransactions }
}

export function useChat() {
  async function fetchSessions(userGuid, limit = 50) {
    return apiGet(`/api/ai-chat/sessions?userGuid=${userGuid}&limit=${limit}`)
  }

  async function fetchDailyLimit(userGuid) {
    return apiGet(`/api/ai-chat/daily-limit?userGuid=${userGuid}`)
  }

  async function fetchMessages(sessionGuid) {
    return apiGet(`/api/ai-chat/sessions/${sessionGuid}/messages`)
  }

  return { fetchSessions, fetchDailyLimit, fetchMessages }
}

export function useModel3D() {
  async function fetchUserBalance() {
    return apiGet('/api/tripoai/user-balance')
  }

  async function fetchUsageStats(start, end) {
    let query = '/api/tripoai/usage-stats'
    const params = []
    if (start) params.push(`start=${start}`)
    if (end) params.push(`end=${end}`)
    if (params.length) query += '?' + params.join('&')
    return apiGet(query)
  }

  return { fetchUserBalance, fetchUsageStats }
}

export function useCourse() {
  async function fetchLatest() {
    return apiPost('/api/course/latest', {})
  }

  return { fetchLatest }
}

export function useStudents() {
  async function fetchSheets(userGuid, projectGuid) {
    return apiGet(`/api/sheets?userGuid=${userGuid}&projectGuid=${projectGuid}`)
  }

  async function fetchOrgMembers(orgGuid) {
    return apiGet(`/api/internal/org/${orgGuid}/members`)
  }

  return { fetchSheets, fetchOrgMembers }
}
