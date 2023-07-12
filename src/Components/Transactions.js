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

  return (
    <div className="transactions-container">
      <h1 className="account-total">Bank Account Total: ${totalAmount}</h1>
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
  );
}

export default Transactions;
