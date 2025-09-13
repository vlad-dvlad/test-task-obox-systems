import Modal from '../modal/modal';
import HintContent from './hint-content';

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HintModal = ({ isOpen, onClose }: HintModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Wisdom Guide'>
      <HintContent />
    </Modal>
  );
};

export default HintModal;
