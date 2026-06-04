export type Tag = "spicy" | "seasonal" | "nog" | "signature";

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;        // base price OR single variant
  variants?: { label: string; price: number }[]; // e.g. 1pc/2pc
  tags?: Tag[];
  image?: string;       // path under /public, optional
  outOfStock?: boolean;
};

export type MenuCategory = {
  slug: string;
  title: string;
  subtitle?: string;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    slug: "shuruaat",
    title: "Shuruaat",
    subtitle: "Starters — kachori, tikka, pakora and chaat",
    items: [
      { id: "aloo-pyaaz-kachori-chaat", name: "Aloo Pyaaz Kachori Chaat — 2 pcs", description: "Deep-fried pastry filled with spiced potatoes and onions.", price: 12.9 },
      { id: "dal-kachori-chaat", name: "Dal Kachori Chaat — 2 pcs", description: "J/NOG. Deep-fried pastry filled with ground dal and spices.", price: 12.9, tags: ["nog"] },
      { id: "paneer-malai-tikka", name: "Paneer Malai Tikka", description: "J/NOG. Cottage cheese marinated in yogurt, cream, fenugreek and white pepper. Served with mint chutney.", price: 12.9, tags: ["nog", "signature"] },
      { id: "paneer-sandwich-pakora", name: "Paneer Sandwich Pakora — 2 pcs", description: "J/NOG. Spiced cottage cheese fritters.", price: 8.9, tags: ["nog"] },
      { id: "pudina-paneer-tikka", name: "Pudina Paneer Tikka", description: "J/NOG. Cottage cheese marinated in yogurt and spices, served with mint chutney.", price: 12.9, tags: ["nog"] },
      { id: "samosa", name: "Samosa — 2 pcs", description: "NOG. Fried pastry filled with spiced potatoes, peas, cashews and sultanas.", price: 7.9, tags: ["nog", "signature"] },
      { id: "seasonal-veg-pakore", name: "Seasonal Veg Pakore", description: "J/NOG. Deep-fried seasonal veg fritters in a chickpea-flour batter.", price: 10.9, tags: ["nog", "seasonal"] },
      { id: "soya-malai-chaap", name: "Soya Malai Chaap", description: "J/NOG. Soya protein marinated in yogurt, cream, fenugreek and white pepper. Served with mint chutney.", price: 12.9, tags: ["nog"] },
      { id: "tandoori-soya-chaap", name: "Tandoori Soya Chaap", description: "J/NOG. Soya protein marinated in yogurt and spices.", price: 12.9, tags: ["nog"] },
    ],
  },
  {
    slug: "dhaba-special",
    title: "Dhaba Special",
    subtitle: "The pride of Punjab — chole bhature, parathas, kulchas",
    items: [
      {
        id: "aloo-paratha-plate",
        name: "Aloo Paratha Plate",
        description: "Wheat flatbread stuffed with a spiced potato and onion filling, yogurt and pickle.",
        price: 10.9,
        variants: [
          { label: "1 pc", price: 10.9 },
          { label: "2 pc", price: 16.9 },
        ],
      },
      {
        id: "amritsari-aloo-kulcha",
        name: "Amritsari Aloo Kulcha with Channa",
        description: "Tandoori flatbread stuffed with spiced potatoes, spiced chickpea masala and pickle.",
        price: 11.9,
        variants: [
          { label: "1 pc", price: 11.9 },
          { label: "2 pc", price: 17.9 },
        ],
      },
      { id: "dhaba-channa-bhatura", name: "Dhaba Special Channa Bhatura", description: "Spicy chickpea masala, deep-fried bread, pickle and pickled onions.", price: 16.9, tags: ["signature"] },
      {
        id: "gobi-paratha-plate",
        name: "Gobi Paratha Plate",
        description: "Wheat flatbread stuffed with spiced cauliflower filling, yogurt and pickle.",
        price: 10.9,
        variants: [
          { label: "1 pc", price: 10.9 },
          { label: "2 pc", price: 16.9 },
        ],
      },
      { id: "kachori-aloo-sabji", name: "Kachori Aloo Sabji — 2 pcs", description: "NOG. Diced potatoes simmered in spiced tomato sauce, deep-fried pastry filled with ground dal and spices.", price: 15.9, tags: ["nog"] },
      { id: "makki-roti-saag", name: "Makki Roti Saag", description: "Corn flour flatbread, spiced mustard leaf and spinach cream gravy, and pickle.", price: 19.9, tags: ["signature", "seasonal"] },
      {
        id: "mooli-paratha-plate",
        name: "Mooli Paratha Plate",
        description: "Wheat flatbread stuffed with spiced radish filling, yogurt and pickle.",
        price: 10.9,
        variants: [
          { label: "1 pc", price: 10.9 },
          { label: "2 pc", price: 16.9 },
        ],
      },
      { id: "paneer-channa-bhatura", name: "Paneer Channa Bhatura", description: "Spicy chickpea masala, paneer-stuffed deep-fried bread, pickle and pickled onions.", price: 17.9 },
      {
        id: "paneer-kulcha-makhani",
        name: "Paneer Kulcha with Makhani Sauce",
        description: "Tandoori flatbread stuffed with spiced paneer, creamy cashew tomato sauce and pickle.",
        price: 11.9,
        variants: [
          { label: "1 pc", price: 11.9 },
          { label: "2 pc", price: 18.9 },
        ],
      },
      { id: "punjabi-kadhi-chawal", name: "Punjabi Kadhi Chawal", price: 14.9 },
      { id: "puri-aloo-sabji", name: "Puri Aloo Sabji", description: "NOG. Diced potatoes simmered in spiced tomato sauce, deep-fried wheat bread.", price: 14.9, tags: ["nog"] },
      { id: "rajma-chawal", name: "Rajma Chawal", price: 14.9 },
    ],
  },
  {
    slug: "all-day-special",
    title: "All Day Special",
    subtitle: "Thalis — the full Indian feast on one plate",
    items: [
      { id: "lunch-special-thali", name: "Lunch Special Thali", description: "2 curries of the day, naan and rice.", price: 14.9 },
      { id: "north-indian-thali", name: "North Indian Thali", description: "4 North Indian curries of the day, rice, naan, papad, raita, pickle, salad and sweet.", price: 21.9, tags: ["signature"] },
      { id: "south-indian-thali", name: "South Indian Thali", description: "4 South Indian curries of the day, rice, puri, papad, raita, pickle, salad and sweet.", price: 21.9, outOfStock: true },
    ],
  },
  {
    slug: "dalon-ki-bahar",
    title: "Dalon Ki Bahar",
    subtitle: "The poetry of lentils, legumes & sabzi",
    items: [
      { id: "aloo-achari", name: "Aloo Achari", description: "Potatoes tossed in pickling-spice masala, tangy and aromatic.", price: 16.9 },
      { id: "aloo-gobi", name: "Aloo Gobi", description: "Cauliflower and potatoes sautéed with spices, onions and tomatoes.", price: 17.9 },
      { id: "aloo-jeera", name: "Aloo Jeera", description: "Cumin-tempered potatoes with chillies and coriander, simple comfort.", price: 16.9 },
      { id: "baigan-da-bhartha", name: "Baigan Da Bhartha", description: "Fire-roasted mashed eggplant cooked with onions, tomatoes and spices.", price: 17.9 },
      { id: "bhindi-masala", name: "Bhindi Masala", description: "Okra stir-fried with onions, tomatoes and warming spices.", price: 16.9, tags: ["seasonal"] },
      { id: "chana-amritsari", name: "Chana Amritsari", description: "Punjabi-style chickpeas simmered in spiced tomato and onion gravy.", price: 16.9 },
      { id: "cheese-tomato", name: "Cheese Tomato", description: "Paneer in tangy tomato gravy with cream, gentle spices.", price: 17.9 },
      { id: "dal-makhan-wali", name: "Dal Makhan Wali", description: "Creamy black lentils simmered with butter, tomatoes and spices.", price: 16.9, tags: ["signature"] },
      { id: "kadai-paneer", name: "Kadai Paneer", description: "Paneer with bell peppers in kadai masala, slightly smoky.", price: 17.9 },
      { id: "kadi-pakora", name: "Kadi Pakora", description: "Tangy yogurt-gram flour curry with fried pakora fritters.", price: 16.9 },
      { id: "makhmali-kofta", name: "Makhmali Kofta", description: "Soft paneer-veg dumplings in velvety creamy nutty gravy.", price: 17.9 },
      { id: "matar-methi-malai", name: "Matar Methi Malai", description: "Peas in creamy fenugreek-infused sauce, mildly sweet.", price: 16.9 },
      { id: "matar-paneer", name: "Matar Paneer", description: "Paneer and peas simmered in spiced tomato-onion curry.", price: 17.9 },
      { id: "mix-vegetable", name: "Mix Vegetable", description: "Seasonal mixed vegetables cooked in medium-spiced home-style gravy.", price: 16.9 },
      { id: "moong-dal-tadka", name: "Moong Dal Tadka", description: "Yellow lentils tempered with cumin, garlic, chillies and ghee.", price: 16.9 },
      { id: "mushroom-butter-paneer", name: "Mushroom Butter Paneer Masala", description: "Paneer and mushrooms in buttery tomato-onion masala.", price: 18.9 },
      { id: "mushroom-matar", name: "Mushroom Matar", description: "Button mushrooms and peas in spiced onion and tomato masala.", price: 16.9 },
      { id: "palak-corn-masala", name: "Palak Corn Masala", description: "Spinach gravy with sweet corn, gentle spice and creamy.", price: 16.9 },
      { id: "palak-paneer", name: "Palak Paneer", description: "Spinach-based gravy with paneer cubes and garlic-tempered richness.", price: 17.9 },
      { id: "paneer-tomato-bhurji", name: "Paneer Tomato Bhurji", description: "Scrambled paneer with tomatoes, onions and spices, quick sauté.", price: 18.9 },
      { id: "paneer-zafrani", name: "Paneer Zafrani", description: "Saffron-kissed paneer in creamy aromatic Mughlai-style sauce.", price: 18.9 },
      { id: "pindi-chana", name: "Pindi Chana", description: "Dry-style spiced chickpeas with robust masalas, tangy finish.", price: 16.9 },
      { id: "rajmah-jammu-wale", name: "Rajmah Jammu Wale", description: "Kidney beans slow-cooked in aromatic North Indian gravy.", price: 16.9, tags: ["signature"] },
      { id: "sarson-ka-saag", name: "Sarson Ka Saag", description: "Mustard greens purée with spinach, ginger and rustic Punjabi spice.", price: 19.9, tags: ["seasonal", "signature"] },
      { id: "shahi-paneer", name: "Shahi Paneer", description: "Cottage cheese in rich creamy cashew-tomato royal gravy.", price: 17.9, tags: ["signature"] },
      { id: "veg-kolhapuri", name: "Veg Kolhapuri", description: "Fiery Kolhapuri masala with mixed vegetables and coconut notes.", price: 16.9, tags: ["spicy"] },
    ],
  },
  {
    slug: "chinese",
    title: "Chinese",
    subtitle: "Indo-Chinese street favourites",
    items: [
      { id: "chilli-cheese", name: "Chilli Cheese", description: "Paneer cubes stir-fried with peppers, onions and spicy chilli sauce — available dry for a crisp bite or gravy for saucy richness.", price: 14.9, tags: ["spicy"] },
      { id: "chilli-garlic-noodles", name: "Chilli Garlic Noodles", description: "Noodles wok-tossed with garlic, red chillies, soy sauce and scallions, giving bold aromatic flavours and a spicy kick.", price: 15.9, tags: ["spicy"] },
      { id: "dry-chilli-cauliflower", name: "Dry Chilli Cauliflower", description: "Batter-fried cauliflower florets wok-tossed with garlic, chillies, scallions and pepper — a fiery, flavourful starter with authentic Indo-Chinese zest.", price: 14.9, tags: ["spicy"] },
      { id: "honey-chilli-potato", name: "Honey Chilli Potato", description: "Crispy fried potato fingers coated in a sweet-spicy honey chilli glaze, tossed with sesame seeds and scallions.", price: 11.9 },
      { id: "veg-fried-rice", name: "Veg Fried Rice", description: "Fragrant rice wok-tossed with mixed vegetables, soy, pepper and spring onions.", price: 14.9 },
      { id: "veg-manchurian", name: "Veg Manchurian", description: "Crispy vegetable dumplings simmered in a tangy soy-chilli sauce — dry for a crunchy snack or with gravy.", price: 14.9 },
      { id: "veg-noodles", name: "Veg Noodles", description: "Stir-fried wheat noodles with fresh vegetables, soy seasoning, spring onions and pepper.", price: 14.9 },
    ],
  },
  {
    slug: "south-indian",
    title: "South Indian",
    subtitle: "Fluffy idlis, crisp vada, fragrant sambhar",
    items: [
      { id: "idly-sambhar", name: "Idly Sambhar — 2 pcs", description: "Steamed rice cakes served with hot lentil sambhar and assorted chutneys.", price: 9.9 },
      { id: "vada-sambhar", name: "Vada Sambhar — 4 pcs", description: "Crispy lentil doughnuts served with flavourful sambhar, coconut and tomato chutneys.", price: 12.9 },
    ],
  },
  {
    slug: "bombay-special",
    title: "Bombay Special",
    subtitle: "Mumbai street food — pav bhaji, vada pav and more",
    items: [
      { id: "cheese-pav-bhaji", name: "Cheese Pav Bhaji", description: "Toasted bread roll, spicy mashed mix vegetable gravy, cheese, butter, onions and lemon.", price: 16.9 },
      { id: "masala-pav", name: "Masala Pav", description: "Toasted bread roll, masala mix and spicy chutney.", price: 6.9 },
      { id: "masala-pav-bhaji", name: "Masala Pav Bhaji", description: "Toasted bread roll, masala tomatoes and onion, spicy mashed mix vegetable gravy, cheese, butter, onions and lemon.", price: 16.9 },
      { id: "mumbai-pav-bhaji", name: "Mumbai Pav Bhaji", description: "Toasted bread roll, spicy mashed mix vegetable gravy, butter, onions and lemon.", price: 15.9, tags: ["signature"] },
      { id: "paneer-pav-bhaji", name: "Paneer Pav Bhaji", description: "Toasted bread roll, spicy mashed mix vegetable gravy, cottage cheese, butter, onions and lemon.", price: 16.9 },
      { id: "samosa-pav", name: "Samosa Pav", description: "Toasted bread roll, samosa and spicy chutney.", price: 7.9 },
      { id: "vada-pav", name: "Vada Pav", description: "Bombay burger. Toasted bread roll, potato dumpling fritter and spicy chutney.", price: 7.9 },
    ],
  },
  {
    slug: "rotiyon-ki-dawat",
    title: "Rotiyon Ki Dawat",
    subtitle: "Hand-rolled, tandoor-baked breads",
    items: [
      { id: "aloo-parantha", name: "Aloo Parantha", description: "Stuffed with spiced mashed potatoes, comforting, pan-fried crisp.", price: 4.5 },
      { id: "butter-naan", name: "Butter Naan", description: "Classic naan generously brushed with melted butter, soft and indulgent.", price: 4.0 },
      { id: "chopdi-roti", name: "Chopdi Roti", description: "Rustic hand-patted roti, thicker, soft with crisp edges.", price: 3.5 },
      { id: "garlic-naan", name: "Garlic Naan", description: "Naan topped with minced garlic and herbs, aromatic and buttery.", price: 3.5 },
      { id: "green-chilli-paratha", name: "Green Chilli Paratha", description: "Paratha with chopped green chillies, spicy, zesty kick.", price: 4.0, tags: ["spicy"] },
      { id: "lachha-paratha", name: "Lachha Paratha", description: "Multi-layered flaky paratha, ghee-brushed, crisp outside, soft inside.", price: 3.5 },
      { id: "methi-paratha", name: "Methi Paratha", description: "Paratha kneaded with fenugreek leaves, pleasantly bitter, aromatic.", price: 4.0 },
      { id: "missi-roti", name: "Missi Roti", description: "Gram flour wheat roti, spiced, hearty, earthy Punjabi flavour.", price: 4.0 },
      { id: "pudina-paratha", name: "Pudina Paratha", description: "Mint-infused paratha, refreshing herbaceous notes, flaky layers.", price: 4.0 },
      { id: "red-chilli-paratha", name: "Red Chilli Paratha", description: "Paratha seasoned with red chilli, warm heat, robust.", price: 4.0, tags: ["spicy"] },
      { id: "stuffed-masala-kulcha", name: "Stuffed Masala Kulcha", description: "Leavened kulcha stuffed with masala filling, soft and tangy.", price: 5.5 },
      { id: "stuffed-parantha", name: "Stuffed Parantha", description: "Filled with spiced cauliflower or mixed vegetables, hearty, flavourful.", price: 4.5 },
      { id: "tandoori-naan", name: "Tandoori Naan", description: "Leavened white-flour bread, tandoor-baked, fluffy with smoky spots.", price: 3.5 },
      { id: "tandoori-roti", name: "Tandoori Roti", description: "Whole-wheat flatbread baked in tandoor, slightly charred, chewy.", price: 3.0 },
    ],
  },
  {
    slug: "salad-raita",
    title: "Salad & Raita",
    subtitle: "Cooling sides and crunchy accompaniments",
    items: [
      { id: "dahi-bhalla", name: "Dahi Bhalla", price: 7.0 },
      { id: "hara-bhara-salad", name: "Hara Bhara Salad", price: 7.0 },
      { id: "mix-raita", name: "Mix Raita", price: 4.0 },
      { id: "papad", name: "Papad", price: 3.0 },
      { id: "plain-dahi", name: "Plain Dahi", price: 3.0 },
      { id: "pudina-chutney", name: "Pudina Chutney", price: 2.0 },
    ],
  },
  {
    slug: "basmati-ki-khusbu",
    title: "Basmati Ki Khusbu",
    subtitle: "The fragrance of basmati — rice plates and biryanis",
    items: [
      { id: "jeera-rice", name: "Jeera Rice", description: "Basmati rice tempered with cumin seeds, ghee and mild aromatics.", price: 4.0 },
      { id: "sada-chawal", name: "Sada Chawal", description: "Plain steamed basmati rice, fluffy grains, perfect accompaniment to curries.", price: 3.5 },
      { id: "subj-biryani", name: "Subj Biryani", description: "Layered spiced rice with assorted vegetables, saffron, fried onions and herbs.", price: 15.9 },
      { id: "vegetable-pulao", name: "Vegetable Pulao", description: "Fragrant basmati cooked with mixed vegetables, whole spices and herbs.", price: 9.0 },
    ],
  },
  {
    slug: "beverages",
    title: "Beverages",
    subtitle: "Chilled, hot and refreshing",
    items: [
      { id: "bottled-water", name: "Bottled Water", description: "Sealed, purified drinking water.", price: 3.0, outOfStock: true },
      { id: "chatti-di-lassi", name: "Chatti Di Lassi", description: "Authentic Punjabi yogurt drink, churned to creamy perfection, mildly sweet, rich and deeply refreshing.", price: 5.0 },
      { id: "fresh-lime-soda", name: "Fresh Lime Soda", description: "Sparkling soda blended with fresh lime juice, sugar and salt. Instantly refreshing and tangy.", price: 8.0 },
      { id: "green-tea", name: "Green Tea", description: "Lightly brewed green tea leaves with subtle grassy notes and a clean, refreshing finish.", price: 2.5, outOfStock: true },
      { id: "lassi-sweet", name: "Lassi Sweet", description: "Thick chilled yogurt beverage blended with sugar, smooth, creamy and refreshing.", price: 5.0 },
      { id: "soft-drinks", name: "Soft Drinks", description: "Chilled carbonated beverages — refreshing classics.", price: 3.0 },
      { id: "tea", name: "Tea", description: "Traditional Indian tea brewed with milk, sugar and warming spices.", price: 3.0 },
    ],
  },
  {
    slug: "meetha",
    title: "Meetha",
    subtitle: "Sweet endings",
    items: [
      { id: "gajar-halwa", name: "Gajar Halwa", description: "Slow-cooked grated carrots with milk, ghee, sugar, cardamom and garnished nuts.", price: 9.0, tags: ["seasonal"] },
      { id: "gulab-jamun", name: "Gulab Jamun", description: "Deep-fried khoya dumplings soaked in warm cardamom and saffron sugar syrup.", price: 8.0, tags: ["signature"] },
      { id: "rasmalai", name: "Rasmalai", description: "Flattened paneer patties soaked in chilled saffron cardamom milk.", price: 8.0 },
      { id: "special-kheer", name: "Special Kheer", description: "Slow-cooked rice pudding with milk, sugar, cardamom, nuts and fragrant saffron.", price: 10.0 },
      { id: "sponge-rasgulla", name: "Sponge Rasgulla", description: "Spongy chhena balls simmered in light syrup, airy, juicy and delicately sweet.", price: 8.0, outOfStock: true },
      { id: "tilla-kulfi", name: "Tilla Kulfi", description: "Traditional dense Indian ice cream on a stick, saffron pistachio flavoured.", price: 6.0, outOfStock: true },
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
  .flatMap((c) => c.items.map((i) => ({ ...i, category: c.title, categorySlug: c.slug })))
  .filter((i) => i.tags?.includes("signature"));
