import {WithPagination} from './WithPagination'

export type ImageTypes = 'image' | 'avatar'

export type RequestImagesParamsT = {
    perPage?: number,
    page?: number,
    type?: ImageTypes
}

export type ImageT = {
    id: string,
    path: string,
    createdAt: {
        date: string,
        timezone_type: number,
        timezone: string
    },
    type: ImageTypes
    previewPath: string | null
}

export type ResponseImagesT = WithPagination<ImageT[]>