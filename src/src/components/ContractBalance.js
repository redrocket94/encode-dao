export default function ContractBalance() {
    function getContractBalance() {
        return 2.34;
    }

    const balance = getContractBalance();

    return (
        <div className="balance-widget">
            <h1>Total balance</h1>
            <p>{balance} ETH</p>
        </div>
    );
}
