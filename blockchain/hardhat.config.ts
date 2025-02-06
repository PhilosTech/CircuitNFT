import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import dotenv from "dotenv"

dotenv.config()

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    sepolia_mainnet: {
      url: "https://ethereum-sepolia-rpc.publicnode.com",
      chainId: 11155111,
      accounts: [`${process.env.PRIVATE_KEY}`]
    },
  },
  etherscan: {
    apiKey: {
      mainnet: `${process.env.ETHERSCAN_API_KEY}`,
      sepolia_mainnet: `${process.env.ETHERSCAN_API_KEY}`,
    },
    customChains: [
      {
        network: "sepolia_mainnet",
        chainId: 1088,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/mainnet/evm/1088/etherscan",
          browserURL: "https://andromeda-explorer.metis.io"
        }
      }]
  }
}

export default config
