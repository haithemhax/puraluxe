import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { CartDrawer } from './components/layout/CartDrawer'
import { ToastViewport } from './components/ui/Toast'
import { RequireDashboard } from './components/dashboard/RequireDashboard'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'
import DashboardLogin from './pages/dashboard/DashboardLogin'
import DashboardLayout from './pages/dashboard/DashboardLayout'
import DashboardOverview from './pages/dashboard/DashboardOverview'
import DashboardProducts from './pages/dashboard/DashboardProducts'
import DashboardAddProduct from './pages/dashboard/DashboardAddProduct'
import DashboardCategories from './pages/dashboard/DashboardCategories'
import DashboardOrders from './pages/dashboard/DashboardOrders'
import DashboardCustomers from './pages/dashboard/DashboardCustomers'
import DashboardSettings from './pages/dashboard/DashboardSettings'

function AppShell() {
  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/dashboard')

  return (
    <>
      {!isDashboard && <CartDrawer />}
      {!isDashboard && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/dashboard/login" element={<DashboardLogin />} />
        <Route
          path="/dashboard"
          element={
            <RequireDashboard>
              <DashboardLayout />
            </RequireDashboard>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="categories" element={<DashboardCategories />} />
          <Route path="products" element={<DashboardProducts />} />
          <Route path="products/new" element={<DashboardAddProduct />} />
          <Route path="orders" element={<DashboardOrders />} />
          <Route path="customers" element={<DashboardCustomers />} />
          <Route path="settings" element={<DashboardSettings />} />
        </Route>
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!isDashboard && <Footer />}
      <ToastViewport />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
