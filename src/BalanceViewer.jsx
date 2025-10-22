import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Simple helper to get balance on a specific rpc
async function getBalanceForAddress(rpcUrl, address) {
  try {
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (err) {
    console.error("balance error", err);
    return null;
  }
}

export default function BalanceViewer({ account }) {
  const [sepoliaBal, setSepoliaBal] = useState(null);
  const [mainnetBal, setMainnetBal] = useState(null);

  useEffect(() => {
    if (!account) return;

    const sepoliaRpc = "https://sepolia.base.org"; // replace with working RPC if needed
    const mainnetRpc = "https://mainnet.base.org"; // replace with working RPC if needed

    let mounted = true;

    getBalanceForAddress(sepoliaRpc, account).then((b) => {
      if (mounted) setSepoliaBal(b);
    });
    getBalanceForAddress(mainnetRpc, account).then((b) => {
      if (mounted) setMainnetBal(b);
    });

    return () => {
      mounted = false;
    };
  }, [account]);

  if (!account) return <p>Please connect your wallet to view balances.</p>;

  return (
    <div>
      <h3>Balances for {account}</h3>
      <p>Base Sepolia: {sepoliaBal ?? "loading..."}</p>
      <p>Base Mainnet: {mainnetBal ?? "loading..."}</p>
    </div>
  );
}
