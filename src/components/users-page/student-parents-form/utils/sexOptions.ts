import { SexEnum } from 'app/enums/CommonEnums';

export const sexOptions = Object.values(SexEnum).map(el => ({ label: el, value: el }));
