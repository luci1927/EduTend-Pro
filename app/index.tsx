import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { login } from "./image";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const router = useRouter();

  // Listen to keyboard events
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  async function handleLogin() {
    const user = { username, role: "admin" };
    if (username === "admin" && password === "1234") {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      router.replace("/dashboard");
    } else {
      Alert.alert("Login Failed", "Invalid username or password.");
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Text style={styles.appTitle}>EduTend Pro</Text>

          {/* Hide logo when keyboard is visible */}
          {!keyboardVisible && (
            <Image source={login} style={styles.logo} resizeMode="contain" />
          )}

          <View style={styles.form}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              placeholder="Enter your username"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
            />

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F6F9",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  appTitle: {
    fontSize: 50,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 24,
  },
  form: {
    width: "100%",
    backgroundColor: "#FFF",
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    marginBottom: 6,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
    marginBottom: 16,
    color: "#333",
  },
  button: {
    height: 52,
    backgroundColor: "#2E7D32",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#2E7D32",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
