<template>
  <view class="container">
    <!-- 顶部导航 -->
    <view class="nav">
      <text class="title">心里测评</text>
    </view>

    <!-- 列表 -->
    <scroll-view scroll-y class="list">
      <view
        class="list-item"
        v-for="item in questionnaires"
        :key="item._id"
      >
        <view class="left">
          <text class="name">{{ item.title }}</text>
        </view>

        <view class="right">
          <view
            v-if="isFinished(item._id)"
            class="button button-active"
          >
            <text>已完成</text>
          </view>

          <view
            v-else
            class="button"
            @click="goFill(item._id)"
          >
            <text>开始填写</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { HOST } from '../../config.js'

// 数据
const questionnaires = ref([])
const answers = ref([])

// 获取用户
const getUser = () => {
  try {
    return uni.getStorageSync('user')
  } catch (e) {
    return null
  }
}

// 获取问卷
const getQuestionnaires = async () => {
  const user = getUser()
  if (!user) return

  if (user.role === 1 || user.role === 3) {
    const type = user.role === 1 ? 'pregnant' : 'family'

    const res = await uni.request({
      url: `${HOST}/questionnaire?type=${type}`
    })

    questionnaires.value = res.data || []
  }
}

// 获取答案
const getAnswers = async () => {
  const user = getUser()
  if (!user) return

  const res = await uni.request({
    url: `${HOST}/answer?userId=${user._id}`
  })

  answers.value = res.data || []
}

// 判断是否完成
const isFinished = (id) => {
  return answers.value.some(a => a.questionnaire === id)
}

// 跳转填写
const goFill = (id) => {
  uni.navigateTo({
    url: `/pages/testing/testing?id=${id}`
  })
}

// 返回
const goBack = () => {
  uni.navigateBack()
}

// 生命周期
onShow(() => {
  getQuestionnaires()
  getAnswers()
})
</script>

<style scoped>
.container {
  height: 100vh;
  background-color: #f7f3fb;
  padding-bottom: 100rpx;
}

/* 顶部导航 */
.nav {
  display: flex;
  align-items: center;
  height: 90rpx;
  padding: 0 20rpx;
  background-color: #ffffff;
  font-size: 32rpx;
  font-weight: bold;
}

.back {
  margin-right: 20rpx;
}

.title {
  flex: 1;
  text-align: center;
}

/* 列表 */
.list {
  padding: 20rpx;
  box-sizing: border-box;
}

/* 列表项 */
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-radius: 20rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
}

/* 左边 */
.left {
  padding: 30rpx;
}

.name {
  font-size: 28rpx;
}

/* 右边按钮 */
.button {
  width: 200rpx;
  height: 140rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d6718b;
  color: #fff;
  border-top-right-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
}

.button-active {
  background-color: #b2ff59;
}
</style>