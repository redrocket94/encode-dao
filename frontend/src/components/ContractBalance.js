export default function ContractBalance() {
    function getContractBalance() {
        return 2.34;
    }

    const balance = getContractBalance();

    return (
        <div id="balance-widget">
            <h1 className="list-header">Total balance</h1>
            <span>{balance} ETH</span>
        </div>
    );
}
