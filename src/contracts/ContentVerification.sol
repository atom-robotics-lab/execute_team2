// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ContentVerification is Ownable, ReentrancyGuard {
    struct Content {
        string ipfsHash;
        address publisher;
        uint256 timestamp;
        string contentType;
        uint256 credibilityScore;
        bool isVerified;
        Modification[] modifications;
    }

    struct Modification {
        string ipfsHash;
        string description;
        uint256 timestamp;
        address modifier;
    }

    struct Source {
        string name;
        uint256 credibilityScore;
        uint256 totalPublications;
        bool isVerified;
    }

    mapping(bytes32 => Content) public contents;
    mapping(address => Source) public sources;
    mapping(address => bool) public verifiers;

    event ContentPublished(bytes32 indexed contentId, string ipfsHash, address publisher);
    event ContentModified(bytes32 indexed contentId, string newIpfsHash, string description);
    event SourceRegistered(address indexed source, string name);
    event SourceVerified(address indexed source, bool verified);

    constructor() {
        verifiers[msg.sender] = true;
    }

    modifier onlyVerifier() {
        require(verifiers[msg.sender], "Not authorized as verifier");
        _;
    }

    function publishContent(
        string memory ipfsHash,
        string memory contentType
    ) public returns (bytes32) {
        bytes32 contentId = keccak256(abi.encodePacked(ipfsHash, block.timestamp, msg.sender));
        
        Content storage newContent = contents[contentId];
        newContent.ipfsHash = ipfsHash;
        newContent.publisher = msg.sender;
        newContent.timestamp = block.timestamp;
        newContent.contentType = contentType;
        newContent.credibilityScore = sources[msg.sender].credibilityScore;
        
        sources[msg.sender].totalPublications++;
        
        emit ContentPublished(contentId, ipfsHash, msg.sender);
        return contentId;
    }

    function modifyContent(
        bytes32 contentId,
        string memory newIpfsHash,
        string memory description
    ) public {
        Content storage content = contents[contentId];
        require(content.timestamp > 0, "Content does not exist");
        require(content.publisher == msg.sender, "Not the content publisher");

        Modification memory modification = Modification({
            ipfsHash: newIpfsHash,
            description: description,
            timestamp: block.timestamp,
            modifier: msg.sender
        });

        content.modifications.push(modification);
        emit ContentModified(contentId, newIpfsHash, description);
    }

    function verifyContent(bytes32 contentId) public onlyVerifier {
        Content storage content = contents[contentId];
        require(content.timestamp > 0, "Content does not exist");
        content.isVerified = true;
        content.credibilityScore = 100;
    }

    function registerSource(string memory name) public {
        require(sources[msg.sender].timestamp == 0, "Source already registered");
        
        sources[msg.sender] = Source({
            name: name,
            credibilityScore: 50,
            totalPublications: 0,
            isVerified: false
        });

        emit SourceRegistered(msg.sender, name);
    }

    function verifySource(address sourceAddress, bool verified) public onlyVerifier {
        require(sources[sourceAddress].timestamp > 0, "Source not registered");
        sources[sourceAddress].isVerified = verified;
        emit SourceVerified(sourceAddress, verified);
    }

    function getContent(bytes32 contentId) public view returns (
        string memory ipfsHash,
        address publisher,
        uint256 timestamp,
        string memory contentType,
        uint256 credibilityScore,
        bool isVerified,
        uint256 modificationsCount
    ) {
        Content storage content = contents[contentId];
        return (
            content.ipfsHash,
            content.publisher,
            content.timestamp,
            content.contentType,
            content.credibilityScore,
            content.isVerified,
            content.modifications.length
        );
    }

    function getModification(bytes32 contentId, uint256 index) public view returns (
        string memory ipfsHash,
        string memory description,
        uint256 timestamp,
        address modifier
    ) {
        Modification storage modification = contents[contentId].modifications[index];
        return (
            modification.ipfsHash,
            modification.description,
            modification.timestamp,
            modification.modifier
        );
    }

    function getSource(address sourceAddress) public view returns (
        string memory name,
        uint256 credibilityScore,
        uint256 totalPublications,
        bool isVerified
    ) {
        Source storage source = sources[sourceAddress];
        return (
            source.name,
            source.credibilityScore,
            source.totalPublications,
            source.isVerified
        );
    }
} 