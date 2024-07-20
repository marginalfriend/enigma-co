import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Images from "@/constants/Images";
import { Redirect, router } from "expo-router";
import { useAuth } from "@/context/AuthProvider";

const Index = () => {
  const { isLoading, authState } = useAuth();

  if (!isLoading && authState.authenticated) return <Redirect href="/home" />;

  return (
    <SafeAreaView>
      <View className="min-h-[85vh] h-screen flex-1 justify-center align-middle items-center">
        <View className="rounded-b-[140px] bg-primary h-[45vh] w-screen top-0 absolute"></View>
        <View className="mt-80	 p-3 rounded-full bg-white flex w-30 h-30 shadow-lg">
          <Image source={Images.logo} className="w-24 h-24" />
        </View>
        <Text className="font-semibold text-3xl mt-10">Enigma Corp</Text>
        <Text className="font-normal text-lg mt-4">
          Your one stop financial solution
        </Text>
        <TouchableOpacity
          disabled={isLoading}
          onPress={() => router.push("/sign-in")}
          className="mt-32 bg-secondary px-6 py-3 rounded-full"
        >
          {isLoading ? (
            <ActivityIndicator size={"large"} />
          ) : (
            <Text className="text-white font-medium text-lg">Get Started</Text>
          )}
        </TouchableOpacity>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Index;
