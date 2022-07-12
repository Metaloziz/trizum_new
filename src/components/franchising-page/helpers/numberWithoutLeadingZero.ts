export const numberWithoutLeadingZero = (value: string, callback: VoidFunction) => {
  if (/^[1-9]+\d*$/.test(value) || !value.trim()) {
    callback();
  }
};
