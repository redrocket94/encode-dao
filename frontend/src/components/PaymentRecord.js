export default function PaymentRecord(props) {
    return (
        <li className={`list-element ${props.paid ? "green" : "red"}`}>
            <span className="list-element-title">{props.month}</span>
            <span>{props.amount} ETH</span>
            <button disabled={props.paid}>Pay now!</button>
        </li>
    );
}
