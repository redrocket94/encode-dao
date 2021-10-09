import PaymentList from "./PaymentList";
import ContractBalance from "./ContractBalance";

export default function Payments() {
    return (
        <div className="payments-page">
            <PaymentList />
            <ContractBalance />
        </div>
    );
}
