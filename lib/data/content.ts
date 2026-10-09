export type InfoSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export const INFO_SECTIONS: InfoSection[] = [
  {
    id: "about-us",
    title: "About Us",
    paragraphs: [
      "AEROVIA is a modern airline built around straightforward fares and helpful journeys from the Philippines. We keep booking simple, transparent, and quick so travelers can focus on the trip ahead.",
    ],
  },
  {
    id: "news-and-events",
    title: "News and Events",
    paragraphs: [
      "Follow route launches, seasonal schedules, and community events. We publish updates here as they happen.",
    ],
  },
  {
    id: "history-and-milestones",
    title: "History and Milestones",
    paragraphs: [
      "From our first domestic hop to a growing regional network, AEROVIA has steadily connected the Philippines with the places travelers want to reach.",
    ],
    bullets: [
      "2026: Digital booking experience refreshed end to end.",
      "2025: New long-haul service to the Middle East.",
      "2024: Fleet and cabin refresh across the network.",
    ],
  },
  {
    id: "careers",
    title: "Careers",
    paragraphs: [
      "We are always looking for people who care about great service. Explore roles in flight operations, guest experience, and technology.",
    ],
  },
  {
    id: "promos",
    title: "Promos",
    paragraphs: [
      "Watch this space for fare sales and seasonal offers. Promotional fares are subject to availability and may carry travel-date restrictions.",
    ],
  },
  {
    id: "help-and-support",
    title: "Help & Support",
    paragraphs: [
      "Need a hand with a booking? Use your reference and lead passenger last name on the Manage page, or reach our support team using the details in Contact Us.",
    ],
  },
  {
    id: "contact-us",
    title: "Contact Us",
    paragraphs: [
      "Our support desk is available every day. Have your booking reference ready so we can help faster.",
    ],
    bullets: [
      "Email: support@aerovia.example.com",
      "Phone: +63 2 8000 0000",
      "Hours: 24/7",
    ],
  },
  {
    id: "faqs",
    title: "FAQs",
    paragraphs: [
      "Quick answers to the questions travelers ask most.",
    ],
    bullets: [
      "Can I change my flight? Yes \u2013 contact support with your reference.",
      "How much baggage is included? Allowances depend on cabin; see the table above.",
      "When can I check in? Check-in opens once your booking is confirmed.",
      "How do I add extra baggage? Choose it in the search widget before you pay.",
    ],
  },
  {
    id: "special-needs-and-request",
    title: "Special Needs and Request",
    paragraphs: [
      "We can arrange wheelchair assistance, medical support, and other special requests. Tell us as early as possible, ideally at least 48 hours before departure.",
    ],
  },
  {
    id: "refund-help-page",
    title: "Refund Help Page",
    paragraphs: [
      "Refunds are processed to the original form of payment. Eligibility depends on your fare rules. Start a request with your booking reference and we will guide you through the steps.",
    ],
  },
  {
    id: "travel-requirements",
    title: "Travel Requirements",
    paragraphs: [
      "Make sure your passport is valid, check visa rules for your destination, and review any health requirements before you fly. Requirements can change, so confirm close to your travel date.",
    ],
  },
  {
    id: "other-links",
    title: "Other Links",
    paragraphs: [
      "Useful references for planning your trip, including airport guides and partner services.",
    ],
  },
  {
    id: "cargo",
    title: "Cargo",
    paragraphs: [
      "Ship goods across our network with tracked air cargo. Contact our cargo desk for rates, cut-off times, and restricted-goods guidance.",
    ],
  },
  {
    id: "aerovia-accessibility-services",
    title: "AEROVIA Accessibility Services",
    paragraphs: [
      "We want every traveler to fly with confidence. Our accessibility services cover mobility assistance, boarding support, and help for travelers with reduced vision or hearing.",
    ],
  },
  {
    id: "other-products-and-services",
    title: "Other Products & Services",
    paragraphs: [
      "Beyond flights, we offer travel extras to make your journey smoother, including seat selection, priority boarding, and partner hotel and transfer options.",
    ],
  },
  {
    id: "legal-notices",
    title: "Legal Notices",
    paragraphs: [
      "This website and its content are provided for general information. Conditions of carriage, tariffs, and applicable laws govern your flight.",
    ],
  },
  {
    id: "taxes-fees-and-surcharges",
    title: "Taxes, Fees, and Surcharges",
    paragraphs: [
      "Fares shown may exclude government taxes, airport fees, and carrier surcharges. The full breakdown is shown before you confirm your booking.",
    ],
  },
];
