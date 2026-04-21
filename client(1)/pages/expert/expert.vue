<template>
  <view class="container">

    <!-- 顶部 -->
    <view class="header">
      <text class="title">专家咨询</text>
    </view>

    <!-- 列表 -->
    <scroll-view scroll-y class="list">
      <view 
        class="card" 
        v-for="item in experts" 
        :key="item.id"
      >
        <!-- 左侧头像 -->
        <image class="avatar" :src="item.avatar" />

        <!-- 中间内容 -->
        <view class="info">
          <view class="top">
            <text class="name">{{ item.name }}</text>
            <text class="title-tag">{{ item.title }}</text>
          </view>

          <text class="specialty">
            擅长：{{ item.specialty }}
          </text>

          <text class="desc">
            {{ item.desc }}
          </text>
        </view>

        <!-- 右侧按钮 -->
        <view class="action">
          <view class="btn" @click="consult(item)">
            咨询
          </view>
        </view>
      </view>
    </scroll-view>

  </view>
</template>

<script setup>
import { ref } from 'vue'

// 模拟专家数据（先写死）
const experts = ref([
  {
    id: 1,
    name: '张丽',
    title: '主任医师',
    specialty: '孕期营养 / 高危妊娠',
    desc: '从事妇产科临床工作15年，经验丰富。',
    avatar: '/static/images/doctor.png'
  },
  {
    id: 2,
    name: '李芳',
    title: '副主任医师',
    specialty: '产后恢复 / 心理疏导',
    desc: '专注产后护理与情绪管理。',
    avatar: '/static/images/doctor.png'
  },
  {
    id: 3,
    name: '王敏',
    title: '主治医师',
    specialty: '新生儿护理',
    desc: '擅长婴儿健康管理与护理指导。',
    avatar: '/static/images/doctor.png'
  },
  {
    id: 4,
    name: '赵婷',
    title: '心理咨询师',
    specialty: '孕期焦虑 / 情绪调节',
    desc: '国家认证心理咨询师。',
    avatar: '/static/images/doctor.png'
  }
])

// 点击咨询
const consult = (item) => {
  uni.showToast({
    title: `咨询 ${item.name}`,
    icon: 'none'
  })

  // 后续可以跳聊天页
  // uni.navigateTo({ url: `/pages/chat/index?id=${item.id}` })
}
</script>

<style scoped>
.container {
  height: 100vh;
  background-color: #f7f3fb;
}

/* 头部 */
.header {
  padding: 30rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
}

/* 列表 */
.list {
  padding: 20rpx;
  box-sizing: border-box;
}

/* 卡片 */
.card {
  display: flex;
  flex-direction: row;
  background: #fff;
  border-radius: 20rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 10rpx 20rpx rgba(0,0,0,0.05);
}

/* 头像 */
.avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
}

/* 信息 */
.info {
  flex: 1;
  margin-left: 20rpx;
}

/* 顶部 */
.top {
  display: flex;
  align-items: center;
}

.name {
  font-size: 30rpx;
  font-weight: bold;
}

.title-tag {
  font-size: 22rpx;
  color: #fff;
  background: #5cb85c;
  padding: 4rpx 10rpx;
  border-radius: 10rpx;
  margin-left: 10rpx;
}

/* 擅长 */
.specialty {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #888;
}

/* 描述 */
.desc {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #666;
}

/* 右侧 */
.action {
  display: flex;
  align-items: center;
}

/* 按钮 */
.btn {
  background: linear-gradient(135deg, #f2c941, #ffb300);
  color: #fff;
  padding: 10rpx 20rpx;
  border-radius: 30rpx;
  font-size: 24rpx;
}
</style>