import { useState, useEffect } from 'react';
import Card from "../components/Card";
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';
import { useGetTriplistQuery } from '../redux/apis/userApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Triplist = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.reducer);
  const [trips, setTrips] = useState([]);

  //Fetching Wishlist
  if (!user) {
    toast.success("Login Required");
    navigate("/login");
    return;
  }
  console.log("Calling API");
  const { data, isLoading, error } = useGetTriplistQuery(user?._id);
  console.log(data);
  if (error) {
    console.log("error is: ", error);
    toast.error("Something went wrong");
    navigate("/");
  }
  useEffect(() => {
    setTrips(data?.triplist);
    console.log("first trip is: ", trips);
  }, [data]);

  return (
    isLoading ? <Loader /> : (
      <section className="mt-16">
        <div className='w-[90%] mx-auto '>
          <h1 className="text-4xl font-bold text-sky-900">Trip List</h1>
          <div className="flex justify-center items-center gap-[1.75rem] mt-16 flex-wrap">
            {
              trips?.length > 0 ? (
                trips?.map((item, i) => {
                  return <div key={i}>
                    <Card property={item.listing} />
                    <div className='bg-orange-500 text-white px-2 py-1 rounded-lg mt-2'>
                      {new Date(item.startDate).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit"
                      })} - {new Date(item.endDate).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit"
                      })}
                    </div>
                  </div>
                })
              ) : (
                <div>
                  Book Property For Your Next Trip
                </div>
              )
            }
          </div>
        </div>
      </section>
    )
  )
}

export default Triplist;