export type Tag = "spicy" | "seasonal" | "nog" | "signature";

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;        // base price OR single variant
  variants?: { label: string; price: number }[]; // e.g. 1pc/2pc
  tags?: Tag[];
  image?: string;       // path under /public, optional
};

export type MenuCategory = {
  slug: string;
  title: string;
  subtitle?: string;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    slug: "south-indian",
    title: "South Indian",
    subtitle: "Crisp dosas, fluffy idlis, fragrant sambhar",
    items: [
      {
        id: "idly-sambhar",
        name: "Idly Sambhar — 2 pcs",
        description: "Steamed rice cakes served with hot lentil sambhar and assorted chutneys.",
        price: 9.9,
      },
      {
        id: "vada-sambhar",
        name: "Vada Sambhar — 4 pcs",
        description: "Crispy lentil doughnuts served with flavourful sambhar, coconut and tomato chutneys.",
        price: 12.9,
      },
      {
        id: "plain-dosa",
        name: "Plain Dosa",
        description: "Thin fermented crepe, crisp-griddled, served with sambhar and assorted chutneys.",
        price: 12.9,
      },
      {
        id: "masala-dosa",
        name: "Masala Dosa",
        description: "Crisp dosa stuffed with spiced potato masala, served with sambhar and chutneys.",
        price: 14.9,
        tags: ["signature"],
      },
      {
        id: "paneer-dosa",
        name: "Paneer Dosa",
        description: "Dosa filled with spiced paneer, served alongside sambhar and coconut chutneys.",
        price: 15.9,
      },
    ],
  },
  {
    slug: "bombay-special",
    title: "Bombay Special",
    subtitle: "Mumbai street food — pav bhaji, vada pav and more",
    items: [
      {
        id: "mumbai-pav-bhaji",
        name: "Mumbai Pav Bhaji",
        description: "Toasted bread roll, spicy mashed mixed-vegetable gravy, butter, onions, lemon.",
        price: 15.9,
        tags: ["signature"],
      },
      {
        id: "paneer-pav-bhaji",
        name: "Paneer Pav Bhaji",
        description: "Toasted bread roll, spicy mashed mixed-vegetable gravy, cottage cheese, butter, onions, lemon.",
        price: 16.9,
      },
      {
        id: "cheese-pav-bhaji",
        name: "Cheese Pav Bhaji",
        description: "Toasted bread roll, spicy mashed mixed-vegetable gravy, cheese, butter, onions, lemon.",
        price: 16.9,
      },
      {
        id: "masala-pav-bhaji",
        name: "Masala Pav Bhaji",
        description: "Toasted bread roll, masala tomatoes and onion, spicy mashed mix-vegetable gravy, cheese, butter, onions, lemon.",
        price: 16.9,
      },
      {
        id: "vada-pav",
        name: "Vada Pav (Bombay Burger)",
        description: "Toasted bread roll, potato dumpling fritter, spicy chutney.",
        price: 7.9,
      },
      {
        id: "samosa-pav",
        name: "Samosa Pav",
        description: "Toasted bread roll, samosa, spicy chutney.",
        price: 7.9,
      },
      {
        id: "masala-pav",
        name: "Masala Pav",
        description: "Toasted bread roll, masala mix, spicy chutney.",
        price: 6.9,
      },
    ],
  },
  {
    slug: "dhaba-special",
    title: "Dhaba Special",
    subtitle: "The pride of Punjab — chole bhature, parathas, kulchas",
    items: [
      {
        id: "dhaba-channa-bhatura",
        name: "Dhaba Special Channa Bhatura",
        description: "Spicy chickpea masala, deep-fried bread, pickle, pickled onions.",
        price: 16.9,
        tags: ["signature"],
      },
      {
        id: "paneer-channa-bhatura",
        name: "Paneer Channa Bhatura",
        description: "Spicy chickpea masala, paneer-stuffed deep-fried bread, pickle, pickled onions.",
        price: 17.9,
      },
      {
        id: "puri-aloo-sabji",
        name: "Puri Aloo Sabji",
        description: "Diced potatoes simmered in spiced tomato sauce, deep-fried wheat bread.",
        price: 14.9,
        tags: ["nog"],
      },
      {
        id: "kachori-aloo-sabji",
        name: "Kachori Aloo Sabji (2 pc)",
        description: "Diced potatoes simmered in spiced tomato sauce, deep-fried pastry filled with ground dal and spices.",
        price: 15.9,
        tags: ["nog"],
      },
      {
        id: "aloo-paratha-plate",
        name: "Aloo Paratha Plate (Tava/Tandoor)",
        description: "Wheat flatbread stuffed with spiced potato & onion filling, yogurt, pickle.",
        price: 10.9,
        variants: [
          { label: "1 pc", price: 10.9 },
          { label: "2 pc", price: 16.9 },
        ],
      },
      {
        id: "gobi-paratha-plate",
        name: "Gobi Paratha Plate (Tava/Tandoor)",
        description: "Wheat flatbread stuffed with spiced cauliflower filling, yogurt, pickle.",
        price: 10.9,
        variants: [
          { label: "1 pc", price: 10.9 },
          { label: "2 pc", price: 16.9 },
        ],
      },
      {
        id: "mooli-paratha-plate",
        name: "Mooli Paratha Plate (Tava/Tandoor)",
        description: "Wheat flatbread stuffed with spiced radish filling, yogurt, pickle.",
        price: 10.9,
        variants: [
          { label: "1 pc", price: 10.9 },
          { label: "2 pc", price: 16.9 },
        ],
      },
      {
        id: "amritsari-aloo-kulcha",
        name: "Amritsari Aloo Kulcha w/ Channa",
        description: "Tandoori flatbread stuffed with spiced potatoes, spiced chickpea masala, pickle.",
        price: 11.9,
        variants: [
          { label: "1 pc", price: 11.9 },
          { label: "2 pc", price: 17.9 },
        ],
      },
      {
        id: "paneer-kulcha-makhani",
        name: "Paneer Kulcha w/ Makhani Sauce",
        description: "Tandoori flatbread stuffed with spiced paneer, creamy cashew-tomato sauce, pickle.",
        price: 11.9,
        variants: [
          { label: "1 pc", price: 11.9 },
          { label: "2 pc", price: 18.9 },
        ],
      },
      {
        id: "punjabi-kadhi-chawal",
        name: "Punjabi Kadhi Chawal",
        price: 14.9,
      },
      {
        id: "rajma-chawal",
        name: "Rajma Chawal",
        price: 14.9,
      },
      {
        id: "makki-roti-saag",
        name: "Makki Roti Saag",
        description: "Corn flour flatbread, spiced mustard leaf and spinach cream gravy, pickle.",
        price: 19.9,
        tags: ["signature"],
      },
    ],
  },
  {
    slug: "sabzi",
    title: "Sabzi",
    subtitle: "Homestyle North Indian curries — slow-cooked, full of warmth",
    items: [
      { id: "aloo-gobhi", name: "Aloo Gobhi", description: "Cauliflower and potatoes sautéed with spices, onions, tomatoes.", price: 17.9 },
      { id: "mix-vegetable", name: "Mix Vegetable", description: "Seasonal mixed vegetables cooked in medium-spiced homestyle gravy.", price: 16.9 },
      { id: "veg-kohlapuri", name: "Veg Kohlapuri", description: "Fiery Kohlapuri masala with mixed vegetables, coconut notes.", price: 16.9, tags: ["spicy"] },
      { id: "palak-corn-masala", name: "Palak Corn Masala", description: "Spinach gravy with sweet corn, gentle spice, creamy.", price: 16.9 },
      { id: "baigan-da-bhartha", name: "Baigan da Bhartha", description: "Fire-roasted mashed eggplant cooked with onions, tomatoes, spices.", price: 17.9 },
      { id: "bhindi-masala", name: "Bhindi Masala", description: "Okra stir-fried with onions, tomatoes and warming spices.", price: 16.9, tags: ["seasonal"] },
      { id: "sarson-da-saag", name: "Sarson Da Saag", description: "Mustard greens puree with spinach, ginger, rustic Punjabi.", price: 19.9, tags: ["seasonal", "signature"] },
      { id: "mushroom-matar", name: "Mushroom Matar", description: "Button mushrooms and peas in spiced onion-tomato masala.", price: 16.9 },
      { id: "matar-methi-malai", name: "Matar Methi Malai", description: "Peas in creamy fenugreek-infused sauce, mildly sweet.", price: 16.9 },
      { id: "shahi-paneer", name: "Shahi Paneer", description: "Cottage cheese in rich creamy cashew-tomato royal gravy.", price: 17.9, tags: ["signature"] },
      { id: "kadai-paneer", name: "Kadai Paneer", description: "Paneer with bell peppers in kadai masala, slightly smoky.", price: 17.9 },
      { id: "matar-paneer", name: "Matar Paneer", description: "Paneer and peas simmered in spiced tomato-onion curry.", price: 17.9 },
      { id: "cheese-tomato", name: "Cheese Tomato", description: "Paneer in tangy tomato gravy with cream, gentle spices.", price: 17.9 },
      { id: "palak-paneer", name: "Palak Paneer", description: "Spinach-based gravy with paneer cubes, garlic-tempered richness.", price: 17.9 },
      { id: "makhmali-kofta", name: "Makhmali Kofta", description: "Soft paneer-veg dumplings in velvety creamy nutty gravy.", price: 17.9 },
      { id: "paneer-zafrani", name: "Paneer Zafrani", description: "Saffron-kissed paneer in creamy aromatic Mughlai-style sauce.", price: 18.9 },
      { id: "paneer-tomato-bhurji", name: "Paneer Tomato Bhurji", description: "Scrambled paneer with tomatoes, onions, spices, quick sauté.", price: 18.9 },
      { id: "mushroom-butter-paneer", name: "Mushroom Butter Paneer Masala", description: "Paneer and mushrooms in buttery tomato-onion masala.", price: 18.9 },
    ],
  },
  {
    slug: "rotiyon-ki-dawat",
    title: "Rotiyon Ki Dawat",
    subtitle: "Hand-rolled, tandoor-baked breads",
    items: [
      { id: "tandoori-roti", name: "Tandoori Roti", description: "Whole-wheat flatbread baked in tandoor, slightly charred, chewy.", price: 3.0 },
      { id: "chopdi-roti", name: "Chopdi Roti", description: "Rustic hand-patted roti, thicker, soft with crisp edges.", price: 3.5 },
      { id: "tandoori-naan", name: "Tandoori Naan", description: "Leavened white-flour bread, tandoor-baked, fluffy with smoky spots.", price: 3.5 },
      { id: "missi-roti", name: "Missi Roti", description: "Gram flour-wheat roti, spiced, hearty, earthy Punjabi flavour.", price: 4.0 },
      { id: "butter-naan", name: "Butter Naan", description: "Classic naan generously brushed with melted butter, soft, indulgent.", price: 4.0 },
      { id: "garlic-naan", name: "Garlic Naan", description: "Naan topped with minced garlic and herbs, aromatic, buttery.", price: 3.5 },
      { id: "lachha-parantha", name: "Lachha Parantha", description: "Multi-layered flaky paratha, ghee-brushed, crisp outside, soft inside.", price: 3.5 },
      { id: "green-chilly-parantha", name: "Green Chilly Parantha", description: "Paratha with chopped green chilies, spicy, zesty kick.", price: 4.0, tags: ["spicy"] },
      { id: "red-chilly-parantha", name: "Red Chilly Parantha", description: "Paratha seasoned with red chili, warm heat, robust.", price: 4.0, tags: ["spicy"] },
      { id: "methi-parantha", name: "Methi Parantha", description: "Paratha kneaded with fenugreek leaves, pleasantly bitter, aromatic.", price: 4.0 },
      { id: "pudina-parantha", name: "Pudina Parantha", description: "Mint-infused paratha, refreshing herbaceous notes, flaky layers.", price: 4.0 },
      { id: "aloo-parantha", name: "Aloo Parantha", description: "Stuffed with spiced mashed potatoes, comforting, pan-fried crisp.", price: 4.5 },
      { id: "stuffed-parantha-gobhi-mix", name: "Stuffed Parantha (Gobhi / Mix)", description: "Filled with spiced cauliflower or mixed vegetables, hearty, flavourful.", price: 4.5 },
      { id: "stuffed-masala-kulcha", name: "Stuffed Masala Kulcha", description: "Leavened kulcha stuffed with masala filling, soft, tangy.", price: 5.5 },
    ],
  },
  {
    slug: "dalon-ki-bahar",
    title: "Dalon Ki Bahar",
    subtitle: "The poetry of lentils & legumes",
    items: [
      { id: "moong-dal-tadka", name: "Moong Dal Tadka", description: "Yellow lentils tempered with cumin, garlic, chilies, ghee.", price: 16.9 },
      { id: "channe-amritsari", name: "Channe Amritsari", description: "Punjabi-style chickpeas simmered in spiced tomato-onion gravy.", price: 16.9 },
      { id: "pindi-channa", name: "Pindi Channa", description: "Dry-style spiced chickpeas with robust masalas, tangy finish.", price: 16.9 },
      { id: "rajmah-jammu-wale", name: "Rajmah Jammu Wale", description: "Kidney beans slow-cooked in aromatic North Indian gravy.", price: 16.9, tags: ["signature"] },
      { id: "dal-makhan-wali", name: "Dal Makhan Wali", description: "Creamy black lentils simmered with butter, tomatoes, spices.", price: 16.9, tags: ["signature"] },
      { id: "aloo-warian-desi", name: "Aloo Warian Desi", description: "Potatoes cooked with Punjabi wadi spice nuggets, rustic flavours.", price: 16.9 },
      { id: "kadi-pakora", name: "Kadi Pakora", description: "Tangy yogurt-gram flour curry with fried pakora fritters.", price: 16.9 },
      { id: "aloo-achaari", name: "Aloo Achaari", description: "Potatoes tossed in pickling-spice masala, tangy and aromatic.", price: 16.9 },
      { id: "aloo-jeera", name: "Aloo Jeera", description: "Cumin-tempered potatoes with chilies, coriander, simple comfort.", price: 16.9 },
    ],
  },
  {
    slug: "all-day-special",
    title: "All Day Special",
    subtitle: "Thalis — the full Indian feast on one plate",
    items: [
      {
        id: "north-indian-thali",
        name: "North Indian Thali",
        description: "4 North Indian curries of the day, rice, naan, papad, raita, pickle, salad, sweet.",
        price: 21.9,
        tags: ["signature"],
      },
      {
        id: "south-indian-thali",
        name: "South Indian Thali",
        description: "4 South Indian curries of the day, rice, puri, papad, raita, pickle, salad, sweet.",
        price: 21.9,
      },
      {
        id: "lunch-special-thali",
        name: "Lunch Special Thali (Mon–Fri 11am–3pm)",
        description: "2 curries of the day, naan & rice.",
        price: 14.9,
      },
    ],
  },
];

export function findItem(id: string): MenuItem | undefined {
  for (const cat of menu) {
    const it = cat.items.find((i) => i.id === id);
    if (it) return it;
  }
  return undefined;
}

export const signatureDishes = menu
  .flatMap((c) => c.items.map((i) => ({ ...i, category: c.title })))
  .filter((i) => i.tags?.includes("signature"));
