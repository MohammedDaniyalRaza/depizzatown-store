# DePizzaTown Store 🍕

A premium, modern pizza store web app for Pakistan, built with Next.js. Enjoy a beautiful shopping experience, local checkout, and smooth order management.

---

## 🚀 Project Overview
DePizzaTown Store is a customer-facing pizza ordering platform with a focus on:
- Premium, responsive UI/UX
- Localized checkout (Cash on Delivery, Pakistan phone/city)
- Clerk authentication
- Order tracking and wishlist
- Scalable, clean codebase

---

## ✨ Key Features
- **Product Browsing:** Explore pizzas and collections, fetched from an admin panel
- **Cart:** Add, remove, and update items with a premium animated UI
- **Checkout:**
  - Cash on Delivery (COD) only
  - Phone number: +92, 10 digits starting with 3 (Pakistan)
  - Country: Static (Pakistan)
  - City: Dropdown (Karachi, ready for more)
  - Name/email pre-filled from Clerk, editable
  - All fields validated, clear error messages
- **Authentication:** Clerk integration for secure login/signup
- **Order Tracking:** View order history with a beautiful, animated orders page
- **Wishlist:** Save products for later
- **Premium UI:** Black, white, and red theme, soft shadows, smooth transitions, fully responsive

---

## 🛠️ Tech Stack
- **Frontend:** Next.js (App Router, React)
- **Auth:** Clerk
- **State Management:** Zustand
- **Database:** MongoDB (Mongoose)
- **Styling:** Tailwind CSS

---

## 🗄️ Database Structure
- **DePizzaTown_Admin:**
  - Products, collections, orders, customers (managed by admin panel)
- **DePizzaTown_Store:**
  - Orders, users (storefront)
- Products/collections are managed in admin DB and reflected in store
- Orders/users are stored in store DB; admin panel fetches them for management

---

## 🏃‍♂️ Running Locally
1. Clone the repo:
   ```bash
   git clone <your-repo-url>
   cd depizzatown-store
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables for MongoDB and Clerk (see `.env.example` if available)
4. Run the development server:
```bash
npm run dev
```
5. Visit [http://localhost:3000](http://localhost:3000)

---

## 🔮 Future Plans
- Add more cities/branches (expand city dropdown)
- Add online payment methods (Stripe, etc.)
- Admin dashboard for order management
- More product categories and offers

---

## 👤 Credits
- **Author:** [Your Name]
- **Design & Code:** DePizzaTown Team

---

Enjoy your premium pizza shopping experience! 🍕
