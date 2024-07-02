import Card from "../components/Card";
import Loader from '../components/Loader';
import { useGetSearchPropertiesQuery } from "../redux/apis/propertyApi";
import toast from 'react-hot-toast';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const [ searchParams ] = useSearchParams();

  const search = searchParams.get("search");

  //Fetching Properties
  const { data, isLoading, error } = useGetSearchPropertiesQuery({search: search.trim()});
  if (error) {
    console.log("error is: ", error);
    toast.error("Something went wrong");
    navigate("/");
  }
  const properties = data?.properties || [];

  return (
    isLoading ? <Loader /> : (
      <section className="mt-16">
        <div className='w-[90%] mx-auto text-[.92rem] md:text-base'>
          <h1 className="text-[1.65rem] sm:text-3xl md:text-4xl font-bold text-sky-900">Search Results</h1>
          <div className="flex justify-center items-start gap-[1.75rem] mt-16 flex-wrap">
            {
              properties?.length > 0 ? (
                properties?.map((property, id) => (
                  <Card key={id} property={property} />
                ))
              ) : (
                <div>
                  No Results
                </div>
              )
            }
          </div>
        </div>
      </section>
    )
  )
}

export default Search