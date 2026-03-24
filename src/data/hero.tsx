export interface IHeroBanner {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  btnPrimary: string;
  btnSecondary: string;
  image: string; 
  themeColor: string; 
}

export const heroBanners: IHeroBanner[] = [
  {
    id: 1,
    badge: "FRESH HARVEST",
    title: "Fresh From The Farms",
    subtitle:
      "Experience the true taste of nature with our hand-picked organic selection delivered to your doorstep.",
    btnPrimary: "Shop Now",
    btnSecondary: "View Organic Range",
    image:
      "https://res.cloudinary.com/dngidsew4/image/upload/v1774374325/vegetables_jfjdy0.webp",
    themeColor: "bg-emerald-600",
  },
  {
    id: 2,
    badge: "ORCHARD FRESH",
    title: "Nature’s Sweetest Selection",
    subtitle:
      "Savor the vibrant flavors of sun-ripened fruits, hand-picked at their peak and delivered with maximum freshness.",
    btnPrimary: "Shop Fruits",
    btnSecondary: "Browse Seasonal Picks",
    image:
      "https://res.cloudinary.com/dngidsew4/image/upload/v1774374325/fruits_s17w5c.webp",
    themeColor: "bg-orange-500",
  },
  {
    id: 3,
    badge: "DAILY WELLNESS",
    title: "Refresh Your Daily Routine",
    subtitle:
      "Nurture yourself with our curated collection of premium skincare, hair care, and hygiene essentials for a healthier you.",
    btnPrimary: "Shop Care",
    btnSecondary: "Explore Top Brands",
    image:
      "https://res.cloudinary.com/dngidsew4/image/upload/v1774374323/personal-care_cn69a7.webp",
    themeColor: "bg-sky-600",
  },
  {
    id: 4,
    badge: "PRIME SELECTION",
    title: "The Finest Cuts & Daily Catch",
    subtitle:
      "Quality you can trust—sourced from certified local pastures and sustainable waters for guaranteed tenderness and flavor.",
    btnPrimary: "Shop Meat & Fish",
    btnSecondary: "View Gourmet Range",
    image:
      "https://res.cloudinary.com/dngidsew4/image/upload/v1774374323/meat-fish_exxvi4.webp",
    themeColor: "bg-red-700",
  },
];
