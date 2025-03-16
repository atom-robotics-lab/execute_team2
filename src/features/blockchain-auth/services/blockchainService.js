import { ethers } from 'ethers';

const HARDHAT_CHAIN_ID = '0x7a69';
const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export class BlockchainService {
  constructor() {
    this.isInitialized = false;
    this.provider = null;
    this.signer = null;
    this.contract = null;
    this.publishedContentIds = new Set();
  }

  async initialize() {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed. Please install MetaMask to use this feature.');
    }

    try {
      // Connect to the provider
      this.provider = new ethers.BrowserProvider(window.ethereum);
      
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Get the signer
      this.signer = await this.provider.getSigner();
      
      // Get the network
      const network = await this.provider.getNetwork();
      const chainId = '0x' + network.chainId.toString(16);
      
      if (chainId !== HARDHAT_CHAIN_ID) {
        await this.switchNetwork();
      }

      // Initialize the contract
      const abi = [
        "function registerSource(string memory name) public",
        "function getSource(address sourceAddress) public view returns (string memory name, uint256 credibilityScore, uint256 totalPublications, bool isVerified)",
        "function publishContent(string memory ipfsHash, string memory contentType) public returns (bytes32)",
        "function getContent(bytes32 contentId) public view returns (string memory ipfsHash, address publisher, uint256 timestamp, string memory contentType, uint256 credibilityScore, bool isVerified, uint256 modificationsCount)",
        "function getModification(bytes32 contentId, uint256 index) public view returns (string memory ipfsHash, string memory description, uint256 timestamp, address modifiedBy)",
        "event ContentPublished(bytes32 indexed contentId, string ipfsHash, address indexed publisher)"
      ];
      
      this.contract = new ethers.Contract(CONTRACT_ADDRESS, abi, this.signer);
      
      // Listen for ContentPublished events
      this.contract.on("ContentPublished", (contentId, ipfsHash, publisher) => {
        console.log('Content published:', { contentId, ipfsHash, publisher });
        this.publishedContentIds.add(contentId);
      });

      this.isInitialized = true;
      console.log('Blockchain service initialized successfully');
      return true;
    } catch (error) {
      console.error('Initialization failed:', error);
      throw error;
    }
  }

  async switchNetwork() {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: HARDHAT_CHAIN_ID }],
      });
    } catch (error) {
      if (error.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: HARDHAT_CHAIN_ID,
              chainName: 'Hardhat Local',
              nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18
              },
              rpcUrls: ['http://127.0.0.1:8545']
            },
          ],
        });
      } else {
        throw error;
      }
    }
  }

  async uploadToIPFS(file) {
    try {
      // For development without IPFS, generate a mock hash
      const mockIpfsHash = `ipfs-mock-${Date.now()}-${file.name}`;
      console.log('Development mode: Generated mock IPFS hash:', mockIpfsHash);
      return mockIpfsHash;
    } catch (error) {
      console.error('IPFS upload failed:', error);
      throw new Error('Failed to upload file to IPFS');
    }
  }

  async publishContent(file, contentType) {
    if (!this.isInitialized) {
      throw new Error('Blockchain service not initialized');
    }

    try {
      // In development, use mock IPFS hash
      const ipfsHash = await this.uploadToIPFS(file);
      console.log('Publishing content with hash:', ipfsHash);

      // Publish content to blockchain
      const tx = await this.contract.publishContent(ipfsHash, contentType);
      const receipt = await tx.wait();
      
      // Find the ContentPublished event
      const event = receipt.logs
        .map(log => {
          try {
            return this.contract.interface.parseLog(log);
          } catch (e) {
            return null;
          }
        })
        .find(event => event && event.name === 'ContentPublished');

      if (!event) {
        throw new Error('Content published but event not found');
      }

      const contentId = event.args[0];
      this.publishedContentIds.add(contentId);

      return {
        contentId,
        ipfsHash,
        transactionHash: receipt.hash
      };
    } catch (error) {
      console.error('Publishing content failed:', error);
      throw error;
    }
  }

  async getPublishedContent() {
    if (!this.isInitialized) {
      throw new Error('Blockchain service not initialized');
    }

    try {
      const contentPromises = Array.from(this.publishedContentIds).map(async (contentId) => {
        try {
          const content = await this.contract.getContent(contentId);
          return {
            contentId,
            ipfsHash: content[0],
            publisher: content[1],
            timestamp: Number(content[2]),
            contentType: content[3],
            credibilityScore: Number(content[4]),
            isVerified: content[5],
            modificationsCount: Number(content[6])
          };
        } catch (error) {
          console.error(`Error fetching content ${contentId}:`, error);
          return null;
        }
      });

      const contents = await Promise.all(contentPromises);
      return contents.filter(content => content !== null);
    } catch (error) {
      console.error('Error fetching published content:', error);
      throw error;
    }
  }

  async getContent(contentId) {
    if (!this.isInitialized) {
      throw new Error('Blockchain service not initialized');
    }

    try {
      const content = await this.contract.getContent(contentId);
      return {
        contentId,
        ipfsHash: content[0],
        publisher: content[1],
        timestamp: Number(content[2]),
        contentType: content[3],
        credibilityScore: Number(content[4]),
        isVerified: content[5],
        modificationsCount: Number(content[6])
      };
    } catch (error) {
      console.error('Error fetching content:', error);
      throw error;
    }
  }

  async getContentHistory(contentId) {
    if (!this.isInitialized) {
      throw new Error('Blockchain service not initialized');
    }

    try {
      const content = await this.getContent(contentId);
      const modificationPromises = Array.from(
        { length: content.modificationsCount },
        (_, index) => this.contract.getModification(contentId, index)
      );

      const modifications = await Promise.all(modificationPromises);
      return modifications.map(mod => ({
        ipfsHash: mod[0],
        description: mod[1],
        timestamp: Number(mod[2]),
        modifiedBy: mod[3]
      }));
    } catch (error) {
      console.error('Error fetching content history:', error);
      throw error;
    }
  }

  async registerSource(name) {
    if (!this.isInitialized) {
      throw new Error('Blockchain service not initialized');
    }

    try {
      // First check if the source is already registered
      const currentAddress = await this.signer.getAddress();
      const source = await this.contract.getSource(currentAddress);
      
      // If we can get the source details without an error, it means the source exists
      if (source && source[0]) {
        console.log('Source already registered:', source);
        return {
          name: source[0],
          credibilityScore: source[1].toNumber(),
          totalPublications: source[2].toNumber(),
          isVerified: source[3],
          alreadyRegistered: true
        };
      }
    } catch (error) {
      // If getSource fails, it means the source doesn't exist, so we can proceed with registration
      console.log('Source not found, proceeding with registration');
    }

    try {
      console.log('Registering new source with name:', name);
      const tx = await this.contract.registerSource(name);
      const receipt = await tx.wait();
      console.log('Source registration successful:', receipt);
      
      // Get the updated source details
      const source = await this.contract.getSource(await this.signer.getAddress());
      return {
        name: source[0],
        credibilityScore: source[1].toNumber(),
        totalPublications: source[2].toNumber(),
        isVerified: source[3],
        alreadyRegistered: false
      };
    } catch (error) {
      console.error('Error registering source:', error);
      if (error.message.includes('Source already registered')) {
        throw new Error('This account is already registered as a source. Please use a different account or continue with your existing registration.');
      }
      throw error;
    }
  }

  async getSource(address) {
    if (!this.isInitialized) {
      throw new Error('Blockchain service not initialized');
    }

    try {
      const source = await this.contract.getSource(address);
      return {
        name: source[0],
        credibilityScore: Number(source[1]),
        totalPublications: Number(source[2]),
        isVerified: source[3]
      };
    } catch (error) {
      console.error('Error getting source:', error);
      // If the error indicates the source doesn't exist, return null instead of throwing
      if (error.message.includes('revert')) {
        return null;
      }
      throw error;
    }
  }

  // Helper method to get IPFS URL for content
  getIPFSUrl(ipfsHash) {
    return `https://ipfs.io/ipfs/${ipfsHash}`;
  }
}

// Export only the singleton instance
export const blockchainService = new BlockchainService(); 