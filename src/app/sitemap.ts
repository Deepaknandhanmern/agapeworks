import type { MetadataRoute } from "next";
import { getAllBlogPosts, getAllCaseStudies } from "@/lib/content";
import { serviceDetails } from "@/lib/service-detail-data";

const BASE_URL = "https://agapeworks.in";

const staticRoutes = [
  "",
  "/about",
  "/services",
  "/portfolio",
  "/case-studies",
  "/collaboration",
  "/partner-program",
  "/products",
  "/billing",
  "/sellara",
  "/saas",
  "/scope",
  "/contact",
  "/blog",
  "/privacy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, caseStudies] = await Promise.all([getAllBlogPosts(), Promise.resolve(getAllCaseStudies())]);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.6,
  }));

  const serviceEntries: MetadataRoute.Sitemap = serviceDetails.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${BASE_URL}/case-studies/${cs.slug}`,
    lastModified: cs.date,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...serviceEntries, ...caseStudyEntries, ...blogEntries];
}
