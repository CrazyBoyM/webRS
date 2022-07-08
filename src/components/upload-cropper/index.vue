<template>
  <a-upload
    :style="{ ...style }"
    :limit="1"
    :action="action"
    :custom-request="customRequest"
    @before-upload="beforeUpload"
  />
</template>

<script lang="tsx" setup>
  import { ref, toRefs } from 'vue';
  import { Modal, Message, UploadRequest } from '@arco-design/web-vue';
  import { VueCropper } from 'vue-cropper';
  import SERVER_URL from '@/config/server';

  const cropper = ref();

  const props = defineProps({
    style: Object,
    action: {
      type: String,
      default: () => `${SERVER_URL}/api/upload`,
    },
  });
  toRefs(props);

  const emits = defineEmits(['onSuccess']);
  const customRequest = (option: any) => {
    console.log(option);
    const { onProgress, onError, onSuccess, fileItem, name } = option;
    const xhr = new XMLHttpRequest();
    if (xhr.upload) {
      xhr.upload.onprogress = (event) => {
        let percent;
        if (event.total > 0) {
          // 0 ~ 1
          percent = event.loaded / event.total;
        }
        onProgress(percent, event);
      };
    }
    xhr.onerror = (e) => {
      onError(e);
    };
    xhr.onload = () => {
      const response = JSON.parse(xhr.responseText);
      emits('onSuccess', response);
      if (xhr.status < 200 || xhr.status >= 300) {
        return onError(xhr.responseText);
      }
      onSuccess(response);
      return response;
    };

    const formData = new FormData();
    console.log(fileItem.file);
    formData.append(name || 'file', fileItem.file);
    xhr.open('post', props.action, true);
    xhr.send(formData);
    return {
      abort() {
        xhr.abort();
      },
    };
  };

  const options = {
    outputType: 'png',
    autoCrop: true,
    centerBox: true,
  };
  const beforeUpload = (file: File): Promise<File | boolean> => {
    return new Promise((resolve, reject) => {
      Modal.confirm({
        title: '请选择目标区域：',
        modalStyle: {
          width: '65vw',
          minHeight: '80vh',
        },
        content: () => (
          <div
            style={{
              margin: '0 auto',
              width: '60vw',
              height: '60vh',
              overflow: 'hidden',
            }}
          >
            <VueCropper
              {...options}
              img={window.URL.createObjectURL(file)}
              ref="cropper"
            ></VueCropper>
          </div>
        ),
        onOk: async () => {
          // const newFile = await cropper.value.getCropBlob();
          // resolve(newFile);
          resolve(file);
        },
        onCancel: () => {
          resolve(false);
          Message.info('取消上传');
          Modal.close();
        },
      });
    });
  };
</script>
