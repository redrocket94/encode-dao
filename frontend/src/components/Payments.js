import PaymentList from "./PaymentList";
import ContractBalance from "./ContractBalance";

export default function Payments() {
    return (
        <div id="payments-page" className="app-page">
            <PaymentList />
            <ContractBalance />
        </div>
    );
}
