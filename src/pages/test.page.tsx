import React from 'react';
import BasicModal from '@components/basic-modal/BasicModal';
import StudentPageFranchiseeModalAddUser from '@components/page-franchisee-administrator-main/student-page-franchisee-modal-add-user/StudentPageFranchiseeModalAddUser';
import TextEditor from '@components/text-editor/TextEditor';

export default function TestPage() {
  const str = `RGG
  asdfasdf`;
  console.log(str);
  return (
    <div>
      <BasicModal
        visibility={true}
        changeVisibility={() => console.log('asdf')}
      >
        <StudentPageFranchiseeModalAddUser />
      </BasicModal>
    </div>
  );
}
