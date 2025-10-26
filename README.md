# Base Wallet Viewer

A React-based application that allows users to connect their wallet and view balances on Base Sepolia and Base Mainnet networks. Built with Vite, React, and OnchainKit.

## Live Demo

https://base-balance-viewer.vercel.app/

## Features

- Wallet connection using OnchainKit (with MetaMask fallback)
- View ETH balances on Base Sepolia and Base Mainnet
- Farcaster mini-app integration ready
- Modern React with hooks
- Fast development with Vite

## Prerequisites

- Node.js v22.12.0 or later
- pnpm (recommended) or npm
- A Web3 wallet (MetaMask or other Ethereum-compatible wallet)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/estheroche/Base-task2.git
   cd Base-task2
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
Base-task2/
├── public/
│   └── .well-known/
│       └── farcaster.json  # Farcaster mini-app manifest
├── src/
│   ├── App.jsx            # Main application component
│   ├── WalletConnector.jsx # Wallet connection logic (OnchainKit)
│   ├── BalanceViewer.jsx  # Balance display component
│   └── main.jsx          # Application entry point
├── index.html            # HTML template with Farcaster metadata
└── package.json         # Project dependencies and scripts
```

## Features In Detail

### Wallet Connection

The application uses OnchainKit for wallet connections with a fallback to the injected Web3 provider (MetaMask):

- Primary connection through OnchainKit
- Automatic fallback to MetaMask/injected provider if OnchainKit is unavailable
- Displays connection status and connected account address

### Balance Viewing

View your ETH balances across:

- Base Sepolia (testnet)
- Base Mainnet
  Balances are fetched using ethers.js and the respective network RPC endpoints.

### Farcaster Integration

The app is set up as a Farcaster mini-app with:

- Proper metadata for rich embeds
- Account association support
- Manifest file for Base app integration

## Configuration

### Network RPC Endpoints

The application uses the following RPC endpoints:

- Base Sepolia: `https://sepolia.base.org`
- Base Mainnet: `https://mainnet.base.org`

### Farcaster Configuration

To complete Farcaster mini-app setup:

1. Update `public/.well-known/farcaster.json` with your app details
2. Generate account association credentials using Base Build
3. Update the manifest with your credentials
4. Deploy to your domain

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm lint` - Run ESLint

### Environment Setup

Make sure you're using the correct Node.js version:

```bash
node -v  # Should be v22.12.0 or later
```

If needed, switch Node versions:

```bash
nvm use 22.12.0
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.
