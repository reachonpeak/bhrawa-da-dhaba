// Emoji + gradient helpers for the menu — used until we have real photos.

export const categoryEmoji: Record<string, string> = {
  shuruaat: "🥟",
  "dhaba-special": "🫓",
  "all-day-special": "🍱",
  "dalon-ki-bahar": "🥘",
  chinese: "🥡",
  "south-indian": "🥞",
  "bombay-special": "🍔",
  "rotiyon-ki-dawat": "🫓",
  "salad-raita": "🥗",
  "basmati-ki-khusbu": "🍚",
  beverages: "🥤",
  meetha: "🍮",
};

// Gradient ring colour pairs per category for the dish circles
export const categoryGradient: Record<string, string> = {
  shuruaat: "from-amber-200 to-rose-300",
  "dhaba-special": "from-orange-200 to-red-300",
  "all-day-special": "from-yellow-200 to-orange-300",
  "dalon-ki-bahar": "from-lime-200 to-emerald-300",
  chinese: "from-rose-200 to-fuchsia-300",
  "south-indian": "from-yellow-100 to-amber-300",
  "bombay-special": "from-orange-200 to-amber-300",
  "rotiyon-ki-dawat": "from-yellow-100 to-yellow-300",
  "salad-raita": "from-emerald-100 to-teal-300",
  "basmati-ki-khusbu": "from-stone-100 to-amber-200",
  beverages: "from-sky-100 to-cyan-300",
  meetha: "from-pink-100 to-rose-300",
};

// Per-item emoji overrides. If absent, falls back to category emoji.
export const itemEmoji: Record<string, string> = {
  // Shuruaat
  "aloo-pyaaz-kachori-chaat": "🥟",
  "dal-kachori-chaat": "🥟",
  "paneer-malai-tikka": "🧀",
  "paneer-sandwich-pakora": "🥪",
  "pudina-paneer-tikka": "🌿",
  samosa: "🥟",
  "seasonal-veg-pakore": "🥦",
  "soya-malai-chaap": "🍢",
  "tandoori-soya-chaap": "🔥",

  // Dhaba Special
  "aloo-paratha-plate": "🫓",
  "amritsari-aloo-kulcha": "🫓",
  "dhaba-channa-bhatura": "🍞",
  "gobi-paratha-plate": "🥬",
  "kachori-aloo-sabji": "🥔",
  "makki-roti-saag": "🌽",
  "mooli-paratha-plate": "🥬",
  "paneer-channa-bhatura": "🧀",
  "paneer-kulcha-makhani": "🧀",
  "punjabi-kadhi-chawal": "🍚",
  "puri-aloo-sabji": "🍞",
  "rajma-chawal": "🫘",

  // All Day Special
  "lunch-special-thali": "🍱",
  "north-indian-thali": "🍱",
  "south-indian-thali": "🍱",

  // Dalon Ki Bahar
  "aloo-achari": "🥒",
  "aloo-gobi": "🥦",
  "aloo-jeera": "🥔",
  "baigan-da-bhartha": "🍆",
  "bhindi-masala": "🥒",
  "chana-amritsari": "🫘",
  "cheese-tomato": "🍅",
  "dal-makhan-wali": "🍲",
  "kadai-paneer": "🧀",
  "kadi-pakora": "🍲",
  "makhmali-kofta": "🍡",
  "matar-methi-malai": "🟢",
  "matar-paneer": "🟢",
  "mix-vegetable": "🥗",
  "moong-dal-tadka": "🍲",
  "mushroom-butter-paneer": "🍄",
  "mushroom-matar": "🍄",
  "palak-corn-masala": "🌽",
  "palak-paneer": "🥬",
  "paneer-tomato-bhurji": "🍳",
  "paneer-zafrani": "🧀",
  "pindi-chana": "🫘",
  "rajmah-jammu-wale": "🫘",
  "sarson-ka-saag": "🌿",
  "shahi-paneer": "👑",
  "veg-kolhapuri": "🌶️",

  // Chinese
  "chilli-cheese": "🌶️",
  "chilli-garlic-noodles": "🍜",
  "dry-chilli-cauliflower": "🥦",
  "honey-chilli-potato": "🍟",
  "veg-fried-rice": "🍚",
  "veg-manchurian": "🍡",
  "veg-noodles": "🍜",

  // South Indian
  "idly-sambhar": "⚪",
  "vada-sambhar": "🍩",

  // Bombay
  "cheese-pav-bhaji": "🧀",
  "masala-pav": "🍞",
  "masala-pav-bhaji": "🍞",
  "mumbai-pav-bhaji": "🍞",
  "paneer-pav-bhaji": "🧀",
  "samosa-pav": "🥟",
  "vada-pav": "🍔",

  // Breads
  "aloo-parantha": "🫓",
  "butter-naan": "🫓",
  "chopdi-roti": "🫓",
  "garlic-naan": "🧄",
  "green-chilli-paratha": "🌶️",
  "lachha-paratha": "🫓",
  "methi-paratha": "🌿",
  "missi-roti": "🫓",
  "pudina-paratha": "🌿",
  "red-chilli-paratha": "🌶️",
  "stuffed-masala-kulcha": "🫓",
  "stuffed-parantha": "🫓",
  "tandoori-naan": "🫓",
  "tandoori-roti": "🫓",

  // Sides
  "dahi-bhalla": "🥛",
  "hara-bhara-salad": "🥗",
  "mix-raita": "🥣",
  papad: "🌾",
  "plain-dahi": "🥛",
  "pudina-chutney": "🌿",

  // Rice
  "jeera-rice": "🍚",
  "sada-chawal": "🍚",
  "subj-biryani": "🍛",
  "vegetable-pulao": "🍚",

  // Beverages
  "bottled-water": "💧",
  "chatti-di-lassi": "🥛",
  "fresh-lime-soda": "🍋",
  "green-tea": "🍵",
  "lassi-sweet": "🥛",
  "soft-drinks": "🥤",
  tea: "☕",

  // Meetha
  "gajar-halwa": "🥕",
  "gulab-jamun": "🟤",
  rasmalai: "🟡",
  "special-kheer": "🍮",
  "sponge-rasgulla": "⚪",
  "tilla-kulfi": "🍦",
};

export function getItemEmoji(itemId: string, categorySlug: string): string {
  return itemEmoji[itemId] ?? categoryEmoji[categorySlug] ?? "🍛";
}

export function getCategoryGradient(slug: string): string {
  return categoryGradient[slug] ?? "from-amber-100 to-rose-200";
}
