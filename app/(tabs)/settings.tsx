import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Settings() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [carCost, setCarCost] = useState<string>("");
  const [partnershipFee, setPartnershipFee] = useState<string>("");
  const [isPersonalInfoModalVisible, setPersonalInfoModalVisible] =
    useState<boolean>(false);
  const [isCarInfoModalVisible, setCarInfoModalVisible] =
    useState<boolean>(false);

  const handleSavePersonalInfo = () => {
    setPersonalInfoModalVisible(false);
  };

  const handleSaveCarInfo = () => {
    setCarInfoModalVisible(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="px-4 pb-6">
            <Text className="text-2xl font-bold text-white mb-6">
              Ustawienia
            </Text>

            <View className="mb-6">
              <Text className="text-xl text-white mb-3">Dane Osobowe</Text>
              <CustomButton
                title="Edytuj Dane Osobowe"
                handlePress={() => setPersonalInfoModalVisible(true)}
                icon={<Icon name="user" size={20} color="#FFFFFF" />}
                containerStyles="w-full"
              />
            </View>

            <View className="mb-6">
              <Text className="text-xl text-white mb-3">
                Informacje o Samochodzie
              </Text>
              <CustomButton
                title="Edytuj Informacje o Samochodzie"
                handlePress={() => setCarInfoModalVisible(true)}
                icon={<Icon name="car" size={20} color="#FFFFFF" />}
                containerStyles="w-full"
              />
            </View>
          </View>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isPersonalInfoModalVisible}
          onRequestClose={() => setPersonalInfoModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
            <View className="bg-primary w-11/12 p-6 rounded-lg">
              <Text className="text-xl text-white font-bold mb-4">
                Dane Osobowe
              </Text>
              <FormField
                title="Imię"
                placeholder="Wprowadź imię"
                value={firstName}
                handleChangeText={setFirstName}
                otherStyles="mb-4"
              />
              <FormField
                title="Nazwisko"
                placeholder="Wprowadź nazwisko"
                value={lastName}
                handleChangeText={setLastName}
                otherStyles="mb-4"
              />
              <FormField
                title="Email"
                placeholder="Wprowadź email"
                value={email}
                handleChangeText={setEmail}
                otherStyles="mb-4"
              />

              <CustomButton
                title="Zapisz"
                handlePress={handleSavePersonalInfo}
                containerStyles="w-full"
              />
              <Pressable onPress={() => setPersonalInfoModalVisible(false)}>
                <Text className="text-red-500 text-center mt-4">Anuluj</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isCarInfoModalVisible}
          onRequestClose={() => setCarInfoModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
            <View className="bg-primary w-11/12 p-6 rounded-lg">
              <Text className="text-xl text-white font-bold mb-4">
                Informacje o Samochodzie
              </Text>
              <FormField
                title="Koszt Samochodu"
                placeholder="Wprowadź koszt samochodu"
                value={carCost}
                handleChangeText={setCarCost}
                otherStyles="mb-4"
              />
              <FormField
                title="Opłata Partnera"
                placeholder="Wprowadź opłatę partnera"
                value={partnershipFee}
                handleChangeText={setPartnershipFee}
                otherStyles="mb-4"
              />

              <CustomButton
                title="Zapisz"
                handlePress={handleSaveCarInfo}
                containerStyles="w-full"
              />
              <Pressable onPress={() => setCarInfoModalVisible(false)}>
                <Text className="text-red-500 text-center mt-4">Anuluj</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
