// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ContentVerification {
    struct Content {
        string ipfsHash;
        address publisher;
        uint256 timestamp;
        string contentType;
        uint256 credibilityScore;
        bool isVerified;
        uint256 modificationsCount;
    }

    struct Modification {
        string ipfsHash;
        string description;
        uint256 timestamp;
        address modifiedBy;
    }

    struct Source {
        string name;
        uint256 credibilityScore;
        uint256 totalPublications;
        bool isVerified;
    }

    mapping(bytes32 => Content) public contents;
    mapping(bytes32 => mapping(uint256 => Modification)) public modifications;
    mapping(address => Source) public sources;

    event ContentPublished(bytes32 indexed contentId, string ipfsHash, address indexed publisher);
    event ContentModified(bytes32 indexed contentId, string ipfsHash, address indexed modifiedBy);
    event SourceRegistered(address indexed sourceAddress, string name);

    function publishContent(string memory ipfsHash, string memory contentType) public returns (bytes32) {
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");
        
        bytes32 contentId = keccak256(abi.encodePacked(ipfsHash, block.timestamp, msg.sender));
        
        contents[contentId] = Content({
            ipfsHash: ipfsHash,
            publisher: msg.sender,
            timestamp: block.timestamp,
            contentType: contentType,
            credibilityScore: sources[msg.sender].credibilityScore,
            isVerified: sources[msg.sender].isVerified,
            modificationsCount: 0
        });

        emit ContentPublished(contentId, ipfsHash, msg.sender);
        return contentId;
    }

    function modifyContent(bytes32 contentId, string memory newIpfsHash, string memory description) public {
        require(contents[contentId].publisher != address(0), "Content does not exist");
        
        uint256 modIndex = contents[contentId].modificationsCount;
        modifications[contentId][modIndex] = Modification({
            ipfsHash: newIpfsHash,
            description: description,
            timestamp: block.timestamp,
            modifiedBy: msg.sender
        });
        
        contents[contentId].modificationsCount++;
        emit ContentModified(contentId, newIpfsHash, msg.sender);
    }

    function registerSource(string memory name) public {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(sources[msg.sender].credibilityScore == 0, "Source already registered");
        
        sources[msg.sender] = Source({
            name: name,
            credibilityScore: 50, // Default score
            totalPublications: 0,
            isVerified: false
        });
        
        emit SourceRegistered(msg.sender, name);
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
        Content memory content = contents[contentId];
        require(content.publisher != address(0), "Content does not exist");
        
        return (
            content.ipfsHash,
            content.publisher,
            content.timestamp,
            content.contentType,
            content.credibilityScore,
            content.isVerified,
            content.modificationsCount
        );
    }

    function getModification(bytes32 contentId, uint256 index) public view returns (
        string memory ipfsHash,
        string memory description,
        uint256 timestamp,
        address modifiedBy
    ) {
        require(contents[contentId].publisher != address(0), "Content does not exist");
        require(index < contents[contentId].modificationsCount, "Modification index out of bounds");
        
        Modification memory mod = modifications[contentId][index];
        return (mod.ipfsHash, mod.description, mod.timestamp, mod.modifiedBy);
    }

    function getSource(address sourceAddress) public view returns (
        string memory name,
        uint256 credibilityScore,
        uint256 totalPublications,
        bool isVerified
    ) {
        Source memory source = sources[sourceAddress];
        require(bytes(source.name).length > 0, "Source not registered");
        
        return (
            source.name,
            source.credibilityScore,
            source.totalPublications,
            source.isVerified
        );
    }
} 