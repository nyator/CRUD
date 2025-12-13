import { Text, TextProps, StyleSheet } from "react-native";

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
}

const CustomText = ({ children, style, ...props }: CustomTextProps) => {
  return <Text style={[styles.defaultFont, style, {...props}]}>{children}</Text>;
};
const styles = StyleSheet.create({
  defaultFont: {
    fontFamily: "SatoshiRegular",
    color: "#fff",
  },
});

export default CustomText;
