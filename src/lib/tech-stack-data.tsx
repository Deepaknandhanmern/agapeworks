import {
  SiAngular,
  SiElevenlabs,
  SiFlutter,
  SiGoogleanalytics,
  SiLaravel,
  SiMysql,
  SiN8N,
  SiNextdotjs,
  SiPhp,
  SiPython,
  SiReact,
  SiShopify,
  SiWoocommerce,
  SiWordpress,
} from "react-icons/si";
import type { IconType } from "react-icons";

export type TechItem = {
  name: string;
  icon: IconType;
  color: string;
};

export const techStack: TechItem[] = [
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "React Native", icon: SiReact, color: "#61DAFB" },
  { name: "Flutter", icon: SiFlutter, color: "#02569B" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "WordPress", icon: SiWordpress, color: "#21759B" },
  { name: "WooCommerce", icon: SiWoocommerce, color: "#96588A" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
];

// Simple Icons has no "Higgsfield" brand mark yet — fall back to a plain
// monogram badge so the marquee still gets a consistent icon slot for it.
const HiggsfieldMark: IconType = ({ size = "1em", style, className }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    style={style}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="1" y="1" width="22" height="22" rx="6" fill="currentColor" />
    <text
      x="12"
      y="16.5"
      textAnchor="middle"
      fontFamily="Arial, sans-serif"
      fontWeight="700"
      fontSize="12"
      fill="#ffffff"
    >
      H
    </text>
  </svg>
);

// Broader "tools & platforms we work with" list for the homepage marquee —
// mixes core dev frameworks with the automation/AI/analytics tools client
// projects actually run on, as opposed to techStack's narrower dev-only list.
export const toolsWeUse: TechItem[] = [
  { name: "n8n", icon: SiN8N, color: "#EA4B71" },
  { name: "ElevenLabs", icon: SiElevenlabs, color: "#000000" },
  { name: "Higgsfield", icon: HiggsfieldMark, color: "#6D28D9" },
  { name: "Google Analytics", icon: SiGoogleanalytics, color: "#E37400" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Angular", icon: SiAngular, color: "#DD0031" },
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "WordPress", icon: SiWordpress, color: "#21759B" },
  { name: "Shopify", icon: SiShopify, color: "#95BF47" },
];
