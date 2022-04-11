import { useState } from 'react';
import PagePersonalData from '@components/page-persona-data/PagePersonalData';

export default function TestPage() {
  const [isModal, setModal] = useState(false);
  const setModalHandler = () => {
    setModal(true);
  };
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '20px',
      }}
    >
      <PagePersonalData />
    </div>
  );
}
