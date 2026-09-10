"use client"
import { UserDetailContext } from "@/context/UserDetailContext";
import axios from "axios";
import React, { useEffect } from "react";

function Provider({ children }: { children: React.ReactNode }) {
  const [userDetail, setUserDetail] = React.useState<any>(null);

  useEffect(() => {
    CreatenewUser();
  }, []);

  const CreatenewUser = async () => {
    try {
      const result = await axios.post('/api/users');
      console.log(result.data);
      setUserDetail(result.data);
    } catch (error) {
      console.log("User not logged in yet");
    }
  }

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  )
}

export default Provider;