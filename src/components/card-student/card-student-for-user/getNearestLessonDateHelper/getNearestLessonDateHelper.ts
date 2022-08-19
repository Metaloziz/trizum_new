import { GroupsDataT } from 'app/types/ResponseLoadMeBaseT';
import { dateNow } from 'utils/dateNow';
import { getClassTypeGroups } from 'utils/getClassTypeGroups';
import { getNearestLessonDate } from 'utils/getNearestLessonDate';
import { getNearestLessonObject } from 'utils/getNearestLessonObject';

export const getNearestLessonDateHelper = (groups: GroupsDataT[] | undefined): string => {
  let lessonDate = 'default';

  if (groups?.length) {
    const result = getClassTypeGroups(groups);
    const result2 = getNearestLessonObject(result, dateNow());
    const result3 = getNearestLessonDate(result2);
    lessonDate = result3;
  }

  return lessonDate;
};
