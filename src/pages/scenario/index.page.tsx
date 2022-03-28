import BlockShulte from '@components/block-shulte/BlockShulte';
import ButtonPlay from '@components/button-play/ButtonPlay';
import Modal from '@components/modal/Modal';
import PagePersonalData from '@components/page-persona-data/PagePersonalData';

const Tablet = () => {
  return (
    <div>
      <PagePersonalData />
      <Modal />
      <ButtonPlay />
      <BlockShulte />
    </div>
  );
};

export default Tablet;
