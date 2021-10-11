import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";

export default function ConnectButton() {
    const { activateBrowserWallet, account } = useEthers();
    const etherBalance = useEtherBalance(account);

    function handleConnectWallet() {
        activateBrowserWallet();
    }

    return (
        <div id="connect-wallet">
            {account ? (
                <div>
                    <span className="wallet-element">
                        {etherBalance &&
                            parseFloat(formatEther(etherBalance)).toFixed(
                                3
                            )}{" "}
                        ETH
                    </span>
                    <span className="wallet-element">
                        {account &&
                            `${account.slice(0, 6)}...${account.slice(
                                account.length - 4,
                                account.length
                            )}`}
                    </span>
                </div>
            ) : (
                <button onClick={handleConnectWallet}>
                    Connect to a wallet
                </button>
            )}
        </div>
    );
}
