import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;
//   console.log(API)

  const [transaction, setTransaction] = useState({
    item_name: "",
    amount: "",
    date: "",
    from: "",
    category: "",
  });

  const handleTextChange = (event) => {
    setTransaction({
      ...transaction,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`${API}/transactions/${id}`, transaction)
      .then((response) => {
        setTransaction(response.data);
        navigate(`/transactions/${id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get(`${API}/transactions/${id}`)
      .then((response) => {
        setTransaction(response.data);
        // console.log(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, navigate, API]);

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
            id="amount"
            type="number"
            value={transaction.amount}
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
            value={transaction.from}
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
            value={transaction.category}
            placeholder="Category"
            onChange={handleTextChange}
            required
          />
        </div>
        <br />
        <button type="submit" className="submit-button">
          <strong>Update item</strong>
        </button>
      </form>
    </div>
  );
}

export default EditForm;
