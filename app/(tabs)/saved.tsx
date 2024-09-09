import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";
import { fetchUserEarnings, deleteEarningsData } from "@/lib/firebaseActions";

export default function SavedCalculations() {
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [selectedCalculation, setSelectedCalculation] =
    useState<Calculation | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchCalculationsFromFirestore = async () => {
    try {
      const userCalculations = await fetchUserEarnings();

      if (userCalculations) {
        setCalculations(userCalculations);
      }
    } catch (error) {
      console.error("Failed to load saved calculations from Firestore:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCalculationsFromFirestore();
    }, [])
  );

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchCalculationsFromFirestore();
    setIsRefreshing(false);
  };

  const openModal = (calculation: Calculation) => {
    setSelectedCalculation(calculation);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedCalculation(null);
    setModalVisible(false);
  };

  const handleDelete = async () => {
    if (selectedCalculation) {
      const filteredCalculations = calculations.filter(
        (item) => item !== selectedCalculation
      );
      setCalculations(filteredCalculations);
      deleteEarningsData(selectedCalculation.id);

      closeModal();
    }
  };

  const renderItem = ({ item }: { item: Calculation }) => (
    <TouchableOpacity
      className="p-4 border-b border-gray-200"
      onPress={() => openModal(item)}
    >
      <Text className="font-pmedium text-white">
        Brutto: {item.grossEarnings} zł
      </Text>
      <Text className="font-pmedium text-white">
        Netto: {item.netEarnings} zł
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <View className="px-6 py-4 flex-row justify-between items-center">
          <Text className="text-white text-2xl font-pbold">
            Zapisane Obliczenia
          </Text>

          <Pressable onPress={onRefresh} className="p-2">
            <Icon name="refresh" size={24} color="#FFFFFF" />
          </Pressable>
        </View>

        <FlatList
          data={calculations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <Text className="text-gray-300 text-center mt-10">
              Brak zapisanych obliczeń.
            </Text>
          }
        />

        {selectedCalculation && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
              <View className="bg-primary w-11/12 p-6 rounded-lg">
                <Text className="text-white text-2xl font-pbold mb-6 text-center">
                  Szczegóły Obliczeń
                </Text>

                <View className="mb-4 p-4 bg-gray-800 rounded-lg">
                  <View className="flex-row justify-between items-center">
                    <Icon name="money" size={24} color="#FFA500" />
                    <Text className="text-white font-pmedium">Brutto:</Text>
                    <Text className="text-white font-pbold">
                      {selectedCalculation.grossEarnings} zł
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center mt-2">
                    <Icon name="money" size={24} color="#FFA500" />
                    <Text className="text-white font-pmedium">Netto:</Text>
                    <Text className="text-white font-pbold">
                      {selectedCalculation.netEarnings} zł
                    </Text>
                  </View>
                </View>

                <View className="mb-4 p-4 bg-gray-800 rounded-lg">
                  <Text className="text-white text-lg font-psemibold mb-2">
                    Koszty:
                  </Text>
                  <View className="flex-row justify-between items-center">
                    <Icon name="car" size={24} color="#FFA500" />
                    <Text className="text-white font-pmedium">
                      Koszt Samochodu:
                    </Text>
                    <Text className="text-white font-pbold">
                      {selectedCalculation.carCost} zł
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center mt-2">
                    <Icon name="handshake-o" size={24} color="#FFA500" />
                    <Text className="text-white font-pmedium">
                      Opłata Partnera:
                    </Text>
                    <Text className="text-white font-pbold">
                      {selectedCalculation.partnershipFee} zł
                    </Text>
                  </View>
                </View>

                <View className="mb-4 p-4 bg-gray-800 rounded-lg">
                  <Text className="text-white text-lg font-psemibold mb-2">
                    VAT i Przelewy:
                  </Text>
                  <View className="flex-row justify-between items-center">
                    <Icon name="percent" size={24} color="#FFA500" />
                    <Text className="text-white font-pmedium">Zwrot VAT:</Text>
                    <Text className="text-white font-pbold">
                      {selectedCalculation.vatRefund} zł
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center mt-2">
                    <Icon name="percent" size={24} color="#FFA500" />
                    <Text className="text-white font-pmedium">
                      VAT (8% Brutto):
                    </Text>
                    <Text className="text-white font-pbold">
                      {selectedCalculation.vat} zł
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center mt-2">
                    <Icon name="arrow-right" size={24} color="#FFA500" />
                    <Text className="text-white font-pmedium">
                      Kwota do Przelewu:
                    </Text>
                    <Text className="text-white font-pbold">
                      {selectedCalculation.totalTransfer} zł
                    </Text>
                  </View>
                </View>

                <View className="mb-4 p-4 bg-gray-800 rounded-lg">
                  <View className="flex-row justify-between items-center">
                    <Icon name="money" size={24} color="#FFA500" />
                    <Text className="text-white font-psemibold">Razem:</Text>
                    <Text className="text-white font-pbold text-xl">
                      {selectedCalculation.total} zł
                    </Text>
                  </View>
                </View>

                <View className="mt-4 flex-row justify-between">
                  <Pressable
                    className="bg-red-600 p-3 rounded-lg items-center w-1/2 mr-2"
                    onPress={handleDelete}
                  >
                    <Icon name="trash" size={20} color="#FFFFFF" />
                  </Pressable>

                  <Pressable
                    className="bg-secondary p-3 rounded-lg items-center w-1/2"
                    onPress={closeModal}
                  >
                    <Text className="text-white font-pmedium">
                      <Icon name="times" size={20} color="#FFFFFF" /> Zamknij
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </SafeAreaView>
    </>
  );
}
