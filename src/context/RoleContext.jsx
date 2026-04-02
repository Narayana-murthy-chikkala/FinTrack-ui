import { createContext, useContext, useState, useEffect } from "react";

const RoleContext = createContext(null);

const ROLE_STORAGE_KEY = "finance_dashboard_role";

const ROLES = {
  VIEWER: "viewer",
  ADMIN: "admin",
};

export function RoleProvider({ children }) {
  const [role, setRole] = useState(() => {
    try {
      const stored = localStorage.getItem(ROLE_STORAGE_KEY);
      return stored || ROLES.VIEWER;
    } catch {
      return ROLES.VIEWER;
    }
  });

  useEffect(() => {
    localStorage.setItem(ROLE_STORAGE_KEY, role);
  }, [role]);

  const switchRole = (newRole) => {
    if (Object.values(ROLES).includes(newRole)) {
      setRole(newRole);
    }
  };

  const canEdit = role === ROLES.ADMIN;
  const canAdd = role === ROLES.ADMIN;
  const canDelete = role === ROLES.ADMIN;

  return (
    <RoleContext.Provider
      value={{
        role,
        switchRole,
        canEdit,
        canAdd,
        canDelete,
        ROLES,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export const useRole = () => {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be within RoleProvider");
  return ctx;
};