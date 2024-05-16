import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Search = lazy(() => import("./pages/Search"));
const PropertyDetails = lazy(() => import("./pages/PropertyDetails"));
const Category = lazy(() => import("./pages/Category"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const HostProperty = lazy(() => import("./pages/HostProperty"));
const Propertylist = lazy(() => import("./pages/Propertylist"));
const Reservationlist = lazy(() => import("./pages/Reservationlist"));
const Triplist = lazy(() => import("./pages/Triplist"));
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
          <Route path="/category/:id" element={<Category />} />
          <Route path="/reservations" element={<Reservationlist />} />
          <Route path="/trips" element={<Triplist />} />
          <Route path="/properties" element={<Propertylist />} />
          <Route path="/host-property" element={<HostProperty />} />
          <Route path="/:userID/:propertyId" element={<PropertyDetails />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        <Footer />
      </Suspense>
    </div>
  )
}

export default App;