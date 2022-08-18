import {makeAutoObservable, runInAction} from 'mobx'

import {ImageT,RequestImagesParamsT} from '../types/ImagesTypes'
import {galleryService} from '../services/galleryService'
import {AxiosError} from "axios";

class ImagesStore {

  constructor () {
    makeAutoObservable(this);
  }

  images: ImageT[] = [];

  perPage: number = 5;

  page: number = 0;

  total: number = 0;

  selectedImagePath?: string;

  isLoad = false;

  image64: string = '';

  private defaultQuery: RequestImagesParamsT = {
    type: 'image',
    perPage: 9,
    page: 0
  }

  queryField = {...this.defaultQuery}

  execute = async <T>(action: () => Promise<T>) => {
    try {
      this.isLoad = true;
      return await action();
    } catch (e) {
      // TODO: handle error
      return (e as AxiosError).message;
    } finally {
      this.isLoad = false;
    }
  };

  getImages = async() => {
    await this.execute(async() => {
      const res = await galleryService.getImages(this.queryField)
      runInAction(()=> {
        this.images = res.data.items
        this.page = res.data.page
        this.perPage = res.data.perPage
        this.total = res.data.total
      })
    } )
  }

  uploadImage = async() => {
    await this.execute(async() => {
      if (this.image64 === '') return
      const res = await galleryService.uploadImage(this.image64)
      if (res.status === 200) await this.getImages()
      this.image64 ='';

    })
  }

  setSelectedImagePath = (_path:string) => this.selectedImagePath = _path
}

export default new ImagesStore()