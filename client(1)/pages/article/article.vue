<template>
  <view class="container">
    <!-- 顶部 -->
    <view class="nav">
      <text class="title">心里保健详情</text>
    </view>

    <scroll-view scroll-y class="list">
      <!-- 文章 -->
      <view v-if="article" class="article">
        <text class="title-text">{{ article.title }}</text>

        <view class="author">
          <image class="avatar" :src="HOST + '/images/doctor.png'" />
          <text class="author-text">{{ article.authorName }}</text>
        </view>
        
        <view>
           <image class="pic" :src="'/static/' + article.image" />
        </view>

        <!-- 富文本 -->
        <rich-text :nodes="article.content"></rich-text>

        <!-- 视频 -->
        <video
          v-if="article.video"
          class="video"
          :src="HOST + '/videos/' + article.video"
          controls
        ></video>
      </view>

      <!-- 评论 -->
      <view class="comment-container">
        <text class="comment-title">评论</text>

        <view
          v-for="comment in article?.comments || []"
          :key="comment._id"
          class="comment-item"
        >
          <image class="avatar" :src="HOST + '/images/doctor.png'" />
          <view>
            <text class="author-text">{{ comment.user.username }}</text>
            <text class="comment-text">{{ comment.text }}</text>
          </view>
        </view>

        <!-- 输入框 -->
        <view class="input-box">
          <input
            class="input"
            v-model="text"
            placeholder="请输入评论..."
          />
          <button class="btn" @click="handleComment">发送</button>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { HOST } from '../../config'
// import { getData } from '../../utils'

const article = ref(null)
const text = ref('')
let id = null

onLoad((options) => {
  id = options.id
  getArticle()
})

// 获取文章
const getArticle = () => {
  uni.request({
    url: `${HOST}/article/` + id,
    success: (res) => {
      article.value = res.data
    }
  })
}

// 评论
const handleComment = () => {
  if (!text.value) return

  // getData('user').then(user => {
  //   uni.request({
  //     url: `${HOST}/article/addComment`,
  //     method: 'POST',
  //     header: {
  //       'Content-Type': 'application/json'
  //     },
  //     data: {
  //       aid: article.value._id,
  //       uid: user._id,
  //       text: text.value
  //     },
  //     success: (res) => {
  //       if (res.data.error) {
  //         uni.showToast({
  //           title: res.data.error,
  //           icon: 'none'
  //         })
  //       } else {
  //         text.value = ''
  //         getArticle()
  //       }
  //     }
  //   })
  // })
}

// 返回
const goBack = () => {
  uni.navigateBack()
}
</script>

<style scoped>
.container {
  height: 100vh;
  background-color: #f7f3fb;
}

.nav {
  display: flex;
  align-items: center;
  height: 90rpx;
  padding: 0 20rpx;
  background-color: #fff;
}

.back {
  margin-right: 20rpx;
  font-size: 40rpx;
}

.title {
  font-weight: bold;
}

.list {
  height: calc(100vh - 90rpx);
}

/* 文章 */
.article {
  background-color: #fff;
  padding: 20rpx;
  border-radius: 20rpx;
  margin: 20rpx;
}

.title-text {
  font-size: 36rpx;
  font-weight: bold;
}

.author {
  display: flex;
  align-items: center;
  margin: 20rpx 0;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}

.author-text {
  margin-left: 20rpx;
}

.pic {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
}

.video {
  width: 100%;
  height: 400rpx;
  margin-top: 20rpx;
  border-radius: 20rpx;
}

/* 评论 */
.comment-container {
  background-color: #fff;
  padding: 20rpx;
  border-radius: 20rpx;
  margin: 20rpx;
}

.comment-title {
  font-weight: bold;
}

.comment-item {
  display: flex;
  margin-top: 20rpx;
}

.comment-text {
  margin-left: 20rpx;
}

/* 输入框 */
.input-box {
  display: flex;
  align-items: center;
  background-color: #ebe6f7;
  border-radius: 20rpx;
  padding: 20rpx;
  margin-top: 20rpx;
}

.input {
  flex: 1;
}

.btn {
  margin-left: 20rpx;
  background-color: #d6718b;
  color: #fff;
}
</style>