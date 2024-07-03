import { useGetAllPropertiesQuery } from "../redux/apis/propertyApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { categories } from "../constant";
import { bannerImages } from "../constant";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft
} from "../constant";

const Home = () => {
  const navigate = useNavigate();
  const [bannerImageIndex, setBannerImageIndex] = useState(0);
  // Updating banner images index
  const prevImage = () => {
    (bannerImageIndex === 0) ? setBannerImageIndex(bannerImages.length - 1) : setBannerImageIndex(bannerImageIndex - 1);
  }
  const nextImage = () => {
    (bannerImageIndex === (bannerImages.length - 1)) ? setBannerImageIndex(0) : setBannerImageIndex(bannerImageIndex + 1);
  }

  //Fetching Category Properties
  const { data, isLoading, error } = useGetAllPropertiesQuery();
  if (error) {
    console.log("error is: ", error);
    toast.error("Something went wrong");
  }
  let properties = data?.properties || [];
  properties = [...properties].reverse().slice(0, 8);

  return (
    <div>
      {/* HERO SECTION */}
      <section className={`relative min-h-screen bg-cover bg-center `} style={{ backgroundImage: `url(${bannerImages[bannerImageIndex]})` }} loading="lazy">
        <div className="absolute left-1 top-[50%] translate-y-[-50%] cursor-pointer px-1 py-6 bg-gray-100 hover:bg-gray-300 z-10 " onClick={prevImage}><MdKeyboardArrowLeft className="inline-block" /></div>
        <div className="absolute right-1 top-[50%] translate-y-[-50%] cursor-pointer px-1 py-6 bg-gray-100 hover:bg-gray-300 z-10 " onClick={nextImage}><MdKeyboardArrowRight className="inline-block" /></div>
        <div className="absolute left-[50%] bottom-4 translate-x-[-50%] flex gap-1 justify-center p-2 z-10">
          {
            [...Array(bannerImages.length)].map((_, i) => (
              <div key={i} className={`h-3 w-3 rounded-full cursor-pointer ${i === bannerImageIndex ? "bg-white " : "bg-gray-400 "} transition-all duration-100`} onClick={() => { setBannerImageIndex(i) }} />
            ))
          }
        </div>
        <div className="container mx-auto flex items-center justify-center h-full">
          <h1 className="text-[1.5rem] sm:text-[1.9rem] md:text-[2.2rem] lg:text-[2.4rem] font-bold mt-4 text-white text-center">
            Welcome Home! Anywhere you roam<br />
            Stay in the moment. Make your memories.
          </h1>
        </div>
      </section>

      {/* TOP CATEGORIES */}
      <section className="flex flex-col justify-center mt-16 md:mt-24 gap-4 md:gap-8 items-center w-[80%] mx-auto">
        <h1 className="text-[1.65rem] sm:text-3xl md:text-4xl font-bold text-sky-900">Explore Top Categories</h1>
        <p className="text-lg text-center px-4 px-[3%]md:px-[10%] lg:px-[20%] font-medium">Explore our wide range of vacation rentals that cater to all types of travelers. Immerse yourself in the local culture, enjoy the comforts of home, and create unforgettable memories in your dream destination.<br /></p>
        <div className="flex justify-center items-center flex-wrap gap-4">
          {categories.map((item, id) => (
            (id !== 0 && id < 8) && (
              <div
                key={id}
                className="relative w-[12rem] h-[12rem] flex justify-center items-center cursor-pointer group overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105"
                onClick={() => navigate(`category/${item.label}`)}
              >
                <img src={item.img} alt={item.label} className="w-full h-full transition-transform duration-500 transform group-hover:scale-125" />
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-70" />
                <div className="absolute flex flex-col items-center justify-center text-center transition-all duration-500 group-hover:scale-110 group-hover:text-yellow-400">
                  <item.icon className="text-5xl text-white transition-transform duration-500 transform group-hover:scale-125 group-hover:rotate-6" />
                  <p className="text-lg text-white transition-all duration-500 group-hover:text-yellow-400">{item.label}</p>
                </div>
              </div>
            )
          ))}
        </div>
      </section>

      {/* ALL CATEGORIES */}
      <section className="flex flex-col justify-center mt-16 gap-4 md:gap-8 w-[80%] mx-auto">
        <h1 className="text-[1.65rem] sm:text-3xl md:text-4xl font-bold text-sky-900">All Categories</h1>
        <div className="flex justify-center items-center flex-wrap">
          {categories.map((item, id) => (
            <div
              key={id}
              className="w-36 h-32 flex flex-col items-center justify-center md:p-3 cursor-pointer transition-transform transform hover:scale-110 hover:rotate-2 group"
              onClick={() => navigate(`category/${item.label}`)}
            >
              <div className="transition-transform transform group-hover:scale-125 group-hover:rotate-3">
                <item.icon className="text-3xl text-gray-400 transition-colors group-hover:text-sky-500" />
              </div>
              <p className="text-lg text-gray-400 tracking-tight transition-colors group-hover:text-sky-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROPERTIES */}
      <section className="mt-16 w-[90%] mx-auto">
        <h1 className="text-4xl font-bold text-sky-900 mb-12">Latest Properties</h1>
        <div className="flex justify-center items-start gap-[1.75rem] flex-wrap">
          {properties?.map((property, id) => (
            <Card key={id} property={property} />
          ))}
        </div>
        <Link to={"/properties"} className="text-center md:text-right mt-2 text-orange-600 w-full inline-block font-medium transition-all hover:text-orange-800">
          View More <span className="font-bold text-[1.2rem]">&rarr;</span>
        </Link>
      </section>
    </div>
  )
}

export default Home;