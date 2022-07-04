import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';

const gamesService = {
  getGames: async () => {
    const { data } = await instance.get(Paths.Games);
    return data;
  },
};
export default gamesService;
