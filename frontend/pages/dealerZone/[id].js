import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Dashboard from "../../components/Dashboard";
import { getLayout } from "../../components/Layout";

export async function getServerSideProps() {
  return {
    props: {
      title: "Dealer Zone",
    },
  };
}

export default function DealerZone() {
  const [user, setUser] = useState(null);

  const router = useRouter();
  const { id } = router.query
  console.log('dealerZone id', id);

  useEffect(() => {
    async function getUser() {
      const userData = await axios.get(`/api/users/${id}`)
      console.log('dealerZone userdata', {...userData.data.user})
      setUser({...userData.data.user})
    };
    
    if(id){
      getUser()
    }
    
  }, [id])
  
  if(user === null){
    return null
  }

  return (
    <>
      <h1>{user.email}</h1>
      <Dashboard />
    </>
  );
}

DealerZone.getLayout = getLayout;
