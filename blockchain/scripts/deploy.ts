import hardhat, { ethers } from "hardhat"

async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

async function main() {
    const [deployer] = await ethers.getSigners()

    const network = hardhat.network.name

    console.log(`[${network}] deployer address: ${deployer.address}`)

    const Test = await ethers.getContractFactory("NFT721Pool")

    const CONTRACT_Test = await Test.deploy()
    await CONTRACT_Test.waitForDeployment()
    console.log(`V3Deployer  deployed to ${CONTRACT_Test.target}`)
    if (network !== "localhost") {
    await hardhat.run("verify:verify", {
        address: CONTRACT_Test.target,
        constructorArguments: [],
    })
    }
    console.log("done!")
    process.exit(0)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exit(1)
})
