import PaymentRecord from "./PaymentRecord";

export default function PaymentList() {
    function getPaymentList() {
        return [
            { month: "January 2021", amount: 0.06, paid: true },
            { month: "February 2021", amount: 0.06, paid: true },
            { month: "March 2021", amount: 0.06, paid: true },
            { month: "April 2021", amount: 0.06, paid: true },
            { month: "May 2021", amount: 0.06, paid: true },
            { month: "June 2021", amount: 0.06, paid: true },
            { month: "July 2021", amount: 0.06, paid: true },
            { month: "August 2021", amount: 0.07, paid: true },
            { month: "September 2021", amount: 0.07, paid: true },
            { month: "October 2021", amount: 0.07, paid: false },
            { month: "November 2021", amount: 0.07, paid: false },
            { month: "December 2021", amount: 0.07, paid: false },
        ];
    }

    const paymentList = getPaymentList();

    return (
        <div className="payment-list">
            <h1>Your payments</h1>
            {paymentList.map((record, idx) => (
                <PaymentRecord record={record} key={idx} />
            ))}
        </div>
    );
}
