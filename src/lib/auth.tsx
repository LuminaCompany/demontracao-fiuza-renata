import { createContext, useContext, useState } from "react";
import { accounts, type Account } from "@/data/mock";

interface AuthContextType {
  currentAccount: Account;
  setCurrentAccount: (account: Account) => void;
  allAccounts: Account[];
}

const AuthContext = createContext<AuthContextType>({
  currentAccount: accounts[0],
  setCurrentAccount: () => {},
  allAccounts: accounts,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentAccount, setCurrentAccount] = useState<Account>(accounts[0]);

  return (
    <AuthContext.Provider value={{ currentAccount, setCurrentAccount, allAccounts: accounts }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
