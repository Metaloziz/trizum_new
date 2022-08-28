import { GroupLevels } from 'app/enums/GroupLevels';

export type OlympiadPayloadType = {
  name: string;
  dateSince: string;
  dateUntil: string;
  franchiseId: string;
  courseId: string;
  type: 'olympiad';
  forGroupId: string;
  level: keyof typeof GroupLevels;
};
