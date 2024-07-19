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
import { Nasabah, signUp } from "@/server/auth";

const SignUp = () => {
  const [formValues, setFormValues] = useState<Nasabah>({
    email: "",
    phoneNumber: "",
    address: "",
    nik: "",
    birthDate: "",
    userName: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {

      const res = await signUp(formValues);

    } catch (error: any) {

      Alert.alert("Error", error.message);

    }
  };

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
              Sign Up to Enigma Corp
            </Text>
            <FormField
              formStyles="w-full mt-5"
              title={"Email"}
              value={formValues.email}
              handleChange={(e) => setFormValues({ ...formValues, email: e })}
            />
            <FormField
              formStyles="w-full mt-5"
              title={"Phone Number"}
              value={formValues.phoneNumber}
              handleChange={(e) =>
                setFormValues({ ...formValues, phoneNumber: e })
              }
            />
            <FormField
              formStyles="w-full mt-5"
              title={"Address"}
              value={formValues.address}
              handleChange={(e) => setFormValues({ ...formValues, address: e })}
            />
            <FormField
              formStyles="w-full mt-5"
              title={"NIK"}
              value={formValues.nik}
              handleChange={(e) => setFormValues({ ...formValues, nik: e })}
            />
            {/* <FormField
              formStyles="w-full mt-5"
              title={"Birth Date"}
              value={formValues.birthDate}
              handleChange={(e) => setFormValues({ ...formValues, birthDate: e })}
            /> */}
            <FormField
              formStyles="w-full mt-5"
              title={"Username"}
              value={formValues.userName}
              handleChange={(e) =>
                setFormValues({ ...formValues, userName: e })
              }
            />
            <FormField
              formStyles="w-full mt-5"
              title={"Password"}
              value={formValues.password}
              handleChange={(e) =>
                setFormValues({ ...formValues, password: e })
              }
            />
            <FormField
              formStyles="w-full mt-5"
              title={"Confirm Password"}
              value={confirmPassword}
              handleChange={(e) => setConfirmPassword(e)}
            />
            <ThemedButton
              text={"Sign Up"}
              handlePress={function (e: any): void {
                throw new Error("Function not implemented.");
              }}
              buttonStyle="mt-7 py-4"
              textStyle="text-lg font-semibold"
            />
          </View>
          <View className="justify-center pt-5 flex flex-row gap-2">
            <Text className="font-regular">Already have an account?</Text>
            <Link href="/sign-in" className="font-bold text-cyan-900">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
