import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NewForm() {
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;
  // console.log(id);

  const [transaction, setTransaction] = useState({
    item_name: "",
    amount: "",
    date: "",
    from: "",
    category: "",
  });

  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([
    "Food",
    "Rent",
    "Utilities",
    // Add initial categories here
  ]);

  const handleCategoryChange = (event) => {
    setTransaction({ ...transaction, category: event.target.value });
  };

  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleTextChange = (event) => {
    setTransaction({ ...transaction, [event.target.id]: event.target.value });
  };

  const addTransaction = (newTransaction) => {
    axios
      .post(`${API}/transactions`, newTransaction)
      .then((response) => {
        const id = response.data.id; //GET ID FROM BACKEND
        navigate(`/transactions/${id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTransaction(transaction);
  };

  const handleCategoryBlur = () => {
    if (newCategory.trim() !== "" && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  return (
    <div className="New">
      <form onSubmit={handleSubmit} className="new-form">
        <div className="form-group">
          <label htmlFor="date" className="label">
            Date:
          </label>
          <input
            className="input"
            id="date"
            type="text"
            value={transaction.date}
            placeholder="August 8, 2023"
            onChange={handleTextChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="item_name" className="label">
            Name:
          </label>
          <input
            className="input"
            id="item_name"
            value={transaction.item_name}
            type="text"
            onChange={handleTextChange}
            placeholder="Electricity"
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount" className="label">
            Amount:
          </label>
          <input
            className="input"
            id="amount"
            type="number"
            value={transaction.amount}
            placeholder="Amount"
            onChange={handleTextChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="from" className="label">
            From:
          </label>
          <input
            className="input"
            id="from"
            type="text"
            value={transaction.from}
            placeholder="Mom"
            onChange={handleTextChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category" className="label">
            Category:
          </label>
          <select
            className="input"
            id="category"
            value={transaction.category}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            className="input"
            type="text"
            placeholder="New Category"
            value={newCategory}
            onChange={handleNewCategoryChange}
            onBlur={handleCategoryBlur}
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
