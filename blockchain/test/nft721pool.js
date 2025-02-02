const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT721Pool", function () {
  let NFT721Pool;
  let nftPool;
  let owner;
  let user;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    // Развертывание контракта
    NFT721Pool = await ethers.getContractFactory("NFT721Pool");
    nftPool = await NFT721Pool.deploy();
  });

  describe("Minting NFTs", function () {
    it("should mint an NFT", async function () {
      await nftPool.mint();
      const tokenId = await nftPool.getAvailableNFT();
      expect(await nftPool.ownerOf(tokenId)).to.equal(nftPool.target);
    });
  });

  describe("Claiming NFTs", function () {
    it("should allow users to claim an NFT", async function () {
      await nftPool.mint();
      const tokenId = await nftPool.getAvailableNFT();

      // Пользователь может забрать NFT
      await nftPool.connect(user).claim();
      expect(await nftPool.ownerOf(tokenId)).to.equal(user.address);
    });

    it("should not allow claiming more than 5 NFTs", async function () {
      await nftPool.mint();
      await nftPool.connect(user).claim();
      await nftPool.connect(user).claim();
      await nftPool.connect(user).claim();
      await nftPool.connect(user).claim();
      await nftPool.connect(user).claim();

      await expect(nftPool.connect(user).claim()).to.be.revertedWith("Max 5 NFTs per user");
    });
  });

  describe("Returning NFTs", function () {
    it("should allow users to return an NFT", async function () {
      await nftPool.mint();
      const tokenId = await nftPool.getAvailableNFT();
      await nftPool.connect(user).claim();
      await nftPool.connect(user).returnNFT(tokenId);
      expect(await nftPool.ownerOf(tokenId)).to.equal(nftPool.target);
    });
  });
});
