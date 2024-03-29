import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { AiFillCamera, AiOutlineCloseCircle } from "react-icons/ai";
import { ReactCrop } from "react-image-crop";

const ImageCrop = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    getCroppedImage() {
      return getCroppedImage();
    },
    removeImage() {
      setImage(null);
    },
    isSettingImageCrop() {
      return image !== null;
    },
  }));
  const [crop, setCrop] = useState({
    unit: "px",
    width: 150,
    height: 150,
  });
  const [image, setImage] = useState(null);
  const fileImageInputRef = useRef(null);
  const imageRef = useRef(null);

  function loadfileImage(event) {
    setImage(event.target.files[0]);
  }

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  async function getCroppedImage() {
    if (image && imageRef && crop.width && crop.height) {
      const canvas = document.createElement("canvas");
      const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
      const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
      const ctx = canvas.getContext("2d");

      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;

      ctx.drawImage(
        imageRef.current,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
      );

      const file = await canvasToFile(canvas, "cropped.jpg", "image/jpeg");
      return file;
    }
  }
  function canvasToFile(canvas, fileName, mimeType) {
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          const file = new File([blob], fileName, { type: mimeType });
          resolve(file);
        },
        mimeType,
        1 // Quality (1 is the maximum quality)
      );
    });
  }

  return (
    <div>
      {image ? (
        <div className="relative">
          <div
            className="absolute top-[-26px] right-1 z-10 flex items-center"
            onClick={() => setImage(undefined)}
          >
            Close
            <AiOutlineCloseCircle size={15} />
          </div>
          <ReactCrop
            // src={URL.createObjectURL(image)}

            crop={crop}
            onChange={onCropChange}
            aspect={1}
            circularCrop={props.rounded ? true : false}
          >
            <img
              src={URL.createObjectURL(image)}
              className="w-[200px] h-[200px] object-contain"
              ref={imageRef}
            />
          </ReactCrop>
        </div>
      ) : (
        <div>
          <label
            htmlFor="image_upload"
            className={`inline-block cursor-pointer px-2 pt-[150px] w-[200px] lg:px-5 bg-cover pb-5 bg-slate-600 bg-no-repeat bg-center ${
              props.defaultImage && "rounded-[50%]"
            }`}
            style={{ backgroundImage: `url('${props.defaultImage}')` }}
          >
            <span
              className={`bg-red-100 p-2 flex justify-center items-center ${
                props.defaultImage && "w-[120px] m-auto"
              }`}
            >
              <AiFillCamera className="inline" /> Upload file
            </span>
          </label>
          <input
            required
            id="image_upload"
            type="file"
            accept=".JPEG,.PNG,.JPG"
            className="hidden"
            onChange={loadfileImage}
            ref={fileImageInputRef}
          />
        </div>
      )}
    </div>
  );
});
export default ImageCrop;
