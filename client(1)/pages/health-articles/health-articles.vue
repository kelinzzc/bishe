<template>
  <view class="container">

    <!-- 顶部标题 -->
    <view class="header">
      <text class="title">心里保健</text>
    </view>

    <!-- 列表 -->
    <scroll-view scroll-y class="list">
      <view 
        class="card" 
        v-for="item in articles" 
        :key="item._id"
        @click="goDetail(item._id)"
      >
        <!-- 图片 -->
        <image 
          class="cover" 
          :src="'/static/' + item.image" 
          mode="aspectFill" 
        />

        <!-- 内容 -->
        <view class="content">
          <text class="card-title">{{ item.title }}</text>

          <!-- 标签 -->
          <view class="tags">
            <text class="tag">{{ item.type }}</text>
            <text class="tag sub">{{ item.subtype }}</text>
          </view>

          <!-- 作者 -->
          <view class="author">
            <image 
              class="avatar" 
              :src="'/static/images/doctor.png'" 
            />
            <text class="author-name">{{ item.authorName }}</text>
          </view>
        </view>
      </view>
    </scroll-view>

  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { HOST } from '../../config'

const articles = ref([])

onLoad(() => {
  getArticles()
})

// 获取文章
const getArticles = () => {
  uni.request({
    url: `${HOST}/article`,
    success: (res) => {
      articles.value = res.data
    }
  })
}

// 跳转详情
const goDetail = (id) => {
  uni.navigateTo({
    url: `/pages/article/article?id=${id}`
  })
}
</script>

<style scoped>
.container {
  background-color: #f7f3fb;
  height: 100vh;
}

/* 顶部 */
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
  background: #fff;
  border-radius: 20rpx;
  margin-bottom: 25rpx;
  overflow: hidden;
  box-shadow: 0 10rpx 20rpx rgba(0,0,0,0.05);
}

/* 图片 */
.cover {
  width: 100%;
  height: 260rpx;
}

/* 内容 */
.content {
  padding: 20rpx;
}

.card-title {
  font-size: 30rpx;
  font-weight: bold;
  line-height: 1.4;
}

/* 标签 */
.tags {
  margin: 10rpx 0;
}

.tag {
  display: inline-block;
  background: #ffe58f;
  color: #ad8b00;
  font-size: 22rpx;
  padding: 6rpx 12rpx;
  border-radius: 20rpx;
  margin-right: 10rpx;
}

.tag.sub {
  background: #d3f9d8;
  color: #2b8a3e;
}

/* 作者 */
.author {
  display: flex;
  align-items: center;
  margin-top: 10rpx;
}

.avatar {
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
}

.author-name {
  margin-left: 10rpx;
  font-size: 24rpx;
  color: #666;
}
</style>