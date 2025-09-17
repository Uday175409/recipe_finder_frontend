# Recipe Finder - Frontend

A modern, responsive React application for discovering recipes with professional UI design, multi-currency support, and smart navigation.

## 🎨 Features

### User Interface
- **🎯 Modern Design** - Professional UI with custom color palette and typography
- **📱 Responsive Layout** - Optimized for desktop, tablet, and mobile devices
- **🌈 Attractive Styling** - Smooth gradients, animations, and interactive elements
- **🎨 Custom Components** - Reusable UI components with consistent styling

### Core Functionality
- **🔍 Recipe Search** - Advanced search with filters and sorting
- **🎲 Random Discovery** - Explore new recipes with random suggestions
- **🥗 Ingredient-based Search** - Find recipes using available ingredients
- **📋 Recipe Details** - Complete nutrition, pricing, and cooking instructions
- **📅 Meal Planning** - Personalized meal planning tools
- **🍷 Wine Pairing** - Smart beverage recommendations

### Advanced Features
- **💰 Multi-Currency Support** - 7 currencies with live conversion (INR default for Indian market)
- **🎯 Smart Pricing Context** - Budget-friendly, Moderate, Premium, Luxury categories
- **🧭 Intuitive Navigation** - Custom navbar with mobile-responsive design
- **⚙️ Settings Management** - Currency preferences and user customization

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html              # Main HTML template
│   └── vite.svg               # Vite logo asset
├── src/
│   ├── assets/
│   │   └── react.svg          # React logo asset
│   ├── components/
│   │   ├── Navbar.jsx         # Main navigation component
│   │   ├── CurrencySelector.jsx # Currency switching component
│   │   ├── PriceDisplay.jsx   # Smart price formatting component
│   │   └── RecipeCard.jsx     # Recipe display component
│   ├── pages/
│   │   ├── Home.jsx           # Landing page with hero section
│   │   ├── RecipeSearch.jsx   # Advanced recipe search
│   │   ├── RecipeDetail.jsx   # Detailed recipe view
│   │   ├── RandomRecipes.jsx  # Random recipe discovery
│   │   ├── IngredientSearch.jsx # Search by ingredients
│   │   ├── MealPlanner.jsx    # Meal planning interface
│   │   ├── WinePairing.jsx    # Wine recommendation tool
│   │   └── Settings.jsx       # User preferences
│   ├── services/
│   │   └── recipeApi.js       # API communication layer
│   ├── utils/
│   │   └── currencyUtils.js   # Currency conversion utilities
│   ├── App.jsx                # Main application component
│   ├── App.css               # Component-specific styles
│   ├── index.css             # Global styles and design system
│   └── main.jsx              # Application entry point
├── package.json              # Dependencies and scripts
├── vite.config.js           # Vite configuration
└── eslint.config.js         # ESLint configuration
```

## 🎨 Design System

### Color Palette
```css
:root {
  --primary-color: #FF6B6B;      /* Coral */
  --primary-dark: #FF5252;       /* Darker coral */
  --secondary-color: #4ECDC4;     /* Teal */
  --accent-color: #FFE66D;        /* Yellow */
  --success-color: #4CAF50;       /* Green */
  --warning-color: #FF9800;       /* Orange */
  --error-color: #F44336;         /* Red */
}
```

### Typography
- **Headings**: Playfair Display (elegant serif)
- **Body Text**: Inter (modern sans-serif)
- **Responsive scales**: Fluid typography with viewport units

### Components
- **Cards**: Elevated with shadows and hover effects
- **Buttons**: Multiple variants with smooth transitions
- **Forms**: Clean inputs with focus states
- **Navigation**: Professional navbar with mobile toggle

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- Backend API running on port 5000

### Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 🔧 Configuration

### Environment Variables
Create `.env` file in frontend root:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Recipe Finder
```

### API Configuration
```javascript
// src/services/recipeApi.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
```

## 💰 Currency System

### Supported Currencies
- **USD** - US Dollar
- **INR** - Indian Rupee (default for Indian market)
- **EUR** - Euro
- **GBP** - British Pound
- **CAD** - Canadian Dollar
- **AUD** - Australian Dollar
- **JPY** - Japanese Yen

### Price Context Categories
```javascript
// Based on converted local currency amounts
const PRICE_THRESHOLDS = {
  INR: {
    budget: 50,      // ≤ ₹50 = Budget-friendly
    moderate: 150,   // ₹51-150 = Moderate
    premium: 300,    // ₹151-300 = Premium
    // >₹300 = Luxury
  }
};
```

### Currency Features
- **Live Conversion** - Real-time exchange rates via API
- **Local Storage** - Persistent user currency preference
- **Smart Formatting** - Locale-appropriate number formatting
- **Context Labels** - Budget/Moderate/Premium/Luxury indicators

## 🧭 Navigation Structure

### Main Routes
```jsx
// App.jsx routing structure
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/search" element={<RecipeSearch />} />
  <Route path="/recipe/:id" element={<RecipeDetail />} />
  <Route path="/random" element={<RandomRecipes />} />
  <Route path="/ingredients" element={<IngredientSearch />} />
  <Route path="/meal-planner" element={<MealPlanner />} />
  <Route path="/wine-pairing" element={<WinePairing />} />
  <Route path="/settings" element={<Settings />} />
</Routes>
```

### Navigation Features
- **Active State Indicators** - Highlight current page
- **Mobile-Responsive** - Collapsible hamburger menu
- **Smooth Transitions** - Animated state changes
- **Accessibility** - Keyboard navigation support

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
@media (min-width: 576px) { /* Small devices */ }
@media (min-width: 768px) { /* Medium devices */ }
@media (min-width: 992px) { /* Large devices */ }
@media (min-width: 1200px) { /* Extra large devices */ }
```

### Mobile Features
- **Touch-friendly** - Optimized button sizes and spacing
- **Readable Text** - Appropriate font sizes on small screens
- **Efficient Layouts** - Stackable components
- **Fast Loading** - Optimized images and assets

## 🎯 Key Components

### Navbar Component
```jsx
// Professional navigation with currency selector
<Navbar />
// Features: Mobile toggle, active states, currency dropdown
```

### Recipe Card Component
```jsx
// Attractive recipe display with pricing
<RecipeCard recipe={recipe} />
// Features: Image overlay, price display, dietary badges
```

### Currency Selector
```jsx
// Smart currency switching
<CurrencySelector onCurrencyChange={handleChange} />
// Features: Dropdown with flags, persistent selection
```

### Price Display
```jsx
// Context-aware pricing
<PriceDisplay amount={price} showContext={true} />
// Features: Currency conversion, budget indicators
```

## 🚀 Performance Optimization

### Build Optimizations
- **Vite** - Fast build tool with HMR
- **Code Splitting** - Route-based lazy loading
- **Asset Optimization** - Automatic image and CSS optimization
- **Tree Shaking** - Remove unused code

### Runtime Performance
- **React Best Practices** - Efficient re-rendering
- **API Caching** - Local storage for exchange rates
- **Lazy Loading** - Components load on demand
- **Optimized Images** - WebP format with fallbacks

## 🎨 Customization

### Theming
Modify CSS custom properties in `src/index.css`:
```css
:root {
  --primary-color: #your-color;
  --font-heading: 'Your-Font', serif;
}
```

### Component Styling
Each component uses CSS modules or styled components for isolated styling.

### Adding New Features
1. Create component in `src/components/`
2. Add route in `App.jsx`
3. Update navigation in `Navbar.jsx`
4. Add API service in `src/services/`

## 🐛 Development & Debugging

### Development Tools
- **React DevTools** - Component inspection
- **Vite DevTools** - Build analysis
- **ESLint** - Code quality
- **Browser DevTools** - Network and performance

### Common Issues

#### API Connection
```bash
# Check backend is running
curl http://localhost:5000/api/recipes/test
```

#### Currency Conversion
```bash
# Check console for exchange rate errors
# Verify API keys in backend
```

#### Styling Issues
```bash
# Check CSS custom properties are loaded
# Verify import paths
```

## 📦 Dependencies

### Core Framework
- **react** - UI library
- **react-dom** - DOM rendering
- **react-router-dom** - Client-side routing

### UI & Styling
- **bootstrap** - CSS framework (selective imports)
- **@fortawesome/fontawesome-free** - Icons

### Utilities
- **axios** - HTTP client
- **vite** - Build tool

### Development
- **eslint** - Code linting
- **@vitejs/plugin-react** - React support for Vite

## 🚀 Deployment

### Build Process
```bash
# Create production build
npm run build

# Files generated in dist/
ls dist/
```

### Hosting Options
- **Netlify** - Automatic deploys from Git
- **Vercel** - Optimized for React apps
- **GitHub Pages** - Free static hosting
- **AWS S3 + CloudFront** - Scalable CDN

### Environment Configuration
Set environment variables on your hosting platform:
- `VITE_API_BASE_URL` - Backend API URL
- `VITE_APP_NAME` - Application name

## 🔧 Maintenance

### Regular Updates
- Update dependencies monthly
- Monitor security vulnerabilities
- Test currency conversion accuracy
- Verify API endpoint compatibility

### Performance Monitoring
- Check Core Web Vitals
- Monitor bundle size
- Test on various devices
- Validate accessibility

## 🤝 Contributing

1. Follow React best practices
2. Maintain consistent styling
3. Add proper TypeScript types (future enhancement)
4. Test on multiple screen sizes
5. Document new components

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For frontend issues:
1. Check browser console for errors
2. Verify backend API connectivity
3. Test currency conversion functionality
4. Review responsive design on different devices

---

**Built with ⚛️ React and 💫 modern web technologies**
