import { GroupLevels } from 'app/enums/GroupLevels';

export type OlympiadPayloadType = {
  name: string;
  dateSince: string;
  dateUntil: string;
  franchiseId: string;
  courseId: string;
  type: 'olympiad';
  level: keyof typeof GroupLevels;
};
