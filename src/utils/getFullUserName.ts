export const getFullUserName = (lName: string, fName: string, mName: string | null) =>
  `${lName ?? ' '} ${fName ?? ' '} ${mName ?? ' '}`.trim();
