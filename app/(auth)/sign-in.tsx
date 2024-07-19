import React, { useState } from "react";
import {
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  View,
  Alert,
} from "react-native";
import Images from "@/constants/Images";
import FormField from "@/components/FormField";
import ThemedButton from "@/components/ThemedButton";
import { Link } from "expo-router";
import { AuthRequest, signIn } from "@/server/auth";
import JWT from "expo-jwt";

const SignIn = () => {
  const initialState: AuthRequest = {
    username: "",
    password: "",
  };

  const [formValues, setFormValues] = useState<AuthRequest>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const res = await signIn(formValues);
      setFormValues(initialState);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="w-full items-center h-full min-h-[85vh] px-4 my-6 justify-center">
          <View className="flex flex-row gap-2 items-center">
            <Image source={Images.logo} className="w-20 h-20" />
            <Text className="text-4xl font-medium">Enigma Corp</Text>
          </View>
          <Text className="text-lg font-normal pt-3">
            Purchase first, pay later
          </Text>
          <View className="pt-12">
            <Text className="text-center font-semibold text-3xl px-16">
              Sign In to Enigma Corp
            </Text>
            <FormField
              placeHolder="John"
              formStyles="w-full mt-5"
              title={"Email"}
              value={formValues.username}
              handleChange={(e) =>
                setFormValues({ ...formValues, username: e })
              }
            />
            <FormField
              placeHolder="**********"
              formStyles="w-full mt-5"
              title={"Password"}
              value={formValues.password}
              handleChange={(e) =>
                setFormValues({ ...formValues, password: e })
              }
            />
            <ThemedButton
              text={"Sign In"}
              handlePress={handleSubmit}
              buttonStyle="mt-7 py-4"
              textStyle="text-lg font-semibold"
              disabled={isLoading}
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
