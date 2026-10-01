# 🥗 FreshBite &mdash; Local Kitchen &amp; Food Ordering Platform

FreshBite is a complete, production-ready, fully responsive food-ordering web application built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. It represents a modern, farm-to-table local restaurant offering fast neighborhood delivery, sustainable packaging, and wholesome scratch-cooked meals.

---

## 🌟 Key Features

### 1. 🏠 Home Page (`/`)
- **Appetizing Hero Section**: Bold headline, value propositions (25-35 min delivery, 4.9★ rating, 100% organic compostable packaging), dual call-to-actions ("Order Now", "Our Farm Story"), and high-resolution food presentation.
- **Quick-Browse Categories**: Clickable category cards that jump directly into filtered menu categories (Signature Bowls, Artisan Burgers, Garden Salads, Stone-Oven Pizzas, Sweet Treats, Cold-Pressed Drinks).
- **Promotional Deals Banner**: Interactive coupon showcase (`FRESH10`) with one-click copy and auto-apply functionality.
- **Featured Chef Specials**: Highlighted dishes with instant "Add to Cart" and dietary badges.
- **Why Choose FreshBite**: 4 value pillars covering 50-mile farm sourcing, scratch cooking, eco-delivery, and zero artificial preservatives.
- **Customer Testimonials**: Authentic customer reviews with star ratings and reviewer badges.

### 2. 🍽️ Menu Page (`/menu`)
- **16 Delicious Products**: Fully loaded with high-resolution food imagery, descriptions, prices, categories, calories, prep times, reviews, and dietary tags.
- **Instant Search Function**: Real-time filtering across product names, descriptions, and ingredients.
- **Category Filtering**: Seamlessly filter between All Items, Bowls, Burgers, Salads, Pizzas, Desserts, and Drinks.
- **Dietary Filter Pills**: Filter dishes by *Vegetarian*, *Gluten-Free*, *Spicy*, or *Chef's Special*.
- **Flexible Sorting**: Sort by Chef Recommended, Price (Low to High / High to Low), Customer Rating, or Calories.
- **Detailed Nutritional & Allergen View**: Expandable ingredient and allergen breakdown on every product card.
- **Interactive Add to Cart**: Stepper controls to select quantity before adding, with instant visual feedback and toast confirmation.

### 3. 📖 About Page (`/about`)
- **Our Heritage Story**: The founding story of FreshBite and our mission to reinvent delivery dining.
- **Impact & Sustainability Stats**: Live metrics on partner farms, 100% compostable packaging, and 0 industrial seed oils.
- **Culinary Leadership**: Bios and roles for Executive Chef Elena Rivera, Farm Liaison Marcus Chen, and Pastry Specialist Chloe Bennett.
- **Farm-to-Kitchen Timeline**: Milestones tracing the evolution of our neighborhood kitchen.

### 4. ✉️ Contact Page (`/contact`)
- **Interactive Client-Side Contact Form**: Full field validation (First & Last Name, Email, Phone, Inquiry Subject, Message, and Reply Preference).
- **Realistic Submission & Success State**: Simulated processing spinner followed by a confirmed reference ticket (e.g. `FB-MSG-829103`) and prompt response ETA.
- **Interactive FAQ Accordion**: Expandable questions and answers covering delivery radius, allergen handling, catering, and refund policies.
- **Kitchen Details & Store Location**: Operating hours, direct order hotline, email channels, and stylized map representation of 142 Green Street.

### 5. 🛒 Cart Page (`/cart`)
- **Cart Management**: Add products, remove products, and increase or decrease item quantities in real time.
- **Free Delivery Progress Bar**: Live calculation showing how much more to add to unlock free delivery (threshold: $40.00).
- **Promo Code Engine**: Test codes supported out of the box:
  - `FRESH10` &rarr; 10% off entire order
  - `FREESHIP` &rarr; 100% free delivery
  - `HEALTHY20` &rarr; 20% off
- **Financial Calculations**: Subtotal, discount calculations, delivery fee, 8.5% sales tax, and final grand total.
- **Persistent Storage**: Cart state automatically syncs to browser `localStorage`.
- **Special Instructions**: Support for custom notes per item.

### 6. 💳 Demo Checkout Page (`/checkout`)
- **Clear Demo Disclaimers**: Bold visual notices clarifying that no real payments are processed or stored.
- **One-Click Auto-Fill Demo Button**: Instantly populates realistic test customer and address information.
- **Customer & Address Forms**: Name, email, phone, street address, apt/suite, city, zip code, and driver instructions.
- **Delivery Courier Selection**: Standard (25-35m), Priority Express (15-20m), or Eco E-Bike (Zero-CO2).
- **Simulated Payment Options**: Demo credit card, demo Apple/Google Pay, and cash on delivery.
- **Card Input Formatting**: Fields for simulated card number, expiration date, and CVC.
- **Live Order Review Sidebar**: Review items and cost breakdown before submitting.

### 7. 🎉 Order Confirmation Page (`/order-confirmation`)
- **Fake Order Reference Number**: e.g., `#FB-82419`.
- **Animated 4-Stage Kitchen Tracker**:
  1. *Order Placed* &rarr; Confirmed
  2. *In the Kitchen* &rarr; Preparing fresh (animated)
  3. *Out for Delivery* &rarr; Courier assigned
  4. *Delivered* &rarr; At your door
- **Delivery Window ETA**: Countdown estimate (e.g. 25-35 minutes).
- **Itemized Printable Receipt**: Summary of items, subtotal, discounts, taxes, and total with a working `window.print()` button.
- **Recap of Delivery Address & Instructions**: Clear summary of where the food is traveling.

---

## 📊 Analytics & Event Tracking Ready

The application includes an integrated **Analytics & Event Tracking Engine** (`src/lib/analytics.ts`) and a live **Interactive Analytics HUD** (floating in the bottom-right corner):

1. **Tracked User Activity**:
   - `page_view`: Emitted on every client route transition.
   - `menu_search`: Emitted when user types queries in the menu search bar.
   - `category_filter`: Emitted when switching between categories.
   - `dietary_filter`: Emitted when toggling Vegetarian, Gluten-Free, Spicy, or Chef's Special filters.
   - `add_to_cart`: Emitted with product ID, item name, unit price, quantity, and line total.
   - `remove_from_cart` & `update_cart_quantity`: Emitted on cart modifications.
   - `apply_promo_code`: Emitted with promo code validity and discount percentage.
   - `begin_checkout`: Emitted when clicking "Continue to Checkout".
   - `form_interaction`: Emitted on input focus/blur events.
   - `contact_form_submit`: Emitted on contact inquiry submission.
   - `checkout_completed`: Emitted with the full order payload, order ID, items list, and totals.
2. **Dual Dispatch**:
   - **`CustomEvent` (`freshbite:analytics`)**: Dispatched on `window` for external trackers or custom listeners.
   - **`window.dataLayer.push(...)`**: Standard Google Tag Manager / Segment compatible format.
   - **Stylized Console Logs**: Formatted with brand tags in browser developer tools.
   - **Live HUD Inspector**: Click the floating **"Live Analytics"** badge in the bottom-right corner of any page to view live event feeds and copy JSON payloads!

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context (`CartContext`) with `localStorage` persistence
- **Images**: Next.js Image with remote pattern optimization for Unsplash food photography

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18.17+ or v20+ (tested on Node v22.14.0)
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone or Navigate to the Project Directory**:
   ```bash
   cd freshbite
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Building for Production

To create an optimized production build:

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

---

## 🌐 Deploying to Vercel

The project is structured to deploy smoothly to **Vercel** with zero extra configuration required.

### Method 1: Using the Vercel CLI
```bash
npm install -g vercel
vercel
```

### Method 2: Via GitHub / GitLab / Bitbucket
1. Push this directory to your Git repository.
2. Import the repository into your [Vercel Dashboard](https://vercel.com/new).
3. The framework preset will automatically detect **Next.js**.
4. Click **Deploy**. Vercel will build and assign a global production URL.

---

## 📂 Project Architecture

```
freshbite/
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx              # About Us & Kitchen Story
│   │   ├── cart/
│   │   │   └── page.tsx              # Cart view & promo engine
│   │   ├── checkout/
│   │   │   └── page.tsx              # Demo checkout form
│   │   ├── contact/
│   │   │   └── page.tsx              # Contact form & FAQs
│   │   ├── menu/
│   │   │   └── page.tsx              # Menu, search, filters & sort
│   │   ├── order-confirmation/
│   │   │   └── page.tsx              # Order receipt & tracker
│   │   ├── globals.css               # Global styles & brand themes
│   │   ├── layout.tsx                # App layout & SEO metadata
│   │   └── page.tsx                  # Home page
│   ├── components/
│   │   ├── analytics/
│   │   │   └── AnalyticsHUD.tsx      # Real-time event monitor HUD
│   │   ├── layout/
│   │   │   ├── Footer.tsx            # Global site footer
│   │   │   └── Navbar.tsx            # Global sticky navbar & drawer
│   │   ├── menu/
│   │   │   └── ProductCard.tsx       # Interactive product card
│   │   ├── providers/
│   │   │   └── ClientProviders.tsx   # React context & providers wrapper
│   │   └── ui/
│   │       └── ToastContainer.tsx    # Floating alert notifications
│   ├── context/
│   │   └── CartContext.tsx           # Cart state, calculations & storage
│   ├── data/
│   │   └── products.ts               # 16 mock items, categories & coupons
│   ├── lib/
│   │   └── analytics.ts              # Custom analytics tracker & dispatch
│   └── types/
│       └── index.ts                  # TypeScript interface definitions
├── next.config.mjs                   # Remote image optimization rules
├── package.json                      # Dependencies & build scripts
├── tailwind.config.ts                # Tailwind design token extensions
└── tsconfig.json                     # Strict TypeScript config
```

---

## 📄 License & Attribution
FreshBite is an open demonstration food ordering prototype. All food photography is sourced via royalty-free Unsplash photography for mockup purposes.
