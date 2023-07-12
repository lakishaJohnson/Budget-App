import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NewForm() {
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_API_URL;

  const [transactions, setTransactions] = useState({
    item_name: "",
    amount: 0,
    date: "",
    from: "",
    category: "",
  });

  const handleTextChange = (event) => {
    setTransactions({ ...transactions, [event.target.id]: event.target.value });
  };

  const addTransaction = (newTransaction) => {
    axios
      .post(`${URL}/transactions`, newTransaction)
      .then(() => navigate("/transactions"))
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTransaction(transactions);
  };

  return (
    <div className="New">
      <form onSubmit={handleSubmit} className="new-form">
        <div className="form-group">
          <label htmlFor="date" className="label">
            Date:
          </label>
          <input
            id="date"
            type="text"
            value={transactions.date}
            placeholder="August 8, 2023"
            onChange={handleTextChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="item_name" className="label">
            Name:
          </label>
          <input
            id="item_name"
            value={transactions.item_name}
            type="text"
            onChange={handleTextChange}
            placeholder="Electricity"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount" className="label">
            Amount:
          </label>
          <input
            id="amount"
            type="number"
            value={transactions.amount}
            placeholder="amount"
            onChange={handleTextChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="from" className="label">
            From:
          </label>
          <input
            id="from"
            type="text"
            value={transactions.from}
            placeholder="Mom"
            onChange={handleTextChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category" className="label">
            Category:
          </label>
          <br />
          <input
            id="category"
            type="text"
            value={transactions.category}
            placeholder="Category"
            onChange={handleTextChange}
          />
        </div>
        <br />
        <button type="submit" className="submit-button">
          <strong>Create new item</strong>
        </button>
      </form>
    </div>
  );
}

export default NewForm;
