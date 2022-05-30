import React, {FC} from 'react';
import teacherEducationStore from "@app/stores/TeacherEducationStore";

const Theory:FC = () => {
  const {test} = teacherEducationStore
  //TODO: проверка если теста нет, то запрос за ним
  return (
    <div>
      {test.title}
    </div>
  );
};

export default Theory;
