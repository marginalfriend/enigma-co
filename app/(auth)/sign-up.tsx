import FormField from "@/components/FormField";
import ThemedButton from "@/components/ThemedButton";
import Images from "@/constants/Images";
import { Nasabah, signUp } from "@/server/auth";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SignUp = () => {
  const initialState: Nasabah = {
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    nik: "",
    birthDate: "",
    userName: "",
    password: "",
  };
  const [formValues, setFormValues] = useState<Nasabah>(initialState);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    if (currentDate) {
      setDate(currentDate);
      setFormValues({ ...formValues, birthDate: formatDate(currentDate) });
    }
  };

  const showMode = (currentMode: "time" | "date") => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      console.log(formValues);
      const res = await signUp(formValues);
      console.log(res);
      setFormValues(initialState);
      Alert.alert(
        "Welcome!",
        "You've signed up successfully, please sign in to confirm your account.",
        [
          {
            text: "Sign In",
            onPress: () => router.replace("/sign-in"),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="w-full items-center h-full min-h-[85vh] px-4 py-10 my-6 justify-center">
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
            <View className="justify-center pt-5 flex flex-row gap-2">
              <Text className="font-regular">Already have an account?</Text>
              <Link href="/sign-in" className="font-bold text-cyan-900">
                Sign In
              </Link>
            </View>
            <FormField
              placeHolder="John Doe"
              formStyles="w-full mt-5"
              keyboardType="default"
              title={"Full Name"}
              value={formValues.fullName}
              handleChange={(e) => setFormValues({ ...formValues, fullName: e })}
            />
            <FormField
              placeHolder="yourname@yourcompany.com"
              formStyles="w-full mt-5"
              keyboardType="email-address"
              title={"Email"}
              value={formValues.email}
              handleChange={(e) => setFormValues({ ...formValues, email: e })}
            />
            <FormField
              placeHolder="0855 5555 5555"
              keyboardType="phone-pad"
              formStyles="w-full mt-5"
              title={"Phone Number"}
              value={formValues.phoneNumber}
              handleChange={(e) =>
                setFormValues({ ...formValues, phoneNumber: e })
              }
            />
            <FormField
              placeHolder="Jl. Melati No. 59, Ragunan, South Jakarta"
              formStyles="w-full mt-5"
              title={"Address"}
              value={formValues.address}
              handleChange={(e) => setFormValues({ ...formValues, address: e })}
            />
            <FormField
              placeHolder="323232323232"
              keyboardType="numeric"
              formStyles="w-full mt-5"
              title={"NIK"}
              value={formValues.nik}
              handleChange={(e) => setFormValues({ ...formValues, nik: e })}
            />
            <Text className="pl-5 text-base font-medium mt-5">Birth Date</Text>
            <TouchableOpacity
              onPress={showDatepicker}
              className="p-5 border rounded-full"
            >
              <Text
                className={`${
                  !formValues.birthDate && "text-[#6C757D]"
                } font-light`}
              >
                {formValues.birthDate ? date.toDateString() : "Jan 1, 2003"}
              </Text>
            </TouchableOpacity>
            <FormField
              placeHolder="yourname"
              formStyles="w-full mt-5"
              title={"Username"}
              value={formValues.userName}
              handleChange={(e) =>
                setFormValues({ ...formValues, userName: e })
              }
            />
            <FormField
              placeHolder="password"
              formStyles="w-full mt-5"
              title={"Password"}
              value={formValues.password}
              handleChange={(e) =>
                setFormValues({ ...formValues, password: e })
              }
            />
            <FormField
              placeHolder="password"
              formStyles="w-full mt-5"
              title={"Confirm Password"}
              value={confirmPassword}
              handleChange={(e) => setConfirmPassword(e)}
            />
            <ThemedButton
              disabled={isLoading}
              text={"Sign Up"}
              handlePress={handleSubmit}
              buttonStyle="mt-7 py-4"
              textStyle="text-lg font-semibold"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
