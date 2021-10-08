export default function PaymentRecord(props) {
    const { month, amount, paid } = props.record;
    return (
        <div className={`payment-record ${paid ? "green" : "red"}`}>
            <p>{month}</p>
            <p>{amount} ETH</p>
            <button disabled={paid}>Pay now!</button>
        </div>
    );
}
