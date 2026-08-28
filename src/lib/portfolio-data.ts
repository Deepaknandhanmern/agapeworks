export type Project = {
  name: string;
  url: string | null;
  description: string;
};

export const projects: Project[] = [
  {
    name: "Zenvyra Cleaning",
    url: "https://www.zenvyracleaning.com",
    description: "Cleaning services website built and launched by Agape Works.",
  },
  {
    name: "UCX Group",
    url: "https://www.ucx-group.com",
    description: "Corporate website built and launched by Agape Works.",
  },
  {
    name: "Coming soon",
    url: null,
    description: "Another project is in the works — check back soon.",
  },
];
