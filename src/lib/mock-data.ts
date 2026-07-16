export const categories = [
  { name: "Pizza", emoji: "🍕", color: "from-orange-100 to-red-100" },
  { name: "Burger", emoji: "🍔", color: "from-yellow-100 to-orange-100" },
  { name: "Biryani", emoji: "🍚", color: "from-amber-100 to-yellow-100" },
  { name: "South Indian", emoji: "🥘", color: "from-lime-100 to-green-100" },
  { name: "North Indian", emoji: "🍛", color: "from-red-100 to-pink-100" },
  { name: "Chinese", emoji: "🥡", color: "from-rose-100 to-red-100" },
  { name: "Desserts", emoji: "🍰", color: "from-pink-100 to-fuchsia-100" },
  { name: "Drinks", emoji: "🥤", color: "from-sky-100 to-blue-100" },
  { name: "Healthy", emoji: "🥗", color: "from-green-100 to-emerald-100" },
  { name: "Breakfast", emoji: "🥞", color: "from-amber-100 to-orange-100" },
  { name: "Snacks", emoji: "🍟", color: "from-yellow-100 to-amber-100" },
  { name: "Ice Cream", emoji: "🍦", color: "from-sky-100 to-indigo-100" },
];

export const banners = [
  { id: 1, title: "50% OFF on your first order", subtitle: "Use code WELCOME50", tag: "New User Offer", gradient: "linear-gradient(135deg, #FF6B35 0%, #FFA726 100%)", emoji: "🎉" },
  { id: 2, title: "Free delivery all weekend", subtitle: "No minimum order value", tag: "Free Delivery", gradient: "linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)", emoji: "🚀" },
  { id: 3, title: "Buy 1 Get 1 Free", subtitle: "On selected pizzas today", tag: "Festival Special", gradient: "linear-gradient(135deg, #EF5350 0%, #FF6B35 100%)", emoji: "🍕" },
];

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  distance: string;
  offer?: string;
  isVeg?: boolean;
  freeDelivery?: boolean;
  minOrder: number;
  emoji: string;
  gradient: string;
};

export const restaurants: Restaurant[] = [
  { id: "r1", name: "The Pizza Hub", cuisine: "Italian • Pizza", rating: 4.6, reviews: 1240, deliveryTime: "25-30 min", distance: "1.2 km", offer: "50% OFF up to ₹100", freeDelivery: true, minOrder: 199, emoji: "🍕", gradient: "linear-gradient(135deg,#FF6B35,#FFA726)" },
  { id: "r2", name: "Biryani Palace", cuisine: "Hyderabadi • Biryani", rating: 4.8, reviews: 3421, deliveryTime: "30-40 min", distance: "2.5 km", offer: "20% OFF", minOrder: 249, emoji: "🍚", gradient: "linear-gradient(135deg,#F57C00,#FFB74D)" },
  { id: "r3", name: "Green Bowl", cuisine: "Healthy • Salads", rating: 4.5, reviews: 890, deliveryTime: "20-25 min", distance: "0.8 km", isVeg: true, freeDelivery: true, minOrder: 149, emoji: "🥗", gradient: "linear-gradient(135deg,#4CAF50,#8BC34A)" },
  { id: "r4", name: "Burger Barn", cuisine: "American • Burgers", rating: 4.4, reviews: 2100, deliveryTime: "20-25 min", distance: "1.5 km", offer: "Flat ₹75 OFF", minOrder: 199, emoji: "🍔", gradient: "linear-gradient(135deg,#EF5350,#FF6B35)" },
  { id: "r5", name: "Dragon Wok", cuisine: "Chinese • Asian", rating: 4.3, reviews: 1560, deliveryTime: "25-35 min", distance: "2.0 km", offer: "30% OFF", minOrder: 199, emoji: "🥡", gradient: "linear-gradient(135deg,#E53935,#EF9A9A)" },
  { id: "r6", name: "Sweet Spot", cuisine: "Desserts • Bakery", rating: 4.7, reviews: 980, deliveryTime: "15-20 min", distance: "0.6 km", isVeg: true, freeDelivery: true, minOrder: 99, emoji: "🍰", gradient: "linear-gradient(135deg,#EC407A,#F48FB1)" },
  { id: "r7", name: "Dosa Express", cuisine: "South Indian • Breakfast", rating: 4.6, reviews: 2340, deliveryTime: "20-30 min", distance: "1.8 km", isVeg: true, offer: "10% OFF", minOrder: 149, emoji: "🥘", gradient: "linear-gradient(135deg,#7CB342,#C5E1A5)" },
  { id: "r8", name: "Tandoor Tales", cuisine: "North Indian • Mughlai", rating: 4.5, reviews: 1870, deliveryTime: "30-40 min", distance: "3.0 km", offer: "Flat ₹100 OFF", minOrder: 299, emoji: "🍛", gradient: "linear-gradient(135deg,#F4511E,#FFAB91)" },
];

export type Food = {
  id: string;
  restaurantId: string;
  name: string;
  restaurant: string;
  description: string;
  price: number;
  discountPrice?: number;
  rating: number;
  isVeg?: boolean;
  emoji: string;
  gradient: string;
};

export const allFoods: Food[] = [
  // The Pizza Hub
  { id: "f1",  restaurantId: "r1", name: "Margherita Pizza",      restaurant: "The Pizza Hub",  description: "Classic delight with 100% mozzarella cheese",         price: 349, discountPrice: 249, rating: 4.6, isVeg: true,  emoji: "🍕", gradient: "linear-gradient(135deg,#FFE0B2,#FFCC80)" },
  { id: "f2",  restaurantId: "r1", name: "Pepperoni Pizza",        restaurant: "The Pizza Hub",  description: "Loaded with spicy pepperoni & extra cheese",           price: 399,                  rating: 4.5,               emoji: "🍕", gradient: "linear-gradient(135deg,#FFCCBC,#FFAB91)" },
  { id: "f3",  restaurantId: "r1", name: "BBQ Chicken Pizza",      restaurant: "The Pizza Hub",  description: "Smoky BBQ sauce, grilled chicken, onions",             price: 429, discountPrice: 349, rating: 4.7,               emoji: "🍕", gradient: "linear-gradient(135deg,#FF8A65,#FFAB91)" },
  { id: "f4",  restaurantId: "r1", name: "Garlic Bread",           restaurant: "The Pizza Hub",  description: "Crispy garlic bread with herb butter",                 price: 129,                  rating: 4.3, isVeg: true,  emoji: "🥖", gradient: "linear-gradient(135deg,#FFF9C4,#FFF176)" },
  { id: "f5",  restaurantId: "r1", name: "Pasta Arrabbiata",       restaurant: "The Pizza Hub",  description: "Penne in spicy tomato sauce with fresh basil",         price: 249, discountPrice: 199, rating: 4.4, isVeg: true,  emoji: "🍝", gradient: "linear-gradient(135deg,#FFCDD2,#EF9A9A)" },

  // Biryani Palace
  { id: "f6",  restaurantId: "r2", name: "Chicken Biryani",        restaurant: "Biryani Palace", description: "Aromatic basmati rice with tender chicken",            price: 299,                  rating: 4.8,               emoji: "🍛", gradient: "linear-gradient(135deg,#FFCC80,#FFB74D)" },
  { id: "f7",  restaurantId: "r2", name: "Mutton Biryani",         restaurant: "Biryani Palace", description: "Slow-cooked mutton with saffron basmati",             price: 379,                  rating: 4.9,               emoji: "🍚", gradient: "linear-gradient(135deg,#FFB74D,#FFA726)" },
  { id: "f8",  restaurantId: "r2", name: "Veg Biryani",            restaurant: "Biryani Palace", description: "Fragrant rice with seasonal vegetables & spices",     price: 229, discountPrice: 189, rating: 4.5, isVeg: true,  emoji: "🍚", gradient: "linear-gradient(135deg,#C8E6C9,#A5D6A7)" },
  { id: "f9",  restaurantId: "r2", name: "Raita",                  restaurant: "Biryani Palace", description: "Chilled yogurt with cucumber & mint",                 price: 59,                   rating: 4.2, isVeg: true,  emoji: "🥛", gradient: "linear-gradient(135deg,#E3F2FD,#BBDEFB)" },
  { id: "f10", restaurantId: "r2", name: "Shahi Korma",            restaurant: "Biryani Palace", description: "Rich creamy curry with cashews & aromatic spices",    price: 319,                  rating: 4.6,               emoji: "🍲", gradient: "linear-gradient(135deg,#FFE0B2,#FFCC80)" },

  // Green Bowl
  { id: "f11", restaurantId: "r3", name: "Paneer Tikka Bowl",      restaurant: "Green Bowl",     description: "Grilled paneer with fresh greens & quinoa",           price: 279, discountPrice: 229, rating: 4.5, isVeg: true,  emoji: "🥗", gradient: "linear-gradient(135deg,#C8E6C9,#A5D6A7)" },
  { id: "f12", restaurantId: "r3", name: "Avocado Salad",          restaurant: "Green Bowl",     description: "Fresh avocado, cherry tomatoes, feta & lemon dressing",price: 249,                  rating: 4.4, isVeg: true,  emoji: "🥑", gradient: "linear-gradient(135deg,#DCEDC8,#C5E1A5)" },
  { id: "f13", restaurantId: "r3", name: "Grilled Chicken Wrap",   restaurant: "Green Bowl",     description: "Whole wheat wrap with grilled chicken & veggies",     price: 219,                  rating: 4.6,               emoji: "🌯", gradient: "linear-gradient(135deg,#F0F4C3,#E6EE9C)" },
  { id: "f14", restaurantId: "r3", name: "Acai Smoothie Bowl",     restaurant: "Green Bowl",     description: "Acai blend topped with granola, banana & berries",    price: 199, discountPrice: 169, rating: 4.7, isVeg: true,  emoji: "🫐", gradient: "linear-gradient(135deg,#E1BEE7,#CE93D8)" },

  // Burger Barn
  { id: "f15", restaurantId: "r4", name: "Cheese Burst Burger",    restaurant: "Burger Barn",    description: "Double patty with molten cheese core",                 price: 249,                  rating: 4.4,               emoji: "🍔", gradient: "linear-gradient(135deg,#FFCDD2,#FFAB91)" },
  { id: "f16", restaurantId: "r4", name: "Crispy Chicken Burger",  restaurant: "Burger Barn",    description: "Crunchy fried chicken with coleslaw & pickles",        price: 229, discountPrice: 189, rating: 4.5,               emoji: "🍔", gradient: "linear-gradient(135deg,#FFE0B2,#FFCC80)" },
  { id: "f17", restaurantId: "r4", name: "Veggie Delight Burger",  restaurant: "Burger Barn",    description: "Aloo tikki patty with fresh veggies & mint chutney",  price: 179,                  rating: 4.2, isVeg: true,  emoji: "🍔", gradient: "linear-gradient(135deg,#DCEDC8,#C5E1A5)" },
  { id: "f18", restaurantId: "r4", name: "Loaded Fries",           restaurant: "Burger Barn",    description: "Crispy fries topped with cheese sauce & jalapeños",   price: 149,                  rating: 4.3, isVeg: true,  emoji: "🍟", gradient: "linear-gradient(135deg,#FFF9C4,#FFF176)" },
  { id: "f19", restaurantId: "r4", name: "Onion Rings",            restaurant: "Burger Barn",    description: "Golden crispy onion rings with dipping sauce",         price: 119,                  rating: 4.1, isVeg: true,  emoji: "🧅", gradient: "linear-gradient(135deg,#FFECB3,#FFE082)" },

  // Dragon Wok
  { id: "f20", restaurantId: "r5", name: "Veg Fried Rice",         restaurant: "Dragon Wok",     description: "Wok-tossed rice with fresh vegetables & soy sauce",   price: 199,                  rating: 4.3, isVeg: true,  emoji: "🍚", gradient: "linear-gradient(135deg,#FFCDD2,#EF9A9A)" },
  { id: "f21", restaurantId: "r5", name: "Chicken Manchurian",     restaurant: "Dragon Wok",     description: "Crispy chicken in tangy Manchurian sauce",             price: 249, discountPrice: 209, rating: 4.5,               emoji: "🍗", gradient: "linear-gradient(135deg,#FFCCBC,#FFAB91)" },
  { id: "f22", restaurantId: "r5", name: "Hakka Noodles",          restaurant: "Dragon Wok",     description: "Stir-fried noodles with veggies & chilli sauce",       price: 189,                  rating: 4.2, isVeg: true,  emoji: "🍜", gradient: "linear-gradient(135deg,#FFF9C4,#FFF176)" },
  { id: "f23", restaurantId: "r5", name: "Dim Sum Basket",         restaurant: "Dragon Wok",     description: "Steamed dumplings with ginger soy dip (6 pcs)",        price: 219,                  rating: 4.6,               emoji: "🥟", gradient: "linear-gradient(135deg,#E3F2FD,#BBDEFB)" },

  // Sweet Spot
  { id: "f24", restaurantId: "r6", name: "Chocolate Lava Cake",    restaurant: "Sweet Spot",     description: "Warm molten chocolate centre with vanilla ice cream",  price: 179, discountPrice: 139, rating: 4.7, isVeg: true,  emoji: "🍰", gradient: "linear-gradient(135deg,#D7CCC8,#BCAAA4)" },
  { id: "f25", restaurantId: "r6", name: "Gulab Jamun",            restaurant: "Sweet Spot",     description: "Soft milk-solid dumplings soaked in rose syrup",       price: 99,                   rating: 4.5, isVeg: true,  emoji: "🍮", gradient: "linear-gradient(135deg,#FFE0B2,#FFCC80)" },
  { id: "f26", restaurantId: "r6", name: "Tiramisu",               restaurant: "Sweet Spot",     description: "Classic Italian dessert with espresso & mascarpone",  price: 199,                  rating: 4.8, isVeg: true,  emoji: "🍰", gradient: "linear-gradient(135deg,#D7CCC8,#A1887F)" },
  { id: "f27", restaurantId: "r6", name: "Mango Cheesecake",       restaurant: "Sweet Spot",     description: "Creamy cheesecake with fresh Alphonso mango topping",  price: 219, discountPrice: 179, rating: 4.6, isVeg: true,  emoji: "🥭", gradient: "linear-gradient(135deg,#FFF9C4,#FFE082)" },

  // Dosa Express
  { id: "f28", restaurantId: "r7", name: "Masala Dosa",            restaurant: "Dosa Express",   description: "Crispy dosa with spiced potato filling & chutneys",   price: 129,                  rating: 4.6, isVeg: true,  emoji: "🥘", gradient: "linear-gradient(135deg,#F0F4C3,#E6EE9C)" },
  { id: "f29", restaurantId: "r7", name: "Idli Sambar",            restaurant: "Dosa Express",   description: "Soft steamed idlis with piping hot sambar & chutney", price: 99,                   rating: 4.4, isVeg: true,  emoji: "🍱", gradient: "linear-gradient(135deg,#E8F5E9,#C8E6C9)" },
  { id: "f30", restaurantId: "r7", name: "Uttapam",                restaurant: "Dosa Express",   description: "Thick rice pancake topped with onion, tomato & chilli",price: 149,                  rating: 4.3, isVeg: true,  emoji: "🥞", gradient: "linear-gradient(135deg,#DCEDC8,#C5E1A5)" },
  { id: "f31", restaurantId: "r7", name: "Filter Coffee",          restaurant: "Dosa Express",   description: "Authentic South Indian decoction coffee with milk",    price: 59,                   rating: 4.7, isVeg: true,  emoji: "☕", gradient: "linear-gradient(135deg,#D7CCC8,#BCAAA4)" },

  // Tandoor Tales
  { id: "f32", restaurantId: "r8", name: "Butter Chicken",         restaurant: "Tandoor Tales",  description: "Tender chicken in rich tomato-butter gravy",           price: 329,                  rating: 4.7,               emoji: "🍛", gradient: "linear-gradient(135deg,#FFCCBC,#FFAB91)" },
  { id: "f33", restaurantId: "r8", name: "Dal Makhani",            restaurant: "Tandoor Tales",  description: "Slow-cooked black lentils in creamy tomato gravy",     price: 249,                  rating: 4.5, isVeg: true,  emoji: "🫘", gradient: "linear-gradient(135deg,#D7CCC8,#BCAAA4)" },
  { id: "f34", restaurantId: "r8", name: "Garlic Naan",            restaurant: "Tandoor Tales",  description: "Soft tandoor-baked naan with garlic & butter",         price: 59,                   rating: 4.4, isVeg: true,  emoji: "🫓", gradient: "linear-gradient(135deg,#FFF9C4,#FFF176)" },
  { id: "f35", restaurantId: "r8", name: "Paneer Tikka",           restaurant: "Tandoor Tales",  description: "Marinated paneer cubes grilled in tandoor",            price: 279, discountPrice: 239, rating: 4.6, isVeg: true,  emoji: "🧀", gradient: "linear-gradient(135deg,#FFE0B2,#FFCC80)" },
  { id: "f36", restaurantId: "r8", name: "Seekh Kebab",            restaurant: "Tandoor Tales",  description: "Minced lamb kebabs with mint chutney",                 price: 299,                  rating: 4.8,               emoji: "🍢", gradient: "linear-gradient(135deg,#FFCCBC,#FF8A65)" },
];

// Keep recommendedFoods as a subset for the home page
export const recommendedFoods: Food[] = allFoods.filter((f) =>
  ["f1", "f6", "f11", "f15", "f24", "f28", "f32"].includes(f.id),
);

export const offers = [
  { id: "o1", code: "WELCOME50", title: "50% OFF", subtitle: "On first order above ₹199", gradient: "linear-gradient(135deg,#FF6B35,#FFA726)" },
  { id: "o2", code: "FREEDEL", title: "Free Delivery", subtitle: "No minimum order", gradient: "linear-gradient(135deg,#4CAF50,#8BC34A)" },
  { id: "o3", code: "BOGO", title: "Buy 1 Get 1", subtitle: "On selected pizzas", gradient: "linear-gradient(135deg,#EF5350,#FF6B35)" },
];
