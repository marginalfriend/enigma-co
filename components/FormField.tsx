import {
  TouchableOpacity,
  View,
  Text,
  KeyboardType,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import Icons from "@/constants/Icons";

export type FormFieldProps = {
  title: string;
  value: string;
  formStyles?: string;
  handleChange: (text: string) => void;
  keyboardType?: KeyboardType;
  placeHolder?: string;
};
const FormField = ({
  title,
  value,
  formStyles,
  placeHolder,
  handleChange,
  keyboardType,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${formStyles}`}>
      <Text className="pl-5 text-base font-medium">{title}</Text>
      <View className="flex flex-row w-full h-16 px-4 bg-midground border-[0.9px] focus:border focus:border-highlight items-center rounded-full">
        <TextInput
          className="w-full flex-1 text-black font-light text-base"
          value={value}
          placeholder={placeHolder}
          placeholderTextColor="#6C757D"
          onChangeText={handleChange}
          secureTextEntry={
            (title === "Password" || title === "Confirm Password") &&
            !showPassword
          }
          keyboardType={keyboardType}
        />

        {(title === "Password" || title === "Confirm Password") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              className="w-6 h-6"
              resizeMode="contain"
              source={!showPassword ? Icons.shown : Icons.hidden}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
