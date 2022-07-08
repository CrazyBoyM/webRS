<template>
  <div class="container">
    <image-compare
      :style="{ width: '1000px', height: '500px', borderRadius: '5px' }"
      :img1="originImage"
      :img2="compareImage"
      :tip="tip"
    ></image-compare>
    <div class="btns-area">
      <upload-cropper @on-success="onUploadSucess"></upload-cropper>
      <a-button @click="setDemo">示例图片</a-button>
      <a-button :loading="loading" @click="onDetect">解析</a-button>
    </div>
    <span>{{ tip }}</span>
  </div>
</template>

<script lang="ts" setup>
  import UploadCropper from '@/components/upload-cropper/index.vue';
  import ImageCompare from '@/components/image-compare/index.vue';
  import { ref } from 'vue';
  import SERVER_URL from '@/config/server';
  import axios from 'axios';
  import Message from '@arco-design/web-vue/es/message';

  const originImage = ref('');
  const compareImage = ref('');
  const loading = ref(false);
  const demoImage = `${SERVER_URL}/static/demo/road.png`;
  const tip = ref('请上传一张遥感图像');

  const onUploadSucess = (res: any) => {
    originImage.value = SERVER_URL + res.data.path;
    compareImage.value = '';
    tip.value = '请点击解析按钮';
  };

  const onDetect = () => {
    if (originImage.value === '') {
      Message.error('请上传一张遥感图像');
      return;
    }
    loading.value = true;
    axios
      .post('/api/detect', {
        img_paths: [originImage.value.replace(SERVER_URL, '')],
        type: 'object',
      })
      .then((res) => {
        compareImage.value = SERVER_URL + res.data.path;
        tip.value = '解析成功, 可左右拖动查看';
        Message.success('解析成功');
        loading.value = false;
      });
  };

  const setDemo = () => {
    originImage.value = demoImage;
    compareImage.value = '';
    tip.value = '请点击解析按钮';
  };
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 90vh;
    margin: 5px 10px;
    padding-top: 30px;
    background-color: #fff;

    .btns-area {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 30px;
      margin-bottom: 20px;
      column-gap: 10px;
    }

    .banner {
      width: 550px;
      background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
    }

    .content {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      padding-bottom: 40px;
    }

    .footer {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
    }
  }

  .logo {
    position: fixed;
    top: 24px;
    left: 22px;
    z-index: 1;
    display: inline-flex;
    align-items: center;

    &-text {
      margin-right: 4px;
      margin-left: 4px;
      color: var(--color-fill-1);
      font-size: 20px;
    }
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-lg) {
    .container {
      .banner {
        width: 25%;
      }
    }
  }
</style>
