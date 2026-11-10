import { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Context = createContext();

const Provider = ({ children }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("users")));
    setUsers(JSON.parse(localStorage.getItem("users")));
  }, []);
  return (
    <Context.Provider value={{ users, setUsers }}>{children}</Context.Provider>
  );
};
export { Context, Provider };
