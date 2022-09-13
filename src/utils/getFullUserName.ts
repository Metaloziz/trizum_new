export const getFullUserName = (lName: string | null, fName: string | null, mName: string | null) =>
  `${lName ?? ' '} ${fName ?? ' '} ${mName ?? ' '}`.trim();
