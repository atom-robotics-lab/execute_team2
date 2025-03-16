# Content Verification DApp

A decentralized application for verifying and tracking content authenticity using blockchain technology.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MetaMask](https://metamask.io/) browser extension
- [Git](https://git-scm.com/)

## Quick Start

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd execute
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start the local Hardhat network**
```bash
npx hardhat node
```

4. **Deploy the smart contract**
In a new terminal:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

5. **Start the frontend application**
```bash
npm start
# or
yarn start
```

## Setting up MetaMask

1. Install the MetaMask browser extension
2. Create or import a wallet
3. Add Hardhat Network to MetaMask:
   - Network Name: `Hardhat Local`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency Symbol: `ETH`

4. Import a test account:
   - Open MetaMask
   - Click on the account icon
   - Select "Import Account"
   - Paste this private key: `0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e`

## Environment Setup

1. Create a `.env` file in the project root:
```env
REACT_APP_CONTRACT_ADDRESS=<deployed-contract-address>
REACT_APP_CHAIN_ID=31337
REACT_APP_ACCOUNT_ADDRESS=0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
REACT_APP_PRIVATE_KEY=0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e
```

## Features

- Connect MetaMask wallet
- Upload and verify content
- Track content modifications
- View content authenticity and history
- Display credibility scores
- Preview supported content types

## Troubleshooting

### Common Issues

1. **MetaMask Connection Issues**
   - Ensure MetaMask is installed and unlocked
   - Verify you're connected to the Hardhat Local network
   - Check if the account has sufficient test ETH

2. **Contract Interaction Errors**
   - Verify the contract is deployed (run deploy script)
   - Check if contract address in `.env` matches deployed address
   - Ensure you're using the correct network

3. **Content Upload Issues**
   - Check file size and type restrictions
   - Verify MetaMask transaction confirmations
   - Check console for detailed error messages

### Network Reset

If you encounter persistent issues, try:

1. Reset your Hardhat network:
```bash
# Stop the current Hardhat node
# Clear the network state
npx hardhat clean
# Restart the node
npx hardhat node
```

2. Reset MetaMask:
   - Open MetaMask
   - Settings > Advanced
   - Reset Account
   - Reconnect to the application

## Development

### Smart Contract Development

The smart contract is located in `contracts/ContentVerification.sol`. After making changes:

1. Compile the contract:
```bash
npx hardhat compile
```

2. Deploy changes:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

3. Update the contract address in `.env`

### Frontend Development

The React application is in the `src` directory. Key files:

- `src/features/blockchain-auth/components/VerificationTool.jsx`: Main component
- `src/features/blockchain-auth/services/blockchainService.js`: Blockchain interaction logic

## Production Deployment

For production deployment:

1. Update `.env` with production values:
```env
REACT_APP_CONTRACT_ADDRESS=<production-contract-address>
REACT_APP_CHAIN_ID=<mainnet-or-testnet-chain-id>
```

2. Build the application:
```bash
npm run build
# or
yarn build
```

3. Deploy the `build` folder to your hosting service

## License

[MIT License](LICENSE)

## Support

For issues and feature requests, please [open an issue](your-repo-url/issues).
