import { useGetAllPropertiesQuery } from "@/redux/apis/propertyApi";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/Card";
import { categories } from "../constant";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.reducer);

  //Fetching Category Properties
  const { data, isLoading, error } = useGetAllPropertiesQuery();
  if (error) {
    console.log("error is: ", error);
    toast.error("Something went wrong");
  }
  let properties = data?.properties || [];
  properties = [...properties].reverse().slice(0, 10);

  return (
    <div>
      {/* HERO SECTION */}
      <section className={`relative bg-[url("../assets/home.jpg")] min-h-[85vh] bg-center bg-no-repeat bg-cover max-w-[screen]`}>
        <div className="absolute inset-0 bg-black bg-opacity-45 mix-blend-overlay" />
        < h1 className="text-4xl font-bold text-white text-center pt-16" >Welcome Home! Anywhere you roam < br /> Stay in the moment.Make make your memories</h1 >
      </section>

      {/* TOP CATEGORIES */}
      <section className="flex flex-col justify-center mt-24 gap-8 items-center w-[80%] mx-auto">
        <h1 className="text-4xl font-bold text-sky-900">Explore Top Categories</h1>
        <p className="text-lg text-center px-[16rem] font-medium ">Explore our wide range of vacations rentals that cater to all types of travelers. Immerse yourself in the local culture, enjoy the comforts of home, and create unforgettable memories in your dream destination.<br /></p>
        <div className="flex justify-center items-center flex-wrap gap-4">
          {
            categories.map((item, id) => (
              (id != 0 && id < 8) &&
              <div key={id} className="relative w-[12rem] h-[12rem] flex justify-center items-center cursor-pointer" onClick={() => navigate(`category/${item.label}`)}>
                <img src={item.img} alt={item.label} className="w-full h-full" />
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-50" />
                <div className="absolute flex flex-col items-center justify-center">
                  <item.icon className="text-5xl text-white" />
                  <p className="text-lg text-white">{item.label}</p>
                </div>
              </div>
            ))
          }
        </div>
      </section>

      {/* ALL CATEGORIES */}
      <section className="flex flex-col justify-center mt-16 gap-8 w-[90%] mx-auto">
        <h1 className="text-4xl font-bold text-sky-900">All Categories</h1>
        <div className="flex justify-center items-center flex-wrap">
          {
            categories.map((item, id) => (
              <div key={id} className="w-36 h-32 flex flex-col items-center justify-center p-3 cursor-pointer" onClick={() => navigate(`category/${item.label}`)}>
                <item.icon className="text-3xl text-gray-400" />
                <p className="text-lg text-gray-400 tracking-tight">{item.label}</p>
              </div>
            ))
          }
        </div>
      </section>

      {/* PROPERTIES */}
      <section className="flex flex-col justify-center mt-16 gap-12 w-[90%] mx-auto">
        <h1 className="text-4xl font-bold text-sky-900">Latest Properties</h1>
        <div className="flex justify-center items-start gap-[1.75rem] flex-wrap">
          {
            properties?.map((property, id) => (
              <Card key={id} property={property} />
            ))
          }
        </div>
      </section>
    </div>
  )
}

export default Home;