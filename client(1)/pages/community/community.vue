<template>
  <view class="container">

    <!-- 顶部 -->
    <view class="header">
      <text class="title">互动社区</text>
      <view class="publish-btn" @click="goPublish">发布</view>
    </view>

    <!-- 列表 -->
    <scroll-view scroll-y class="list">
      <view 
        class="card"
        v-for="item in posts"
        :key="item.id"
      >

        <!-- 用户信息 -->
        <view class="user">
          <image class="avatar" :src="item.avatar" />
          <view>
            <text class="username">{{ item.username }}</text>
            <text class="time">{{ item.time }}</text>
          </view>
        </view>

        <!-- 内容 -->
        <view class="content">
          <text>{{ item.content }}</text>
        </view>

        <!-- 图片 -->
        <image 
          v-if="item.image" 
          class="post-img" 
          :src="item.image" 
          mode="aspectFill" 
        />

        <!-- 操作栏 -->
        <view class="actions">
          <view class="action-item" @click="like(item)">
            ❤️ {{ item.likes }}
          </view>
          <view class="action-item">
            💬 {{ item.comments }}
          </view>
        </view>

      </view>
    </scroll-view>

  </view>
</template>

<script setup>
import { ref } from 'vue'

// 模拟数据
const posts = ref([
  {
    id: 1,
    username: '小雨',
    avatar: '/static/images/logo.png',
    content: '今天胎动好明显，好开心～',
    image: '/static/images/article3.jpg',
    likes: 12,
    comments: 3,
    time: '2小时前'
  },
  {
    id: 2,
    username: '安安',
    avatar: '/static/images/logo.png',
    content: '有没有孕期推荐的音乐呀？最近有点焦虑。',
    image: '/static/images/article2.jpg',
    likes: 8,
    comments: 5,
    time: '3小时前'
  },
  {
    id: 3,
    username: '乐乐妈',
    avatar: '/static/images/logo.png',
    content: '宝宝今天第一次笑了，记录一下❤️',
    image: '/static/images/article5.jpg',
    likes: 25,
    comments: 6,
    time: '1天前'
  }
])

// 点赞
const like = (item) => {
  item.likes++
}

// 发布
const goPublish = () => {
  uni.showToast({
    title: '去发布页面',
    icon: 'none'
  })

  // 后续可以跳转
  // uni.navigateTo({ url: '/pages/community/publish' })
}
</script>

<style scoped>
.container {
  height: 100vh;
  background-color: #f7f3fb;
  margin-bottom: 100rpx;
}

/* 头部 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
}

.publish-btn {
  background: #f2c941;
  color: #fff;
  padding: 10rpx 20rpx;
  border-radius: 30rpx;
  font-size: 24rpx;
}

/* 列表 */
.list {
  padding: 20rpx;
  box-sizing: border-box;
}

/* 卡片 */
.card {
  background: #fff;
  border-radius: 20rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 10rpx 20rpx rgba(0,0,0,0.05);
}

/* 用户 */
.user {
  display: flex;
  align-items: center;
}

.avatar {
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
  margin-right: 15rpx;
}

.username {
  font-size: 28rpx;
  font-weight: bold;
}

.time {
  display: block;
  font-size: 22rpx;
  color: #999;
}

/* 内容 */
.content {
  margin: 15rpx 0;
  font-size: 28rpx;
}

/* 图片 */
.post-img {
  width: 100%;
  height: 300rpx;
  border-radius: 15rpx;
}

/* 操作 */
.actions {
  display: flex;
  margin-top: 15rpx;
}

.action-item {
  margin-right: 30rpx;
  font-size: 26rpx;
  color: #666;
}
</style>