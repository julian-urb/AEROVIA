export type SiteLink = {
  label: string;
  href: string;
};

export const primaryNav: SiteLink[] = [
  { label: "Book", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Manage", href: "/manage" },
  { label: "Travel info", href: "/travel-info" },
];

export type FooterGroup = {
  id: string;
  heading: string;
  links: SiteLink[];
};

export const footerGroups: FooterGroup[] = [
  {
    id: "company",
    heading: "Company",
    links: [
      { label: "About Us", href: "/travel-info/#about-us" },
      { label: "News and Events", href: "/travel-info/#news-and-events" },
      {
        label: "History and Milestones",
        href: "/travel-info/#history-and-milestones",
      },
      { label: "Careers", href: "/travel-info/#careers" },
      { label: "Promos", href: "/travel-info/#promos" },
    ],
  },
  {
    id: "support",
    heading: "Help & Support",
    links: [
      { label: "Help & Support", href: "/travel-info/#help-and-support" },
      { label: "Contact Us", href: "/travel-info/#contact-us" },
      { label: "FAQs", href: "/travel-info/#faqs" },
      {
        label: "Special Needs and Request",
        href: "/travel-info/#special-needs-and-request",
      },
      { label: "Refund Help Page", href: "/travel-info/#refund-help-page" },
    ],
  },
  {
    id: "travel",
    heading: "Travel & Services",
    links: [
      {
        label: "Travel Requirements",
        href: "/travel-info/#travel-requirements",
      },
      { label: "Other Links", href: "/travel-info/#other-links" },
      { label: "Cargo", href: "/travel-info/#cargo" },
      {
        label: "AEROVIA Accessibility Services",
        href: "/travel-info/#aerovia-accessibility-services",
      },
      {
        label: "Other Products & Services",
        href: "/travel-info/#other-products-and-services",
      },
    ],
  },
  {
    id: "policies",
    heading: "Policies",
    links: [
      { label: "Legal Notices", href: "/travel-info/#legal-notices" },
      {
        label: "Taxes, Fees, and Surcharges",
        href: "/travel-info/#taxes-fees-and-surcharges",
      },
    ],
  },
];
