export const removeKeysWithSameValues = (one: any, two: any) => {
  const result = {};

  for (const resultKey in one) {
    if (one[resultKey] !== two[resultKey]) {
      // @ts-ignore
      result[resultKey] = one[resultKey];
    }
  }

  // if (one.tariff.id !== two.tariffId) { // todo доделать лишнюю отправкю тарифа
  //   // @ts-ignore
  //   result.tariffId = one.tariff.id;
  // }

  console.log(result);
  return result;
};
