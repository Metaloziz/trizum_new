const randomPercent = () => Math.floor(Math.random() * 100);

export const weeklyGrowth = [
  {
    skillTitle: 'Логика',
    color: 'red',
    id: +new Date().toDateString(),
    percents: randomPercent(),
  },
  {
    skillTitle: 'Внимание',
    color: 'violet',
    id: +new Date().toDateString(),
    percents: randomPercent(),
  },
  {
    skillTitle: 'Мышление',
    color: 'aquamarine',
    id: +new Date().toDateString(),
    percents: randomPercent(),
  },
  {
    skillTitle: 'Концентрация',
    color: 'yellow',
    id: +new Date().toDateString(),
    percents: randomPercent(),
  },
];

export const homeworks = [
  {
    gameTitle: 'Память и ритм',
    id: +new Date().toDateString(),
    description: {
      needToDo: '',
      minutesLeft: 10,
      tips: [
        {
          text: '1',
          id: +new Date().toDateString(),
        },
        {
          text: '2',
          id: +new Date().toDateString(),
        },
        {
          text: '3',
          id: +new Date().toDateString(),
        },
      ],
    },
  },
  {
    gameTitle: 'Память и ритм',
    id: +new Date().toDateString(),
    description: {
      needToDo: '',
      minutesLeft: 10,
      tips: [
        {
          text: '1',
          id: +new Date().toDateString(),
        },
        {
          text: '2',
          id: +new Date().toDateString(),
        },
        {
          text: '3',
          id: +new Date().toDateString(),
        },
      ],
    },
  },
];

export const games = [
  {
    title: 'Память и ритм',
    minutesLeft: 18,
    colorTheme: 'blue',
    id: +new Date().toDateString(),
  },
  {
    title: 'Найди слова/числа/фигуры',
    minutesLeft: 36,
    colorTheme: 'gradient-violet',
    id: +new Date().toDateString(),
  },
  {
    title: 'Мухи в кубе',
    minutesLeft: 44,
    colorTheme: 'gradient-blue-darker',
    id: +new Date().toDateString(),
  },
  {
    title: 'Антипазл',
    minutesLeft: 31,
    colorTheme: 'aquamarine',
    id: +new Date().toDateString(),
  },
];
