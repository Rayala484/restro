export type Option = { group: string; name: string; delta: number };
export type Dish = {
  id: string;
  name: string;
  desc: string;
  category: string;
  price: number;           // in ₹
  img: string;
  emoji: string;           // fallback if image fails
  veg: boolean;
  spice: 0 | 1 | 2 | 3;
  prep: number;            // minutes
  rating: number;
  ratingCount: number;
  popular?: boolean;
  options?: Option[];
};

const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&q=70&auto=format&fit=crop`;

export const categories = [
  { id: 'biryani', name: 'Biryani', emoji: '🍛' },
  { id: 'curries', name: 'Curries', emoji: '🍲' },
  { id: 'tandoori', name: 'Tandoori', emoji: '🍗' },
  { id: 'starters', name: 'Starters', emoji: '🍢' },
  { id: 'breads', name: 'Breads', emoji: '🫓' },
  { id: 'chinese', name: 'Indo-Chinese', emoji: '🥡' },
  { id: 'rolls', name: 'Rolls & Wraps', emoji: '🌯' },
  { id: 'desserts', name: 'Desserts', emoji: '🍮' },
  { id: 'beverages', name: 'Beverages', emoji: '🥤' },
];

const sizeOpts: Option[] = [
  { group: 'Portion', name: 'Regular', delta: 0 },
  { group: 'Portion', name: 'Large', delta: 80 },
];
const extra = (name: string, delta: number): Option => ({ group: 'Add-ons', name, delta });

export const dishes: Dish[] = [
  { id: 'hyd-chicken-biryani', name: 'Hyderabadi Chicken Biryani', desc: 'Slow-dum aromatic basmati layered with juicy chicken, saffron & fried onions.', category: 'biryani', price: 249, img: u('1563379091339-03b21ab4a4f8'), emoji: '🍛', veg: false, spice: 2, prep: 30, rating: 4.7, ratingCount: 2140, popular: true, options: [...sizeOpts, extra('Extra Raita', 30), extra('Boiled Egg', 25)] },
  { id: 'veg-dum-biryani', name: 'Veg Dum Biryani', desc: 'Fragrant basmati with garden vegetables, mint & whole spices.', category: 'biryani', price: 199, img: u('1596797038530-2c107229654b'), emoji: '🍚', veg: true, spice: 1, prep: 28, rating: 4.5, ratingCount: 980, popular: true, options: [...sizeOpts, extra('Extra Raita', 30)] },
  { id: 'mutton-biryani', name: 'Lucknowi Mutton Biryani', desc: 'Tender mutton on the bone, cooked low and slow with fragrant rice.', category: 'biryani', price: 329, img: u('1633945274405-b6c8069047b0'), emoji: '🍛', veg: false, spice: 2, prep: 35, rating: 4.8, ratingCount: 1520, options: [...sizeOpts, extra('Extra Gravy', 40)] },

  { id: 'butter-chicken', name: 'Butter Chicken', desc: 'Char-grilled chicken simmered in a silky tomato-butter gravy.', category: 'curries', price: 279, img: u('1603894584373-5ac82b2ae398'), emoji: '🍗', veg: false, spice: 1, prep: 25, rating: 4.8, ratingCount: 3100, popular: true, options: [extra('Extra Butter', 25), extra('Cream Swirl', 20)] },
  { id: 'paneer-butter-masala', name: 'Paneer Butter Masala', desc: 'Soft paneer cubes in a rich cashew-tomato makhani gravy.', category: 'curries', price: 239, img: u('1631452180519-c014fe946bc7'), emoji: '🧀', veg: true, spice: 1, prep: 22, rating: 4.6, ratingCount: 1780, popular: true, options: [extra('Extra Paneer', 60)] },
  { id: 'dal-makhani', name: 'Dal Makhani', desc: 'Black lentils slow-cooked overnight with butter and cream.', category: 'curries', price: 189, img: u('1546833999-b9f581a1996d'), emoji: '🫘', veg: true, spice: 0, prep: 20, rating: 4.5, ratingCount: 1240 },
  { id: 'kadai-chicken', name: 'Kadai Chicken', desc: 'Wok-tossed chicken with bell peppers and freshly ground kadai masala.', category: 'curries', price: 259, img: u('1588166524941-3bf61a9c41db'), emoji: '🍲', veg: false, spice: 3, prep: 24, rating: 4.6, ratingCount: 860 },

  { id: 'tandoori-chicken', name: 'Tandoori Chicken (Half)', desc: 'Yogurt & spice marinated chicken, smoked in a clay tandoor.', category: 'tandoori', price: 269, img: u('1610057099443-fde8c4d50f91'), emoji: '🍗', veg: false, spice: 2, prep: 26, rating: 4.7, ratingCount: 1440, popular: true },
  { id: 'paneer-tikka', name: 'Paneer Tikka', desc: 'Chargrilled paneer & peppers glazed with smoky tandoori marinade.', category: 'tandoori', price: 229, img: u('1567188040759-fb8a883dc6d8'), emoji: '🧀', veg: true, spice: 2, prep: 22, rating: 4.6, ratingCount: 1120, popular: true },
  { id: 'malai-tikka', name: 'Chicken Malai Tikka', desc: 'Creamy, mildly spiced chicken tikka melting off the skewer.', category: 'tandoori', price: 279, img: u('1626777552726-4a6b54c97e46'), emoji: '🍢', veg: false, spice: 1, prep: 24, rating: 4.7, ratingCount: 760 },

  { id: 'chilli-paneer', name: 'Chilli Paneer', desc: 'Crispy paneer tossed in a sweet-spicy Indo-Chinese sauce.', category: 'starters', price: 209, img: u('1626082927389-6cd097cee6a6'), emoji: '🌶️', veg: true, spice: 3, prep: 18, rating: 4.5, ratingCount: 990 },
  { id: 'chicken-65', name: 'Chicken 65', desc: 'Fiery South-Indian fried chicken with curry leaves & chilli.', category: 'starters', price: 219, img: u('1610057099431-d73a1c9d2f2f'), emoji: '🍗', veg: false, spice: 3, prep: 18, rating: 4.6, ratingCount: 1310, popular: true },
  { id: 'veg-spring-rolls', name: 'Veg Spring Rolls', desc: 'Golden, crunchy rolls stuffed with stir-fried veggies.', category: 'starters', price: 149, img: u('1585032226651-759b368d7246'), emoji: '🥢', veg: true, spice: 1, prep: 15, rating: 4.3, ratingCount: 540 },

  { id: 'butter-naan', name: 'Butter Naan', desc: 'Pillowy tandoor naan brushed with melted butter.', category: 'breads', price: 45, img: u('1626700051175-6818013e1d4f'), emoji: '🫓', veg: true, spice: 0, prep: 10, rating: 4.6, ratingCount: 2200 },
  { id: 'garlic-naan', name: 'Garlic Naan', desc: 'Naan loaded with roasted garlic & coriander.', category: 'breads', price: 55, img: u('1601050690597-df0568f70950'), emoji: '🧄', veg: true, spice: 0, prep: 10, rating: 4.7, ratingCount: 1900, popular: true },
  { id: 'laccha-paratha', name: 'Laccha Paratha', desc: 'Flaky, multi-layered whole-wheat paratha.', category: 'breads', price: 50, img: u('1565557623262-b51c2513a641'), emoji: '🫓', veg: true, spice: 0, prep: 12, rating: 4.4, ratingCount: 610 },

  { id: 'hakka-noodles', name: 'Veg Hakka Noodles', desc: 'Wok-tossed noodles with crunchy vegetables & soy.', category: 'chinese', price: 179, img: u('1585032226651-759b368d7246'), emoji: '🍜', veg: true, spice: 2, prep: 16, rating: 4.4, ratingCount: 870 },
  { id: 'chicken-manchurian', name: 'Chicken Manchurian', desc: 'Crispy chicken in a glossy garlic-ginger Manchurian sauce.', category: 'chinese', price: 229, img: u('1512058564366-18510be2db19'), emoji: '🥡', veg: false, spice: 2, prep: 20, rating: 4.5, ratingCount: 1020 },
  { id: 'veg-fried-rice', name: 'Veg Fried Rice', desc: 'Fluffy rice stir-fried with garden veggies & spring onion.', category: 'chinese', price: 169, img: u('1603133872878-684f208fb84b'), emoji: '🍚', veg: true, spice: 1, prep: 16, rating: 4.3, ratingCount: 720 },

  { id: 'chicken-kathi-roll', name: 'Chicken Kathi Roll', desc: 'Spiced chicken & onions rolled in a soft egg paratha.', category: 'rolls', price: 139, img: u('1626700051175-6818013e1d4f'), emoji: '🌯', veg: false, spice: 2, prep: 14, rating: 4.5, ratingCount: 1160, popular: true },
  { id: 'paneer-roll', name: 'Paneer Tikka Roll', desc: 'Smoky paneer tikka wrapped with mint chutney & onions.', category: 'rolls', price: 129, img: u('1600891964092-4316c288032e'), emoji: '🌯', veg: true, spice: 2, prep: 14, rating: 4.4, ratingCount: 640 },

  { id: 'gulab-jamun', name: 'Gulab Jamun (2 pcs)', desc: 'Warm milk-solid dumplings soaked in rose-cardamom syrup.', category: 'desserts', price: 89, img: u('1601303516534-71c3f0c1a4b1'), emoji: '🍮', veg: true, spice: 0, prep: 8, rating: 4.7, ratingCount: 1450, popular: true },
  { id: 'gajar-halwa', name: 'Gajar Ka Halwa', desc: 'Slow-cooked carrot halwa with ghee, khoya & nuts.', category: 'desserts', price: 119, img: u('1589301760014-d929f3979dbc'), emoji: '🥕', veg: true, spice: 0, prep: 8, rating: 4.6, ratingCount: 520 },

  { id: 'masala-chai', name: 'Masala Chai', desc: 'Slow-brewed spiced tea with ginger & cardamom.', category: 'beverages', price: 39, img: u('1571934811356-5cc061b6821f'), emoji: '☕', veg: true, spice: 0, prep: 6, rating: 4.5, ratingCount: 980 },
  { id: 'sweet-lassi', name: 'Sweet Lassi', desc: 'Thick, creamy yogurt blended smooth & chilled.', category: 'beverages', price: 79, img: u('1626082927389-6cd097cee6a6'), emoji: '🥤', veg: true, spice: 0, prep: 6, rating: 4.6, ratingCount: 710, popular: true },
];

export const offers = [
  { code: 'MTFOOD50', title: '50% OFF up to ₹100', sub: 'On your first order', tone: 'from-ember to-chili' },
  { code: 'FREEDEL', title: 'Free Delivery', sub: 'On orders above ₹299', tone: 'from-saffron to-ember' },
  { code: 'BIRYANI20', title: 'Flat 20% on Biryani', sub: 'Every weekend', tone: 'from-emerald-500 to-teal-600' },
];

export const dishById = (id: string) => dishes.find((d) => d.id === id);
export const rupee = (n: number) => '₹' + n.toLocaleString('en-IN');
