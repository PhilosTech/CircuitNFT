// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFT721Pool is
    ERC721URIStorage,
    Ownable,
    IERC721Receiver,
    ReentrancyGuard
{
    using Counters for Counters.Counter;
    using EnumerableSet for EnumerableSet.UintSet;
    using Strings for uint256;

    Counters.Counter private _tokenIdCounter;
    uint256[] private _availableTokens;
    mapping(address => EnumerableSet.UintSet) private _ownedTokens;
    string private _baseTokenURI;

    event NFTMinted(uint256 tokenId);
    event NFTClaimed(address indexed user, uint256 tokenId);
    event NFTReturned(address indexed user, uint256 tokenId);

    constructor() ERC721("NFT721Pool", "NP") {
        for (uint256 i = 0; i < 10; i++) {
            uint256 tokenId = _tokenIdCounter.current();
            _mint(address(this), tokenId);
            _setTokenURI(
                tokenId,
                string.concat(_baseURI(), tokenId.toString(), ".json")
            ); // set tokenURI metadata
            _availableTokens.push(tokenId);
            emit NFTMinted(tokenId);
            _tokenIdCounter.increment();
        }
        _baseTokenURI = "https://ipfs.io/ipfs/bafybeiefbotf6j7krwhampf7vbzavcslx3t2neo7kvb7vhx2oai7agebwy/";
    }

    function mint() external onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(msg.sender, tokenId); // mint NFT
        _setTokenURI(
            tokenId,
            string.concat(_baseURI(), tokenId.toString(), ".json")
        ); // set tokenURI metadata
        emit NFTMinted(tokenId);
    }

    // claim NFT from pool
    function claim() external nonReentrant {
        require(_availableTokens.length > 0, "No available NFTs");
        require(_ownedTokens[msg.sender].length() < 5, "Max 5 NFTs per user");

        uint256 tokenId = _availableTokens[_availableTokens.length - 1];
        _availableTokens.pop();

        _transfer(address(this), msg.sender, tokenId);
        _ownedTokens[msg.sender].add(tokenId);

        emit NFTClaimed(msg.sender, tokenId);
    }

    // return NFT to pool
    function returnNFT(uint256 tokenId) external nonReentrant {
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        require(_ownedTokens[msg.sender].contains(tokenId), "Token not owned");

        _transfer(msg.sender, address(this), tokenId);
        _ownedTokens[msg.sender].remove(tokenId);
        _availableTokens.push(tokenId);

        emit NFTReturned(msg.sender, tokenId);
    }

    // get available NFT
    function getAvailableNFT() external view returns (uint256[] memory) {
        return _availableTokens;
    }

    // get user NFTs
    function getUserNFTs(
        address user
    ) external view returns (uint256[] memory) {
        return _ownedTokens[user].values();
    }

    // get all minted NFTs
    function getAllMintedNFTs() external view returns (uint256[] memory) {
        uint256 totalTokens = _tokenIdCounter.current();
        uint256[] memory mintedTokens = new uint256[](totalTokens);

        for (uint256 i = 0; i < totalTokens; i++) {
            mintedTokens[i] = i;
        }

        return mintedTokens;
    }

    // set baseURI
    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    // ERC721Receiver implementation
    function onERC721Received(
        address,
        address,
        uint256,
        bytes memory
    ) public virtual override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    // disable transfers
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override(ERC721, IERC721) {
        require(
            to == address(this) || from == address(this),
            "Transfers disabled"
        );
        super.transferFrom(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public override(ERC721, IERC721) {
        require(
            to == address(this) || from == address(this),
            "Transfers disabled"
        );
        super.safeTransferFrom(from, to, tokenId, data);
    }

    // internal function to get baseURI
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
}
