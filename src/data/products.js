export const categories = ["Hoodies", "T-Shirts", "Sneakers", "Jackets", "Jeans", "Slides", "Caps", "Bags", "Tracksuits", "Bottoms", "Socks"];

const clothingSizes = ["S", "M", "L", "XL"];
const footwearSizes = ["40", "41", "42", "43", "44"];

/* Image format switch.
   Leave false until you have run:  node scripts/optimize-images.mjs
   and it has printed "done" for every file. Then set it to true. */
const USE_WEBP = false;

const imageUrl = (file) =>
  `/images/${USE_WEBP ? file.replace(/\.(png|jpe?g)$/i, ".webp") : file}`;

const imageCatalog = [
  ["Hoodies", ["hood.png", "blackhood.png"]],
  ["T-Shirts", ["shirts.png", "shirt1.png", "shirt2.png", "red-shirt.png", "white-shirt.png"]],
  ["Sneakers", ["sneaks.png", "bestsneaks.png", "sneaks1.png", "sneaks2.png"]],
  ["Jackets", ["jacket1.png"]],
  ["Jeans", ["jean.png", "jean2.png", "jean3.png", "jean4.png", "baggyjean2.png", "Favjean.png"]],
  ["Slides", ["Y3slides.png", "redslides.png", "whiteslides.png"]],
  ["Caps", ["cap1.png", "cap2.png", "Cap3.png", "cap4.png", "cap5.png", "cap6.png", "capAll.png", "capnicey.png", "niceCap.png"]],
  ["Bags", ["bag1.png", "bag4.png", "varbags.png"]],
  ["Tracksuits", ["Tracksuite1.png"]],
  ["Bottoms", ["bottom.png"]],
  ["Socks", []], // add sock file names here, e.g. ["socks1.png", "socks2.png"]
];

const categoryPrices = {
  Hoodies: 59.99,
  "T-Shirts": 29.99,
  Sneakers: 30.99,
  Jackets: 25.99,
  Jeans: 15.99,
  Slides: 15.99,
  Caps: 10.99,
  Bags: 54.99,
  Tracksuits: 49.99,
  Bottoms: 29.99,
  Socks: 7.99, // placeholder price, tell me the real one
};

let nextProductId = 0;

export const products = imageCatalog.flatMap(([category, images]) =>
  images.map((image, index) => ({
    id: ++nextProductId,
    name: index === 0 ? `Drip ${category}` : `Drip ${category} ${index + 1}`,
    category,
    price: categoryPrices[category],
    image: imageUrl(image),
    description: `A fresh pick from the Drip ${category.toLowerCase()} collection.`,
    sizes: category === "Caps" || category === "Bags" || category === "Socks" ? ["One Size"] :
      category === "Sneakers" || category === "Slides" ? footwearSizes : clothingSizes,
    colors: ["As shown"],
    bestSeller: index === 0 && ["Hoodies", "T-Shirts", "Sneakers", "Jackets", "Caps"].includes(category),
  }))
);

/* Complete outfits for the combo section. I'll fill this in when you send the photos.
   Example:
   { id: 1, name: "Street King Fit", price: 119.99, image: "/images/combo1.png",
     pieces: ["Hoodie", "Jeans", "Sneakers", "Cap"] } */
export const combos = [];