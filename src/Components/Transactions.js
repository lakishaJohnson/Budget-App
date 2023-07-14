import { useEffect, useState } from "react";
import axios from "axios";

// import NewForm from "./NewForm";
import "../budget.css";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${URL}/transactions`)
      .then((response) => {
        setTransactions(response.data);
        const amountSum = response.data.reduce(
          (sum, transaction) => sum + parseFloat(transaction.amount),
          0
        );
        setTotalAmount(amountSum.toFixed(2));
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, [URL]);

  const totalAmountClass =
    totalAmount > 100
      ? "account-total account-total-yellow"
      : totalAmount > 0
      ? "account-total account-total-normal"
      : "account-total account-total-red";

  return (
    <div>
      <h1 className={totalAmountClass}>Bank Account Total: ${totalAmount}</h1>
      <div className="transactions-container">
        <table className="custom-table">
          <tbody>
            {transactions.map((transaction, index) => (
              <tr className="table-row" key={index}>
                <td className="table-cell">{transaction.date}</td>
                <td className="table-cell">
                  <a href={`/transactions/${transaction.id}`}>
                    {transaction.category}
                  </a>
                </td>
                <td className="table-cell">{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;
