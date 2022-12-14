import React, { FC } from 'react';

import { ClassTime } from 'components/scheduler/classTime/ClassTime';
// import ScheduledLesson from 'components/scheduler/scheduledLesson/ScheduledLesson';

interface IScheduler {
  id: number;
  lesson: boolean;
}

interface ILesson {
  time: string[];
  scheduler: IScheduler[];
}

interface IData {
  dates: string[];
  lessons: ILesson[];
}

interface Props {
  data: IData;
}

const Table2: FC<Props> = ({ data }) => (
  <table>
    <thead>
      <tr>
        {data.dates.map(date => (
          <th key={date}>{date}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.lessons.map((lesson, index) => (
        <tr key={index}>
          <ClassTime time={lesson.time} />
          {lesson.scheduler.map(item =>
            item.lesson ? (
              <td key={item.id}> {/** <ScheduledLesson /> * */} </td>
            ) : (
              <td key={item.id} />
            ),
          )}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table2;
