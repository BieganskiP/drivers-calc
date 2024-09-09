import { addEarningsData } from "@/lib/firebaseActions";
import { calculateEarnings } from "./calculateEarnings";

export const saveCalculation = async (calculationData: {
  grossEarnings: number;
  netEarnings: number;
  cashCollected: number;
  carCost: number;
  partnershipFee: number;
  vatRefund: number;
}) => {
  try {
    const calculatedValues = calculateEarnings(calculationData);

    await addEarningsData({
      grossEarnings: calculationData.grossEarnings,
      netEarnings: calculationData.netEarnings,
      cashCollected: calculationData.cashCollected,
      carCost: calculationData.carCost,
      partnershipFee: calculationData.partnershipFee,
      vatRefund: calculationData.vatRefund,
      fine: 0,
      lastWeekOfMonth: false,
      result: parseFloat(calculatedValues.remainingNet),
      total: parseFloat(calculatedValues.total),
      totalTransfer: parseFloat(calculatedValues.totalTransfer),
      vat: parseFloat(calculatedValues.vat),
    });

    console.log("Calculation saved to Firestore!");
  } catch (error) {
    console.error("Error saving calculation: ", error);
  }
};
