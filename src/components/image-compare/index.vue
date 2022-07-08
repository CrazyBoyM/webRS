<template>
  <div ref="box" class="box" :style="{ ...style }">
    <div class="origin">
      <img
        v-if="img1"
        :style="{ width: `${boxWidth}px`, height: `${boxHeight}px` }"
        :src="img1"
      />
    </div>
    <div class="mask" :style="{ width: `${boxWidth - left}px` }">
      <div ref="resize" class="resize" @mousedown.prevent="startResize"></div>
      <span v-if="!img2" class="text">{{ tip }}</span>
      <div
        class="result"
        :style="{ width: `${boxWidth}px`, height: `${boxHeight}px` }"
      >
        <img
          v-if="img2"
          :style="{ width: `${boxWidth}px`, height: `${boxHeight}px` }"
          :src="img2"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, toRefs } from 'vue';

  // ref获取dom元素
  const box = ref();
  const resize = ref();

  // 总盒子的宽度
  const boxWidth = ref(0);
  const boxHeight = ref(0);
  onMounted(() => {
    boxWidth.value = box.value.clientWidth;
    boxHeight.value = box.value.clientHeight;
  });

  const props = defineProps({
    style: Object,
    img1: String,
    img2: String,
    tip: String,
  });
  toRefs(props);

  // resizebar的左距离，默认50%
  const left = ref(0);
  onMounted(() => {
    left.value = boxWidth.value / 2;
  });
  const resizeMove = (e: MouseEvent) => {
    e.preventDefault();
    const maxWidth = boxWidth.value - resize.value.clientWidth;
    let newLeft = e.clientX - box.value.offsetLeft;
    if (newLeft < 0) {
      newLeft = 0;
    } else if (newLeft > maxWidth) {
      newLeft = maxWidth;
    }
    left.value = newLeft;
  };
  const resizeEnd = () => {
    window.removeEventListener('mousemove', resizeMove);
  };
  const startResize = () => {
    window.addEventListener('mousemove', resizeMove);
    window.addEventListener('mouseup', resizeEnd);
  };
</script>

<style lang="less" scoped>
  img {
    display: block;
    width: 100%;
    max-height: 100%;
    margin: 0 auto;
    object-fit: fill;
  }

  .box {
    position: relative;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow-x: hidden;
    background-color: #333;
    user-select: none;

    .origin {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
    }

    .mask {
      position: relative;
      top: 0;
      left: 0;
      // background-color: aliceblue;
      z-index: 1;
      width: 100%;
      height: 100%;
      overflow: hidden;

      .resize {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        width: 5px;
        height: 100%;
        background: #0073eb;
        cursor: ew-resize;
      }

      .text {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 3;
        color: #ddd;
        font-size: 17px;
        letter-spacing: 1.5px;
        transform: translate(-50%, -50%);
      }
    }

    .result {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      height: 100%;
      color: white;
      font-weight: bold;
      font-size: 12px;
      text-align: center;
      background: rgba(0, 0, 0, 0.5);
      opacity: 0.6;
    }
  }
</style>
