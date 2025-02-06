import { useState } from "react";
import { createWalletClient, custom } from "viem";
import { sepolia } from "viem/chains";

const walletClient = createWalletClient({
  chain: sepolia,
  transport: custom(window.ethereum),
});

const useWallet = () => {
  const [address, setAddress] = useState(null);

  const connectWallet = async () => {
    try {
      const [userAddress] = await walletClient.requestAddresses();
      setAddress(userAddress);
    } catch (error) {
      console.error("error to connect:", error);
    }
  };

  return { address, connectWallet };
};

export default useWallet;
