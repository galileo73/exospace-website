import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { useNavigation } from "../utils/navigation-context";

type SiteLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export function SiteLink({ href, onClick, children, ...props }: SiteLinkProps) {
  const navigate = useNavigation();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.button !== 0 ||
      !href.startsWith("/")
    ) {
      return;
    }

    event.preventDefault();
    navigate(href);
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
