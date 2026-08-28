import {
  SiFlutter,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiReact,
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
