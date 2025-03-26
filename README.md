# E-commerce_UI

**E-Commerce Product Listing App**

A React Native mobile application for browsing products, managing a wishlist, and adding items to the cart. The app fetches product data from the FakeStore API and provides features like search, filtering, and persistent cart storage.

**Features**

✅ Product listing with images, titles, and prices
✅ Product details page with description and "Add to Cart" button
✅ Persistent cart storage using AsyncStorage
✅ Wishlist functionality to save favorite items
✅ Search & filter products by category and price range
✅ Smooth navigation using React Navigation

**Tech Stack**

-React Native (with Expo)
-React Navigation (for screen transitions)
-AsyncStorage (for cart & wishlist storage)
-Axios (for API requests)

**Installation & Setup**

1. Clone the Repository
   git clone https://github.com/Shantanu5475/E-cmommerve_UI.git
2. Install Dependencies
   npm install
3. Start the App
   npm start
   Scan the QR code using Expo Go on your mobile device or run it in an emulator.
   Or install Expo Go app on you mobile and open this link using Expo Go - "https://expo.dev/preview/update?message=Final&updateRuntimeVersion=1.0.0&createdAt=2025-03-25T10%3A52%3A48.123Z&slug=exp&projectId=642a941b-08ac-407d-895b-e1c4ced2ea82&group=94c1f774-23ea-4e42-8a56-704fded11184"

**API Usage**
The app fetches product data from the FakeStore API:

Endpoint: https://fakestoreapi.com/products

Returns a list of products with details such as title, image, category, description, and price.
