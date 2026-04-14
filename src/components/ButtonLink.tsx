import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { SiteLink } from './SiteLink'

type ButtonLinkProps = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'quiet'
  className?: string
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>

const variants = {
  primary:
    'bg-signal-teal text-carbon-950 hover:bg-steel-100 focus-visible:outline-signal-teal',
  secondary:
    'border border-steel-200/25 text-steel-100 hover:border-signal-teal hover:text-white focus-visible:outline-signal-teal',
  quiet:
    'text-steel-100 hover:text-signal-teal focus-visible:outline-signal-teal',
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonLinkProps) {
  return (
    <SiteLink
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </SiteLink>
  )
}
