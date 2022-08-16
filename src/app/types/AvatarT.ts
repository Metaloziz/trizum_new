import { TimeZoneType } from 'app/types/TimeZoneType';

export type AvatarT = {
  id: string;
  path: string | null;
  createdAt: TimeZoneType;
  type: string;
  previewPath: string | null;
};
