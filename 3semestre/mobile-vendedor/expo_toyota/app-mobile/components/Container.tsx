import { View, useWindowDimensions } from "react-native";

export default function Container({ children }: any) {
  const { width } = useWindowDimensions();

  const maxWidth = width > 900 ? 900 : width;

  return (
    <View
      style={{
        width: "100%",
        maxWidth,
        alignSelf: "center",
        paddingHorizontal: 15,
      }}
    >
      {children}
    </View>
  );
}