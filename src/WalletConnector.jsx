import { useEffect, useState } from "react";

// This component attempts to use @coinbase/onchainkit to initialize/connect the
// wallet. If OnchainKit's exact API differs, adjust the calls below to match
// the SDK methods (for example: OnchainKit.init(), OnchainKit.connect(), etc.).
export default function WalletConnector({ onConnect }) {
  const [account, setAccount] = useState(null);
  const [providerName, setProviderName] = useState(null);

  // Try to dynamically import and initialize OnchainKit on mount.
  useEffect(() => {
    let mounted = true;

    async function initOnchainKit() {
      try {
        const mod = await import("@coinbase/onchainkit");
        const kit = mod?.default ?? mod;

        // If the SDK exposes an init method, call it. This is defensive — the
        // real SDK might have a different shape, so update as needed.
        if (kit && typeof kit.init === "function") {
          await kit.init();
        }

        // If the SDK exposes a method to get the connected account or provider,
        // use it to pre-populate state. Otherwise we'll wait for the user to
        // call connect().
        if (mounted && kit && typeof kit.getAccounts === "function") {
          const accs = await kit.getAccounts();
          if (accs && accs.length) {
            setAccount(accs[0]);
            onConnect?.(accs[0]);
            setProviderName("onchainkit");
          }
        }
      } catch (err) {
        // If import fails, OnchainKit isn't available — we'll fallback to
        // window.ethereum when connecting.
        console.debug("OnchainKit init failed", err);
      }
    }

    initOnchainKit();
    return () => {
      mounted = false;
    };
  }, [onConnect]);

  async function connect() {
    // Prefer OnchainKit if available
    try {
      const mod = await import("@coinbase/onchainkit");
      const kit = mod?.default ?? mod;

      // Try a few common shapes — SDKs vary, so adjust these to your installed
      // OnchainKit API. These checks are defensive; if none match we fall back
      // to window.ethereum.
      if (kit) {
        // common connect method
        if (typeof kit.connect === "function") {
          const result = await kit.connect();
          const address = result?.accounts?.[0] || result?.[0] || null;
          if (address) {
            setAccount(address);
            onConnect?.(address);
            setProviderName("onchainkit");
            return;
          }
        }

        // some kits expose request or getAccounts
        if (typeof kit.getAccounts === "function") {
          const accs = await kit.getAccounts();
          if (accs && accs.length) {
            setAccount(accs[0]);
            onConnect?.(accs[0]);
            setProviderName("onchainkit");
            return;
          }
        }
      }
    } catch (err) {
      // dynamic import or kit methods may fail — we'll fallback below
      console.debug("OnchainKit connect attempt failed", err);
    }

    // Fallback: use the injected provider (MetaMask / window.ethereum)
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
      onConnect?.(accounts[0]);
      setProviderName("injected");
    } catch (err) {
      console.error("connect error", err);
    }
  }

  return (
    <div>
      {account ? (
        <div>
          <p>
            Connected ({providerName ?? "unknown"}): {account}
          </p>
        </div>
      ) : (
        <button onClick={connect}>Connect Wallet (OnchainKit)</button>
      )}
    </div>
  );
}
