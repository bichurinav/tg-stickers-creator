const $imageUpload = document.getElementById("image-upload");
const imageUploadFiles = document.querySelectorAll(".image-upload-file");

imageUploadFiles.forEach(($imageUploader, index) => {
  $imageUploader.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const dataURL = e.target.result;
      creator.imageUpload(dataURL);
    };

    reader.readAsDataURL(file);
  });
});
