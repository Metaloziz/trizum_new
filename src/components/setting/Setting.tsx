import React, { useState, useRef, useCallback } from 'react';

import { Slider } from '@mui/material';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';

import styles from './Schedule.module.scss';
import { getCroppedImg } from './utils/cropImage';

import authService from 'app/services/authService';
import appStore from 'app/stores/appStore';
import settingsHover from 'assets/svgs/settings-hover.svg';
import settings from 'assets/svgs/settings.svg';
import BasicModal from 'components/basic-modal/BasicModal';
import Button from 'components/button/Button';
import Image from 'components/image/Image';

export type PresetWithOrderT = { index: number; label: string; value: string };

const Setting = () => {
  const { setUser } = appStore;
  const [isShowHover, setShowHover] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [image, setImage] = useState<any>('');
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>();
  const [error, setError] = useState<boolean>(false);
  const inputRef = useRef<any>();

  const triggerFileSelectPopup = () => inputRef.current.click();

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onSelectFile = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener('load', () => {
        setImage(reader.result);
      });
    }
  };

  const onDownload = async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      if (croppedImage) {
        const res = await authService.avatar({ image: croppedImage.split(',')[1] });
        setShowModal(false);
        setUser();
        console.log(res);
      } else {
        throw new Error('фото не загрузилось или что-то пошло не так');
      }
    } catch (e) {
      console.error(e);
      setError(true);
    }
  };
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
        {image ? (
          <div className={styles.container}>
            <div className={styles.containerCropper}>
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
                  // eslint-disable-next-line @typescript-eslint/no-shadow
                  onChange={(e, zoom) => setZoom(Number(zoom))}
                />
              </div>
            </div>

            {error ? (
              <p className={styles.errorText}>
                Фото не загрузилось или что-то пошло не так
                <br />
                Обновите страницу
              </p>
            ) : (
              <div className={styles.containerButtons}>
                <input
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={onSelectFile}
                  style={{ display: 'none' }}
                />
                <div>
                  <Button
                    variant="addUser"
                    size="small"
                    onClick={triggerFileSelectPopup}
                    style={{ marginRight: '10px' }}
                  >
                    Выбрать файл
                  </Button>
                </div>
                <div className={styles.button}>
                  <Button variant="arrow" size="small" onClick={onDownload}>
                    Загрузить изображение
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.noImage}>
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={onSelectFile}
              style={{ display: 'none' }}
            />

            <Button variant="addUser" size="small" onClick={triggerFileSelectPopup}>
              Выбрать файл
            </Button>
          </div>
        )}
      </BasicModal>
    </div>
  );
};

export default Setting;
