import { useState } from "react";

export default function WalletConnector({ onConnect }) {
  const [account, setAccount] = useState(null);

  async function connect() {
    if (!window.ethereum) {
      alert(
        "No Ethereum provider found. Install MetaMask or a compatible wallet."
      );
      return;
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      onConnect(accounts[0]);
    } catch (err) {
      console.error("connect error", err);
    }
  }

  return (
    <div>
      {account ? (
        <div>
          <p>Connected: {account}</p>
        </div>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
}
