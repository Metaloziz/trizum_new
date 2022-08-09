export const mixElements = <T>(array: T[], object: T): T[] => {
  const newArray = [...array, object];

  const copy: T[] = [];
  let n = newArray.length;
  let i;

  // While there remain elements to shuffle…
  while (n) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * newArray.length);

    // If not already shuffled, move it to the new array.
    if (i in newArray) {
      copy.push(newArray[i]);
      delete newArray[i];
      n--;
    }
  }

  return copy;
};
