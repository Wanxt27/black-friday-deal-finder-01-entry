// DealHound data: real Black Friday 2026 deals, found and checked by the
// agent on Friday 27 November 2026. Every price below was shown by the
// named deals source on the date given there; the sources name the store
// for each deal. Prices move fast in Black Friday week, so each card shows
// when it was checked and links to the source that showed it.
// Money is in US dollars. "usual" is the price the source gave as the
// regular / comparable price; "comp" marks Best Buy comparable values,
// which are not past sale prices.

const CHECKED = "2026-11-27";

const SOURCES = {
  t9d7: { name: "9to5Toys, 25 Nov 2026", url: "https://9to5toys.com/2026/11/25/amazon-2026-black-friday-airpods-new-deals/" },
  t9d6: { name: "9to5Toys, 24 Nov 2026", url: "https://9to5toys.com/2026/11/24/amazon-2026-black-friday-week-day-6-new-deals/" },
  bb: { name: "BeeBulletin deals table, checked 24 Nov 2026", url: "https://beebulletin.com/black-friday-sale-dates-by-store/" },
  neeshu: { name: "Neeshu, checked 21 Nov 2026", url: "https://neeshu.com/news/black-friday-deals-2026.html" },
  techradar: { name: "TechRadar live blog, 22 Nov 2026", url: "https://www.techradar.com/live/news/black-friday-sales-us-22-november-2026" },
  tth: { name: "The Tech Hacker, checked 9 Nov 2026", url: "https://thetechhacker.com/2026/11/09/black-friday-2026-tech-deals-live-now/" },
  pv: { name: "PhillyVoice, 26 Nov 2026", url: "https://www.phillyvoice.com/black-friday-deals-philadelphia-2026/" },
  newsunc: { name: "NewsUnc, 21 Nov 2026", url: "https://www.newsunc.com/2026-11-21/" },
  hc: { name: "HouseCultures, 22 Nov 2026", url: "https://content.housecultures.com/dcg/1351101/amazon-early-black-friday-electronics-deals-key-details-explained" },
};

// id, name, store, category, sale price, usual price, source key,
// atl = source called it an all-time low, comp = comparable value,
// note = extra honest context shown on the card.
const DEALS = [
  { id: "amz-airpods-pro-3", name: "Apple AirPods Pro 3", store: "Amazon", cat: "Headphones & Audio", sale: 149, usual: 249, src: "t9d7", atl: true, note: "Amazon's lowest price ever for these, per 9to5Toys." },
  { id: "amz-airpods-max-2", name: "Apple AirPods Max 2", store: "Amazon", cat: "Headphones & Audio", sale: 419, usual: 549, src: "t9d7", atl: false, note: "$130 off the current model." },
  { id: "amz-watch-s12", name: "Apple Watch Series 12, GPS 42mm", store: "Amazon", cat: "Phones & Wearables", sale: 329, usual: 399, src: "t9d7", atl: true, note: "All-time low for the new Series 12." },
  { id: "amz-mba-1tb", name: "Apple MacBook Air 13-inch, M5, 16GB / 1TB", store: "Amazon", cat: "Laptops & Tablets", sale: 1299, usual: 1599, src: "t9d7", atl: false, note: "$300 off the 1TB model." },
  { id: "amz-ipad-mini", name: "Apple iPad mini, OLED, A20 Pro, 128GB", store: "Amazon", cat: "Laptops & Tablets", sale: 599, usual: 699, src: "t9d7", atl: true, note: "All-time low on the new OLED mini." },
  { id: "amz-ipad-pro", name: "Apple iPad Pro 13-inch, M5, 512GB", store: "Amazon", cat: "Laptops & Tablets", sale: 1349, usual: 1699, src: "t9d6", atl: false, note: "$350 off, one of the lowest prices ever." },
  { id: "amz-echo-dot", name: "Amazon Echo Dot", store: "Amazon", cat: "Smart Home", sale: 55, usual: 100, src: "t9d7", atl: true, note: "New all-time low." },
  { id: "amz-echo-studio", name: "Amazon Echo Studio", store: "Amazon", cat: "Smart Home", sale: 160, usual: 220, src: "t9d7", atl: true, note: "New all-time low." },
  { id: "amz-echo-studio-cam", name: "Amazon Echo Studio with Home Camera", store: "Amazon", cat: "Smart Home", sale: 180, usual: 250, src: "t9d7", atl: true, note: "New all-time low." },
  { id: "amz-echo-time", name: "Amazon Echo Time", store: "Amazon", cat: "Smart Home", sale: 100, usual: 200, src: "t9d7", atl: true, note: "New all-time low, half price." },
  { id: "amz-photo-frame", name: "Amazon Alexa Photo Frame", store: "Amazon", cat: "Smart Home", sale: 115, usual: 200, src: "t9d7", atl: true, note: "New all-time low, from $115." },
  { id: "amz-ftv-4k", name: "Amazon Fire TV Stick 4K", store: "Amazon", cat: "Smart Home", sale: 20, usual: 60, src: "t9d7", atl: true, note: "All-time low, a third of the regular price." },
  { id: "amz-ftv-cube", name: "Amazon Fire TV Cube, 4K Ultra HD, Wi-Fi 6E", store: "Amazon", cat: "Smart Home", sale: 90, usual: 200, src: "t9d7", atl: false, note: "More than half off." },
  { id: "amz-ftv-4k-plus", name: "Amazon Fire TV Stick 4K Plus, Wi-Fi 6", store: "Amazon", cat: "Smart Home", sale: 30, usual: 70, src: "t9d7", atl: false, note: "Over half off." },
  { id: "amz-ftv-4k-select", name: "Amazon Fire TV Stick 4K Select", store: "Amazon", cat: "Smart Home", sale: 18, usual: 50, src: "t9d7", atl: false, note: "Nearly two-thirds off." },
  { id: "amz-ftv-hd", name: "Amazon Fire TV Stick HD", store: "Amazon", cat: "Smart Home", sale: 16, usual: 40, src: "t9d7", atl: false, note: "60% off the cheapest Fire TV Stick." },
  { id: "amz-tab-8", name: "Amazon Alexa Tablet 8, 64GB", store: "Amazon", cat: "Laptops & Tablets", sale: 130, usual: 230, src: "t9d7", atl: true, note: "New all-time low." },
  { id: "amz-tab-11", name: "Amazon Alexa Tablet 11, 64GB", store: "Amazon", cat: "Laptops & Tablets", sale: 200, usual: 320, src: "t9d7", atl: true, note: "New all-time low." },
  { id: "amz-tab-12pro", name: "Amazon Alexa Tablet 12 Pro, 128GB", store: "Amazon", cat: "Laptops & Tablets", sale: 400, usual: 500, src: "t9d7", atl: true, note: "All-time low." },
  { id: "amz-lego-pokeball", name: "LEGO Pokemon Iconic Trainer Moments Poke Ball, 2,386 pieces", store: "Amazon", cat: "Toys & Games", sale: 225, usual: 300, src: "bb", atl: false, note: "$75 off the big Pokemon LEGO set." },
  { id: "amz-switch2", name: "Nintendo Switch 2 + Mario Kart World Bundle", store: "Amazon", cat: "Gaming", sale: 499.99, usual: 549.99, src: "t9d7", atl: false, note: "The only Switch 2 discount: $50 off the bundle, not the console alone." },
  { id: "amz-jbl-go5", name: "JBL Go 5 portable Bluetooth speaker", store: "Amazon", cat: "Headphones & Audio", sale: 39.95, usual: 54.95, src: "hc", atl: false, note: "Small speaker, honest small saving." },
  { id: "amz-bose-qc", name: "Bose QuietComfort headphones", store: "Amazon", cat: "Headphones & Audio", sale: 169, usual: 359, src: "neeshu", atl: false, note: "More than half off Bose's classic noise-cancelling pair." },
  { id: "amz-s26-ultra", name: "Samsung Galaxy S26 Ultra", store: "Amazon", cat: "Phones & Wearables", sale: 950, usual: 1400, src: "newsunc", atl: false, note: "$450 off Samsung's flagship phone." },
  { id: "amz-pixel-11", name: "Google Pixel 11", store: "Amazon", cat: "Phones & Wearables", sale: 699, usual: 899, src: "newsunc", atl: false, note: "$200 off, from $699." },

  { id: "bb-mba", name: "Apple MacBook Air 13-inch, M5, 16GB / 512GB", store: "Best Buy", cat: "Laptops & Tablets", sale: 1049, usual: 1299, src: "bb", atl: false, note: "$250 off; Amazon has shown it lower on some days." },
  { id: "bb-tcl-65", name: "TCL 65-inch 4K UHD HDR Smart TV with Fire TV (2026)", store: "Best Buy", cat: "TVs", sale: 229.99, usual: 469.99, src: "bb", atl: false, note: "Best Buy's headline doorbuster: $240 off a 65-inch TV." },
  { id: "bb-omnibook", name: "HP OmniBook 5, 14-inch 2K OLED touchscreen laptop", store: "Best Buy", cat: "Laptops & Tablets", sale: 449.99, usual: 799.99, src: "bb", atl: false, note: "$350 off an OLED laptop under $450." },
  { id: "bb-xm5", name: "Sony WH-1000XM5 noise-cancelling headphones", store: "Best Buy", cat: "Headphones & Audio", sale: 169, usual: 398, src: "bb", atl: false, note: "$229 off Sony's flagship noise-cancelling pair." },
  { id: "bb-s26fe", name: "Samsung Galaxy S26 FE", store: "Best Buy", cat: "Phones & Wearables", sale: 499.99, usual: 699.99, src: "bb", atl: false, note: "$200 off Samsung's cheaper flagship." },
  { id: "bb-shark", name: "Shark PowerDetect Speed cordless stick vacuum", store: "Best Buy", cat: "Kitchen & Home", sale: 199.99, usual: 499.99, src: "bb", atl: false, note: "$300 off, 60% down." },
  { id: "bb-fridge", name: "Insignia 18 cu. ft. top-freezer refrigerator", store: "Best Buy", cat: "Kitchen & Home", sale: 299.99, usual: 749.99, src: "bb", atl: false, note: "$450 off a full-size fridge." },
  { id: "bb-insignia-tv", name: "Insignia 40-inch Fire TV", store: "Best Buy", cat: "TVs", sale: 89.99, usual: 149.99, src: "bb", atl: false, note: "A $90 TV for a spare room." },
  { id: "bb-iphone17pro", name: "Apple iPhone 17 Pro", store: "Best Buy", cat: "Phones & Wearables", sale: 1099.99, usual: 1199.99, src: "bb", atl: false, note: "Only $100 off, and only with activation. The weakest Apple cut here." },
  { id: "bb-s84h", name: "Samsung 65-inch S84H OLED TV (2026)", store: "Best Buy", cat: "TVs", sale: 999.99, usual: 2099.99, src: "tth", comp: true, note: "Best Buy compares against a comparable value, not a past price, so treat the 52% with care." },
  { id: "bb-c6-55", name: "LG 55-inch C6 OLED evo TV (2026)", store: "Best Buy", cat: "TVs", sale: 999.99, usual: 1999.99, src: "tth", comp: true, note: "Best Buy compares against a comparable value, not a past price, so treat the 50% with care." },
  { id: "bb-ch720n", name: "Sony WH-CH720N headphones", store: "Best Buy", cat: "Headphones & Audio", sale: 88, usual: 178, src: "tth", comp: true, note: "Half-price everyday Sony headphones; price shown against a comparable value." },
  { id: "bb-beats-solo4", name: "Beats Solo 4 headphones", store: "Best Buy", cat: "Headphones & Audio", sale: 129.99, usual: 199.99, src: "tth", comp: true, note: "Price shown against a comparable value." },
  { id: "bb-dualsense", name: "PlayStation DualSense wireless controller for PS5", store: "Best Buy", cat: "Gaming", sale: 54.99, usual: 74.99, src: "techradar", atl: false, note: "$20 off the standard PS5 controller." },

  { id: "costco-sonos", name: "Sonos Arc Ultra Soundbar Bundle", store: "Costco", cat: "Headphones & Audio", sale: 849.99, usual: 1099.99, src: "bb", atl: false, note: "$250 off the bundle, through 30 Nov. Membership required." },
  { id: "costco-switch2", name: "Nintendo Switch 2 + Mario Kart World + 12 months Switch Online", store: "Costco", cat: "Gaming", sale: 519.99, usual: 569.99, src: "pv", atl: false, note: "$50 off the bundle, plus a year of Switch Online with Expansion Pack. Membership required." },

  { id: "wm-airpods-pro-3", name: "Apple AirPods Pro 3", store: "Walmart", cat: "Headphones & Audio", sale: 179, usual: 249, src: "neeshu", atl: false, note: "Same earbuds, $30 more than Amazon's $149, so check Amazon first." },

  { id: "tgt-ninja", name: "Ninja Pro XL 6-in-1 air fryer (AF181)", store: "Target", cat: "Kitchen & Home", sale: 129.99, usual: 179.99, src: "tth", atl: false, note: "Target's kitchen pick: $50 off." },
  { id: "tgt-keurig", name: "Keurig K-Mini Go coffee maker", store: "Target", cat: "Kitchen & Home", sale: 69.99, usual: 88.99, src: "tth", atl: false, note: "A small, honest cut on a small machine." },

  { id: "hd-ring", name: "Ring Starter Set: Battery Doorbell 2K + Indoor Cam Plus 2K", store: "Home Depot", cat: "Smart Home", sale: 59.99, usual: 139.99, src: "tth", atl: false, note: "Doorbell plus camera for less than the doorbell alone usually costs." },

  { id: "sams-dollhouse", name: "Member's Mark Carousel Cove Dollhouse", store: "Sam's Club", cat: "Toys & Games", sale: 129.98, usual: 179.98, src: "pv", atl: false, note: "$50 off, 26-29 Nov. Membership required." },
  { id: "sams-kitchen", name: "Member's Mark Deluxe Modern Kitchen Playset", store: "Sam's Club", cat: "Toys & Games", sale: 129.98, usual: 179.98, src: "pv", atl: false, note: "$50 off, 26-29 Nov. Membership required." },
];

const CATEGORIES = ["TVs", "Laptops & Tablets", "Headphones & Audio", "Smart Home", "Gaming", "Kitchen & Home", "Toys & Games", "Phones & Wearables"];
const STORES = ["Amazon", "Best Buy", "Walmart", "Target", "Costco", "Home Depot", "Sam's Club"];
