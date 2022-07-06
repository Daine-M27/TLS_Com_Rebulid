import React from "react";

const Dashboard = () => {
  const handleLogout = async () => {
    await axios.get("/api/auth/logout");
  };

  return (
    <>
      <div>Dashboard</div>
      <button onClick={() => handleLogout()}>Logout</button>
    </>
  );
};

export default Dashboard;
