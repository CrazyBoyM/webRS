const getBase64 = (
  img: File | Blob,
  callback: (arg0: string | ArrayBuffer | null) => any
) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

// const dataURLtoFile = (dataurl: string, filename: string) => {
//   const arr = dataurl.split(',') as Array<string>;
//   const mime = arr[0].match(/:(.*?);/)[1];
//   const bstr = atob(arr[1]);
//   let n = bstr.length;
//   const u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new File([u8arr], filename, { type: mime });
// };

export default getBase64;
