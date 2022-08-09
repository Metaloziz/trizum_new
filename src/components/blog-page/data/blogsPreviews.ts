import firstArticleImage from './mockData/arifmetika.png';
import secondArticleImage from './mockData/biology.png';
import thirdArticleImage from './mockData/physics.png';

export type MockArticleT = {
  id: string;
  img: string;
  title: string;
  text: string;
};

export const blogsPreviews: MockArticleT[] = [
  {
    id: '1',
    img: firstArticleImage,
    title: 'Арифметика',
    text: 'Арифме́тика (др.-греч. ἀριθμητική, arithmētikḗ — от ἀριθμός, arithmós «число») — раздел математики, изучающий числа, их отношения и свойства. Предметом арифметики является понятие числа (натуральные, целые, рациональные, вещественные, комплексные числа) и его свойства. В арифметике рассматриваются измерения, вычислительные операции (сложение, вычитание, умножение, деление) и приёмы вычислений. Изучением свойств отдельных целых чисел занимается высшая арифметика, или теория чисел. Теоретическая арифметика уделяет внимание определению и анализу понятия числа, в то время как формальная арифметика оперирует логическими построениями предикатов и аксиом. Арифметика является древнейшей и одной из основных математических наук; она тесно связана с алгеброй, геометрией и теорией чисел.',
  },
  {
    id: '2',
    img: secondArticleImage,
    title: 'Биология',
    text:
      'Биоло́гия (греч. βιολογία; от др.-греч. βίος «жизнь» + λόγος «учение, наука») — наука о живых существах и их взаимодействии со средой обитания. Изучает все аспекты жизни, в частности: структуру, функционирование, рост, происхождение, эволюцию и распределение живых организмов на Земле. Классифицирует и описывает живые существа, происхождение их видов, взаимодействие между собой и с окружающей средой.\n' +
      '\n' +
      'Как самостоятельная наука биология выделилась из естественных наук в XIX веке, когда учёные обнаружили, что все живые организмы обладают некоторыми общими свойствами и признаками, в совокупности не характерными для неживой природы. Термин «биология» был введён независимо несколькими авторами: Фридрихом Бурдахом в 1800 году, Готфридом Рейнхольдом Тревиранусом и Жаном Батистом Ламарком в 1802 году. ',
  },
  {
    id: '3',
    img: thirdArticleImage,
    title: 'Физика',
    text:
      'Физика (от др.-греч. φυσική — «природный» от φύσις — «природа») — область естествознания: наука о наиболее общих законах природы, о материи, её структуре, движении и правилах трансформации. Понятия физики и её законы лежат в основе всего естествознания. Является точной наукой.\n' +
      '\n' +
      'Термин «физика» впервые фигурирует в сочинениях одного из величайших мыслителей древности — Аристотеля (IV век до нашей эры). Первоначально термины «физика» и «философия» были синонимами, так как в основе обеих дисциплин лежало стремление объяснить законы функционирования Вселенной. Однако в результате научной революции XVI века физика развилась в самостоятельную научную отрасль.',
  },

  { id: '1ed17dda-a941-6180-a37b-c90ebc24c208', img: '', title: 'API', text: 'qweqwe' },
];
