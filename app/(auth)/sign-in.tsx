import React from "react";
import { Text, Image, SafeAreaView, ScrollView, View } from "react-native";
import Images from "@/constants/Images";
import FormField from "@/components/FormField";
import ThemedButton from "@/components/ThemedButton";
import { Link } from "expo-router";

const SignIn = () => {
  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="w-full items-center h-full min-h-[85vh] px-4 my-6 justify-center">
          <View className="flex flex-row gap-2 pt-10 items-center">
            <Image source={Images.logo} className="w-10 h-10" />
            <Text className="text-2xl font-medium">Enigma Corp</Text>
          </View>
          <Text className="text-lg font-normal pt-5">
            Purchase first, pay later
          </Text>
          <View className="pt-12">
            <Text className="text-center font-bold text-3xl px-16">
              Sign In to Enigma Corp
            </Text>
            <FormField
              formStyles="w-full mt-5"
              title={"Email"}
              value={""}
              handleChange={function (text: string): void {
                throw new Error("Function not implemented.");
              }}
            />
            <FormField
              formStyles="w-full mt-5"
              title={"Password"}
              value={""}
              handleChange={function (text: string): void {
                throw new Error("Function not implemented.");
              }}
            />
            <ThemedButton
              text={"Sign In"}
              handlePress={function (e: any): void {
                throw new Error("Function not implemented.");
              }}
              buttonStyle="mt-7 py-4"
              textStyle="text-lg font-semibold"
            />
          </View>
          <View className="justify-center pt-5 flex flex-row gap-2">
            <Text className="font-regular">Don't have an account?</Text>
            <Link href="/sign-up" className="font-bold text-cyan-900">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
