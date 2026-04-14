export function normalizePath(pathname: string) {
  if (!pathname || pathname === '/') {
    return '/'
  }

  return pathname.replace(/\/$/, '')
}

export function getPathname(input: string) {
  const url = new URL(input, window.location.origin)
  return normalizePath(url.pathname)
}
