import React, { useState, useRef, useCallback } from 'react';

import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Typography,
  Slider,
} from '@mui/material';
import Cropper from 'react-easy-crop';
import styles from './Schedule.module.scss';
import authService from 'app/services/authService';
import { generateDownload } from './utils/cropImage';
import { Point, Area } from "react-easy-crop/types";

import settingsHover from 'assets/svgs/settings-hover.svg';
import settings from 'assets/svgs/settings.svg';
import BasicModal from 'components/basic-modal/BasicModal';
import Image from 'components/image/Image';

export type PresetWithOrderT = { index: number; label: string; value: string };

const Setting = () => {
  const [isShowHover, setShowHover] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const inputRef = useRef<any>();

  const triggerFileSelectPopup = () => inputRef.current.click();

  const [image, setImage] = React.useState<any>('');
  const [croppedArea, setCroppedArea] = React.useState(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState<any>(1);

  // const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
	// 	setCroppedArea(croppedAreaPixels);
	// };
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      // console.log(croppedArea, croppedAreaPixels);
    },
    []
  );

  const onSelectFile = (event:any) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.addEventListener("load", () => {
				setImage(reader.result);
			});
		}
	};

  const onDownload =async () => {
    const res = await authService.аvatar({image:image.split(',')[1]});
    console.log(res)
  };
console.log('image', image)
// console.log('croppedArea', croppedArea)
  return (
    <div onMouseOver={() => setShowHover(true)} onMouseOut={() => setShowHover(false)}>
      <div>
        <Image
          src={isShowHover ? settingsHover : settings}
          alt="setting"
          width="25"
          height="25"
          onClick={() => setShowModal(true)}
        />
      </div>
      <BasicModal visibility={showModal} changeVisibility={setShowModal}>
        <div className={styles.container}>
          <div className={styles.containerCropper}>
            {image ? (
              <>
                <div className={styles.cropper}>
                  <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round"
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                </div>

                <div className={styles.slider}>
                  <Slider
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e, zoom) => setZoom(zoom)}
                  />
                </div>
              </>
            ) : null}
          </div>

          <div className={styles.containerButtons}>
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={onSelectFile}
              style={{ display: 'none' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={triggerFileSelectPopup}
              style={{ marginRight: '10px' }}
            >
              Выбрать файл
            </Button>
            <Button variant="contained" color="secondary" onClick={onDownload}>
              Загрузить изображение
            </Button>
          </div>
        </div>
      </BasicModal>
    </div>
  );
};

export default Setting;
