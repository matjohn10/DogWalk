import { PropsWithChildren } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

const KeyboardDismiss = ({ children }: PropsWithChildren) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default KeyboardDismiss;
