import { useEffect, useState } from "react";
import { getContract, http, createPublicClient } from "viem";
import { hardhat, sepolia } from "viem/chains";
import contractABI from "../ABI/NFT721Pool.json";
import { contractAddressHardHat, contractAddressSepolia } from "../config/config";

const client = createPublicClient({
  chain: hardhat,
  transport: http("http://127.0.0.1:8545"),
});

let gasPrice = undefined;
try {
  gasPrice = await client.getGasPrice();
} catch (error) {
  console.error("Error getting gasPrice:", error);
}

console.log(gasPrice);


const clientSepolia = createPublicClient({
  chain: sepolia,
  transport: http(),
});

export const contract = getContract({
  address: contractAddressHardHat,
  abi: contractABI,
  client: gasPrice ? client : clientSepolia,
});

export function useContractData() {
  const [name, setName] = useState(null);
  const [symbol, setSymbol] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        
        const [fetchedName, fetchedSymbol, fetchedBalance] = await Promise.all([
          contract.read.name(),
          contract.read.symbol(),
          contract.read.balanceOf([contractAddressHardHat]),
        ]);

        setName(fetchedName);
        setSymbol(fetchedSymbol);
        setBalance(fetchedBalance);
      } catch (error) {
        console.error("Error fetching contract data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { name, symbol, balance, loading };
}
