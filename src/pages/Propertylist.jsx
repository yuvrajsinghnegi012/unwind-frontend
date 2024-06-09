import React from 'react';
import { properties } from "../constant";
import Card from "../components/Card";
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';
import { useGetPropertiesListQuery } from '../redux/apis/userApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Propertylist = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.reducer);

  // Checking user login or not
  if (!user) {
    toast.success("Login Required");
    navigate("/login");
    return;
  }

  //Fetching Properties
  const { data, isLoading, error } = useGetPropertiesListQuery(user?._id);
  if (error) {
    console.log("error is: ", error);
    toast.error("Something went wrong");
    navigate("/");
  }
  const properties = data?.properties;

  return (
    isLoading ? <Loader /> : (
      <section className="mt-16">
        <div className='w-[90%] mx-auto '>
          <h1 className="text-4xl font-bold text-sky-900">Property List</h1>
          <div className="flex justify-center items-center gap-[1.75rem] mt-16 flex-wrap">
            {
              properties?.length > 0 ? (
                properties?.map((property, id) => (
                  <Card key={id} property={property} />
                ))
              ) : (
                <div>
                  Add Properties to Wishlist
                </div>
              )
            }
          </div>
        </div>
      </section>
    )
  )
}

export default Propertylist;