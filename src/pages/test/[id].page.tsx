import React, {FC} from 'react';
import teacherEducationStore from "@app/stores/TeacherEducationStore";

const Test:FC = () => {
  const {test} = teacherEducationStore
  //TODO: проверка если теста нет, то запрос за ним
  console.log(test);
  return (
    <div>
      {test.id}
    </div>
  );
};

export default Test;
