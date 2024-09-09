export const calculateEarnings = (data: EarningsData) => {
  const vat = data.grossEarnings * 0.08;
  const netAfterCash = data.netEarnings - data.cashCollected;
  const remainingNet = netAfterCash - data.carCost - data.partnershipFee - vat;
  const totalTransfer = remainingNet + data.vatRefund;
  const total = data.cashCollected + totalTransfer;

  return {
    vat: vat.toFixed(2),
    remainingNet: remainingNet.toFixed(2),
    totalTransfer: totalTransfer.toFixed(2),
    total: total.toFixed(2),
  };
};
