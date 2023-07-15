import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "../src/NavBar.css";

function NavBar() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const URL = process.env.REACT_APP_API_URL;

  const handleNewLogClick = () => {
    navigate("/transactions/new");
  };

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
    <nav className="navbar navbar-expand-lg navbar-light custom-nav">
      <Link
        className="navbar-brand"
        to="/transactions"
        style={{ color: "#E4D1CF", fontSize: "64px", paddingLeft: "45px" }}
      >
        Budget App
      </Link>
      <div className="total-amount"><h3>Amount: ${totalAmount}</h3></div>
      <div className="collapse navbar-collapse d-flex justify-content-end">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a
              href="/transactions/new"
              className="new-button"
              onClick={handleNewLogClick}
            >
              New transaction
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
