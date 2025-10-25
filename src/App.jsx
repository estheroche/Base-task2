import { useState, useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import "./App.css";
import WalletConnector from "./WalletConnector";
import BalanceViewer from "./BalanceViewer";

function App() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <div className="app-root">
      <header>
        <h1>Base Wallet Viewer</h1>
      </header>
      <main>
        <WalletConnector onConnect={(acct) => setAccount(acct)} />
        <BalanceViewer account={account} />
      </main>
    </div>
  );
}

export default App;
