import { createContext, useState } from "react";

export let AdminToken = createContext()

export default function AdminTokenProvider(props){

     const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'))

     return<AdminToken.Provider value={{adminToken,setAdminToken}}>
          {props.children}
     </AdminToken.Provider>
} 