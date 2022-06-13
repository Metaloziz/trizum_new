import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://backschool.sitetopic.ru/',
});
export default instance;
