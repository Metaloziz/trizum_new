import { TimeZoneType } from 'app/types/TimeZoneType';

export type AvatarT = {
  createdAt: TimeZoneType;
  id: string;
  path: string | null;
  previewPath: string | null;
  type: string;
};
