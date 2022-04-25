import React from 'react';
import BasicModal from '@components/basic-modal/BasicModal';
import StudentPageFranchiseeModalParents from '@components/page-franchisee-administrator-main/student-page-franchisee-modal-parents/StudentPageFranchiseeModalParents';

export default function TestPage() {
  return (
    <div>
      <BasicModal visibility={true} changeVisibility={() => console.log()}>
        <StudentPageFranchiseeModalParents />
      </BasicModal>
    </div>
  );
}
