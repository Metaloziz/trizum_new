export const isStudentCreated = (isParentShown: boolean, studentId: string): boolean =>
  !isParentShown && !studentId;
