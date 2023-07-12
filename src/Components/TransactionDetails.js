import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function TransactionDetails() {
  const [transactions, setTransactions] = useState({});
  // eslint-disable-next-line
  const [error, setError] = useState(null);

  let { id } = useParams();
  //   const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/transactions/${id}`)
      .then((response) => {
        setTransactions(response.data);
        //   console.log(response.data)
      })
      .catch((error) => {
        setError(error);
      });
  }, [id, setError]);

  return (
    <article>
      <div className="card-container">
        <div className="card showCard">
          <h2 className="title">{transactions.category}</h2>
          <p><strong>Item name:</strong> {transactions.item_name}</p>
          <p>
            <strong>Item amount:</strong> ${transactions.amount}
          </p>
          <p><strong>Date:</strong> {transactions.date}</p>
          <p><strong>From:</strong> {transactions.from}</p>
        </div>
      </div>
      <div className="buttons">
        <div>
          {" "}
          <Link to={`/transactions`}>
            <button className="button">Back</button>
          </Link>
        </div>
        <div>
          {" "}
          <a href={`/transactions/${transactions.id}/edit`}>
            <button className="button">Edit</button>
          </a>
        </div>
        <div>
          {" "}
          <button className="button">Delete</button>
        </div>
      </div>
    </article>
  );
}

export default TransactionDetails;
