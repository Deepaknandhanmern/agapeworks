export type Project = {
  name: string;
  url: string | null;
  description: string;
  /**
   * Set when the live site blocks iframe embedding (X-Frame-Options/CSP).
   * A static screenshot is shown instead of a live iframe preview.
   */
  screenshot?: string;
};

export const projects: Project[] = [
  {
    name: "Zenvyra Cleaning",
    url: "https://zenvyracleaning.in",
    description: "Cleaning services website built and launched by Agape Works.",
  },
  {
    name: "UCX Group",
    url: "https://ucx-group.com",
    description: "Corporate website built and launched by Agape Works.",
    screenshot: "/portfolio/ucx-group.png",
  },
  {
    name: "Kathir Solar Solutions",
    url: "https://kathirsolarsolutions.in",
    description: "Solar energy company website built and launched by Agape Works.",
  },
];
