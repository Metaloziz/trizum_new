import appStore from '@app/stores/appStore';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://backschool.sitetopic.ru/',
  // headers: {
  //   Authorization: appStore.token,
  // },
});

export default instance;
