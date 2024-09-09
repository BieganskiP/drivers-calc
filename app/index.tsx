import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { useRouter, useFocusEffect, router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function index() {
  const { loading, isLogged } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const myRouter = useRouter();

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Signed in:", user);
      router.replace("/(tabs)/calculator" as any);
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (!loading && isLogged)
    useFocusEffect(() => {
      myRouter.replace("/(tabs)/calculator" as any);
    });

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-300">Wczytywanie...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-primary h-full px-6">
      <Text className="text-2xl font-bold mb-6 text-white">Sign In</Text>

      {error && <Text className="text-red-500 mb-4">{error}</Text>}

      <View className="w-full">
        <FormField
          title="Email"
          placeholder="Email"
          value={email}
          handleChangeText={setEmail}
          type="email"
          otherStyles="mb-4"
        />
        <FormField
          title="Password"
          placeholder="Password"
          value={password}
          handleChangeText={setPassword}
          type="password"
          otherStyles="mb-6"
        />
        <CustomButton title="Sign In" handlePress={handleSignIn} />
      </View>
    </SafeAreaView>
  );
}
