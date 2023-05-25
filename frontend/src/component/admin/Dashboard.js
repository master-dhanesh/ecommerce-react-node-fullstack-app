import React from "react";
import Slidebar from "./Slidebar.js";
import "./Dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";

const Dashboard = () => {
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 4000],
      },
    ],
  };
  return (
    <div className="dashboard">
      <Slidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹2000
            </p>
          </div>
        </div>
        <div className="dashboardSummaryBox2">
          <Link to="/admin/products">
            <p>Product</p>
            <p>50</p>
          </Link>
          <Link to="/admin/orders">
            <p>Orders</p>
            <p>4</p>
          </Link>
          <Link to="/admin/users">
            <p>Users</p>
            <p>2</p>
          </Link>
        </div>

        <div className="lineChart">{/* <Line data={lineState} /> */}</div>
      </div>
    </div>
  );
};

export default Dashboard;
