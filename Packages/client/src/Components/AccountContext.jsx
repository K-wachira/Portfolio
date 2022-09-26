import { useNavigate } from "react-router";
 
const { createContext, useState, useEffect } = require("react");

export const AccountContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({ loggedIn: true });
  const [profile, setProfile] = useState({});


  return (
    <AccountContext.Provider value={{ user, setUser, profile, setProfile }}>
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;