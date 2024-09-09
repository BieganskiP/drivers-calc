import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomButton from "@/components/CustomButton";
import { calculateEarnings } from "@/lib/calculateEarnings";
import { saveCalculation } from "@/lib/saveCalculation";

export default function Calculator() {
  const [grossEarnings, setGrossEarnings] = useState<string>("");
  const [netEarnings, setNetEarnings] = useState<string>("");
  const [cashCollected, setCashCollected] = useState<string>("");
  const [carCost, setCarCost] = useState<string>("");
  const [partnershipFee, setPartnershipFee] = useState<string>("");
  const [vatRefund, setVatRefund] = useState<string>("");
  const [result, setResult] = useState<null | ReturnType<
    typeof calculateEarnings
  >>(null);
  const [step, setStep] = useState<number>(1);

  const images = {
    coin: require("../../assets/icons/3d-coin-dynamic-gradient.png"),
    dollar: require("../../assets/icons/dollar-dynamic-gradient.png"),
    wallet: require("../../assets/icons/wallet-dynamic-gradient.png"),
    money: require("../../assets/icons/money-dynamic-gradient.png"),
  };

  const handleCalculate = () => {
    const data = {
      grossEarnings: parseFloat(grossEarnings) || 0,
      netEarnings: parseFloat(netEarnings) || 0,
      cashCollected: parseFloat(cashCollected) || 0,
      carCost: parseFloat(carCost) || 0,
      partnershipFee: parseFloat(partnershipFee) || 0,
      vatRefund: parseFloat(vatRefund) || 0,
    };

    const calculatedResult = calculateEarnings(data);
    setResult(calculatedResult);
    setStep(3);
  };

  const handleReset = () => {
    setGrossEarnings("");
    setNetEarnings("");
    setCashCollected("");
    setCarCost("");
    setPartnershipFee("");
    setVatRefund("");
    setResult(null);
    setStep(1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <View className="mt-12">
            <Image
              source={images.coin}
              style={{
                width: 150,
                height: 150,
                alignSelf: "center",
                marginBottom: 16,
              }}
            />
            <FormField
              title="Brutto"
              value={grossEarnings}
              placeholder="Wprowadź kwotę brutto"
              handleChangeText={setGrossEarnings}
              icon={<Icon name="dollar" size={20} color="#FF9C01" />}
            />
            <Text className="text-gray-200 font-light mb-6">
              Z tej kwoty obliczamy VAT (8%).
            </Text>

            <FormField
              title="Netto"
              value={netEarnings}
              placeholder="Wprowadź kwotę netto"
              handleChangeText={setNetEarnings}
              icon={<Icon name="money" size={20} color="#FF9C01" />}
            />
            <Text className="text-gray-200 font-light mb-6">
              Netto po odjęciu gotówki.
            </Text>

            <FormField
              title="Gotówka"
              value={cashCollected}
              placeholder="Wprowadź kwotę gotówki"
              handleChangeText={setCashCollected}
              icon={<Icon name="money" size={20} color="#FF9C01" />}
            />
            <Text className="text-gray-200 font-light mb-6">
              Kwota gotówki zebrana przez kierowcę w ciągu tygodnia.
            </Text>
          </View>
        );
      case 2:
        return (
          <View className="mt-12">
            <Image
              source={images.wallet}
              style={{
                width: 150,
                height: 150,
                alignSelf: "center",
                marginBottom: 16,
              }}
            />

            <FormField
              title="Koszt Samochodu"
              value={carCost}
              placeholder="Wprowadź koszt samochodu"
              handleChangeText={setCarCost}
              icon={<Icon name="car" size={20} color="#FF9C01" />}
            />
            <Text className="text-gray-200 font-light mb-6">
              Koszt samochodu, który zostanie odjęty od netto.
            </Text>

            <FormField
              title="Opłata Partnera"
              value={partnershipFee}
              placeholder="Wprowadź opłatę partnera"
              handleChangeText={setPartnershipFee}
              icon={<Icon name="handshake-o" size={20} color="#FF9C01" />}
            />
            <Text className="text-gray-200 font-light mb-6">
              Opłata partnera, która zostanie odjęta od netto.
            </Text>

            <FormField
              title="Zwrot VAT (opcjonalne)"
              value={vatRefund}
              placeholder="Wprowadź zwrot VAT (opcjonalne)"
              handleChangeText={setVatRefund}
              icon={<Icon name="percent" size={20} color="#FF9C01" />}
            />
            <Text className="text-gray-200 font-light mb-6">
              Opcjonalny zwrot VAT za paliwo lub inne koszty.
            </Text>
          </View>
        );
      case 3:
        return (
          result && (
            <>
              <View className="mt-6 space-y-4">
                <Text className="text-2xl font-bold mt-4 text-secondary">
                  Razem: {result.total} zł (Gotówka: {cashCollected} zł +
                  Przelew: {result.totalTransfer} zł)
                </Text>
              </View>
            </>
          )
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="px-4 pb-6">{renderStepContent()}</View>

          {step === 1 && (
            <CustomButton
              title="Dalej"
              handlePress={() => setStep(2)}
              icon={<Icon name="arrow-right" size={20} color="#FFFFFF" />}
              containerStyles="w-full"
            />
          )}
          {step === 2 && (
            <View className="flex-row justify-between">
              <CustomButton
                title="Wstecz"
                handlePress={() => setStep(1)}
                icon={<Icon name="arrow-left" size={20} color="#FFFFFF" />}
                containerStyles="w-1/2 border-r white"
              />
              <CustomButton
                title="Oblicz"
                handlePress={handleCalculate}
                icon={<Icon name="play" size={20} color="#FFFFFF" />}
                containerStyles="w-1/2"
              />
            </View>
          )}
          {step === 3 && (
            <>
              <CustomButton
                title="Zapisz Obliczenia"
                handlePress={() =>
                  saveCalculation({
                    grossEarnings: parseFloat(grossEarnings) || 0,
                    netEarnings: parseFloat(netEarnings) || 0,
                    cashCollected: parseFloat(cashCollected) || 0,
                    carCost: parseFloat(carCost) || 0,
                    partnershipFee: parseFloat(partnershipFee) || 0,
                    vatRefund: parseFloat(vatRefund) || 0,
                  })
                }
                icon={<Icon name="bookmark" size={20} color="#FFFFFF" />}
                containerStyles="w-full"
              />
              <CustomButton
                title="Reset"
                handlePress={handleReset}
                icon={<Icon name="refresh" size={20} color="#FFFFFF" />}
                containerStyles="w-full mt-4"
              />
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
