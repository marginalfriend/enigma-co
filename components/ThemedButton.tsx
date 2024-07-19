import React from "react";
import { Text, TouchableOpacity } from "react-native";

export type ButtonProps = {
  isLoading?: boolean;
  buttonStyle?: string;
  textStyle?: string;
  text: string;
  disabled: boolean;
  handlePress: (e: any) => void;
};

const ThemedButton = ({
  isLoading,
  text,
  handlePress,
  buttonStyle,
  textStyle,
  disabled,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={handlePress}
      className={`bg-secondary px-6 py-3 rounded-full ${
        isLoading ? "opacity-50" : ""
      } ${buttonStyle}`}
      activeOpacity={0.6}
    >
      <Text
        className={`font-regular text-white text-[16px] text-center ${textStyle}`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ThemedButton;
