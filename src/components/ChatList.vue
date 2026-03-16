<script setup>
defineProps({
  sessions: { type: Array, default: () => [] }
})
</script>

<template>
  <div class="chat-list">
    <div class="chat-item" v-for="session in sessions" :key="session.sessionGuid">
      <div class="chat-icon">🤖</div>
      <div class="chat-info">
        <div class="chat-title">{{ session.title }}</div>
        <div class="chat-meta">{{ session.botName }} · {{ session.messageCount }} 則訊息 · {{ session.totalTokens }} tokens</div>
      </div>
      <span class="badge badge-green">{{ session.status }}</span>
    </div>
    <div v-if="sessions.length === 0" class="empty">暫無對話紀錄</div>
  </div>
</template>

<style scoped>
.chat-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.15s;
}

.chat-item:hover { border-color: var(--primary); }

.chat-icon {
  width: 40px;
  height: 40px;
  background: #ede9fe;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.chat-info { flex: 1; }
.chat-title { font-size: 14px; font-weight: 600; }
.chat-meta { font-size: 12px; color: var(--text-secondary); }

.empty {
  text-align: center;
  padding: 32px;
  color: var(--text-secondary);
}
</style>
