import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";

export default function Signup() {
  const router = useRouter();

  const { signUp } = useSignUp();
  const onSignUp = async () => {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    try {
      await signUp!.create({
        phoneNumber: fullPhoneNumber,
        firstName: firstName,
        lastName: lastName,
      });

      signUp!.preparePhoneNumberVerification();
      router.push({
        pathname: "/verify/[phone]",
        params: { phone: fullPhoneNumber },
      });
    } catch (error) {
      console.error("Error details:", JSON.stringify(error, null, 2));
    }
  };
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const keyboardVerticalOffset = Platform.OS === "ios" ? 90 : 0;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={defaultStyles.container}>
            <Text style={defaultStyles.header}>Let's Get Started!</Text>
            <Text style={defaultStyles.descriptionText}>
              Enter Your Phone Number. We will send you a confirmation code
              there.
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Country Code"
                placeholderTextColor={Colors.gray}
                value={countryCode}
                onChangeText={setCountryCode}
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Phone Number"
                keyboardType="numeric"
                placeholderTextColor={Colors.gray}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <Text style={{ flex: 1, fontSize: 24, fontWeight: "bold" }}>
                Enter your name
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="First Name"
                  keyboardType="default"
                  placeholderTextColor={Colors.gray}
                  value={firstName}
                  onChangeText={setFirstName}
                />
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Last Name"
                  keyboardType="default"
                  placeholderTextColor={Colors.gray}
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
            </View>

            <Link href={"/login"} replace asChild>
              <TouchableOpacity>
                <Text style={[defaultStyles.textLink, { textAlign: "center" }]}>
                  Already have an account? Log In
                </Text>
              </TouchableOpacity>
            </Link>

            <View style={{ flex: 1 }} />

            <TouchableOpacity
              style={[
                defaultStyles.pillButton,
                phoneNumber !== "" &&
                phoneNumber.length === 10 &&
                firstName.trim() !== "" &&
                lastName.trim() !== ""
                  ? styles.enabled
                  : styles.disabled,
                { marginBottom: 20 },
              ]}
              onPress={onSignUp}
            >
              <Text style={defaultStyles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 20,
    flexDirection: "row",
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});
