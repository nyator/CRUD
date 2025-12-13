

import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "SatoshiBold": require("../assets/font/Satoshi-Bold.otf"),
    "SatoshiLight": require("../assets/font/Satoshi-Light.otf"),
    "SatoshiMedium": require("../assets/font/Satoshi-Medium.otf"),
    "SatoshiRegular": require("../assets/font/Satoshi-Regular.otf"),
  });

  useEffect(() => {
    if (!fontsLoaded) {
      console.log("Fonts are loading...");
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light"/>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            contentStyle: { backgroundColor: "#101116" },
          }}
        />
      </Stack>
    </>
  );
}
