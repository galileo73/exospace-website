import { createContext, useContext } from 'react'

export type Navigate = (href: string) => void

export const NavigationContext = createContext<Navigate | null>(null)

export function useNavigation() {
  const navigate = useContext(NavigationContext)

  if (!navigate) {
    throw new Error('useNavigation must be used inside NavigationProvider')
  }

  return navigate
}
