import Card from "../components/Card";
import Loader from '../components/Loader';
import { useGetAllPropertiesQuery } from '../redux/apis/propertyApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AllProperties = () => {
  const navigate = useNavigate();

  //Fetching Category Properties
  const { data, isLoading, error } = useGetAllPropertiesQuery();
  if (error) {
    console.log("error is: ", error);
    toast.error("Something went wrong");
    navigate("/");
  }
  const properties = data?.properties ? [...data.properties].reverse() : [];

  return (
    isLoading ? <Loader /> : (
      <section className="mt-16">
        <div className='w-[90%] mx-auto '>
          <h1 className="text-4xl font-bold text-sky-900">All Properties</h1>
          <div className="flex justify-start items-start gap-[1.75rem] mt-16 flex-wrap">
            {
              properties?.length > 0 ? (
                properties?.map((property, id) => (
                  <Card key={id} property={property} />
                ))
              ) : (
                <div>
                  No Properties Available
                </div>
              )
            }
          </div>
        </div>
      </section>
    )
  )
}

export default AllProperties;