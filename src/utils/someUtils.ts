import { SexEnum } from 'app/enums/CommonEnums';

export const utils = {
  checkSex(value: boolean | null): SexEnum {
    // todo зачем это ?
    if (value) {
      return SexEnum.Male;
    }
    if (typeof value === 'boolean' && !value) {
      return SexEnum.Female;
    }
    return SexEnum.Male;
  },
};
