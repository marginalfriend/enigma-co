import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { fonts } from "@/constants/Fonts";

const RootLayout = () => {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded, err] = useFonts(fonts);

  useEffect(() => {
    if (err) throw err;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, err]);

  if (!fontsLoaded && !err) return null;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* <Stack.Screen name="/search/[query]" options={{ headerShown: false }} /> */}
    </Stack>
  );
};

export default RootLayout;
