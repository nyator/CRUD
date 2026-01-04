import { useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
interface AddButtonProps {
  action: () => void;
}
const AddButton = ({ action }: AddButtonProps) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={action}>
      <Image
        source={require("../assets/images/add.png")}
        style={{ width: 30, height: 30 }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    bottom: 60,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: "#c7fce8ff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#c7fce8ff",
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 5,
  },
});
export default AddButton;
