import type { ReactNode } from "react";
import { NavigationContext, type Navigate } from "../utils/navigation-context";

export function NavigationProvider({
  navigate,
  children,
}: {
  navigate: Navigate;
  children: ReactNode;
}) {
  return (
    <NavigationContext.Provider value={navigate}>
      {children}
    </NavigationContext.Provider>
  );
}
