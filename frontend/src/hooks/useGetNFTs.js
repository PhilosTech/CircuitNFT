import { useState, useEffect } from "react";
import { contract } from "./useContract";

async function fetchNFTs(fetchFunction) {
  try {
    const tokenIds = await fetchFunction(); // get ID tokens

    const tokens = await Promise.all(
      tokenIds.map(async (tokenId) => {
        const tokenIdStr = tokenId.toString();

        const [tokenUri, owner] = await Promise.all([
          contract.read.tokenURI([tokenIdStr]),
          contract.read.ownerOf([tokenIdStr]),
        ]);

        // upload metadata
        const response = await fetch(tokenUri);
        const metadata = await response.json();

        return {
          tokenId: tokenIdStr,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/"),
          owner,
        };
      })
    );

    return tokens;
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return [];
  }
}

// hook for fetching NFTs with a different method
const useNFTs = (fetchFunction) => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNFTs = async () => {
      const fetchedNFTs = await fetchNFTs(fetchFunction);
      setNfts(fetchedNFTs);
      setLoading(false);
    };

    loadNFTs();
  }, [fetchFunction]);

  return { nfts, loading };
};

// export the hook
export const useAllMintedNFTs = () => useNFTs(() => contract.read.getAllMintedNFTs());
export const useAvailableNFTs = () => useNFTs(() => contract.read.getAvailableNFT());

export default useNFTs;
