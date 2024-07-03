import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Search = lazy(() => import("./pages/Search"));
const PropertyDetails = lazy(() => import("./pages/PropertyDetails"));
const Category = lazy(() => import("./pages/Category"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const HostProperty = lazy(() => import("./pages/HostProperty"));
const AllProperties = lazy(() => import("./pages/AllProperties"));
const Propertylist = lazy(() => import("./pages/Propertylist"));
const Triplist = lazy(() => import("./pages/Triplist"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Loader = lazy(() => import("./components/Loader"));

function App() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/trips" element={<Triplist />} />
          <Route path="/property-list" element={<Propertylist />} />
          <Route path="/properties" element={<AllProperties />} />
          <Route path="/host-property" element={<HostProperty />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/:userID/:propertyId" element={<PropertyDetails />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        <Footer />
      </Suspense>
    </div>
  )
}

export default App;