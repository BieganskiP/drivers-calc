interface EarningsData {
  grossEarnings: number;
  netEarnings: number;
  cashCollected: number;
  carCost: number;
  partnershipFee: number;
  vatRefund: number;
}

interface Calculation {
  id: string;
  grossEarnings: number;
  netEarnings: number;
  cashCollected: number;
  carCost: number;
  partnershipFee: number;
  vatRefund: number;
  vat: number;
  totalTransfer: number;
  total: number;
  remainingNet: number;
}
