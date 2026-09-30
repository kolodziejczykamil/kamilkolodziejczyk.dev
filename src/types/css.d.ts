import "react";

declare module "react" {
  interface CSSProperties {
    "--diagram-delay"?: string;
    "--word-delay"?: string;
    "--rise-delay"?: string;
  }
}
