import React from "react";
import axios from "axios";
import { useRouter } from "next/router";


const Dashboard = () => {
  const router = useRouter();
  
  const handleLogout = async () => {
    const user = await axios.get("/api/auth/logout");
    if (user.status === 200) {
      router.push('/')
    }
  };

  return (
    <>
      <div>Dashboard</div>
      <button onClick={() => handleLogout()}>Logout</button>
    </>
  );
};

export default Dashboard;
