import React, { useEffect, useState } from "react";
import axios from "axios";
import "../budget.css"

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${URL}/transactions`);
        setTransactions(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [URL]);

  return (
    <div className="transactions-container">
      <h1 className="account-total">Bank Account Total: 0</h1>
      <table>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
