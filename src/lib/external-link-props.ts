type ExternalLinkProps = {
  target?: "_blank";
  rel?: "noopener noreferrer";
};

export function externalLinkProps(href: string): ExternalLinkProps {
  return /^https?:\/\//.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
