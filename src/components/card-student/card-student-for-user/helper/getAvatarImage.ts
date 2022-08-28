import Avatar from 'public/img/avatarDefault.png';

export const getAvatarImage = (path: string | undefined | null) => {
  if (path) {
    return `https://backschool.sitetopic.ru${path}`;
  }

  return Avatar;
};
