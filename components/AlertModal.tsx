import Modal from "react-native-modal";
import { PropsWithChildren } from "react";

interface props extends PropsWithChildren {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlertModal = ({ visible, setVisible, children }: props) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      onSwipeComplete={() => setVisible(false)}
    >
      {children}
    </Modal>
  );
};

export default AlertModal;
