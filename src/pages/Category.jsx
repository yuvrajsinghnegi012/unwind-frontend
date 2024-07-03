import Card from "../components/Card";
import Loader from '../components/Loader';
import { useGetCategoryPropertiesQuery } from '../redux/apis/propertyApi';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const Category = () => {
const navigate = useNavigate();
const { category } = useParams();

  //Fetching Category Properties
  const { data, isLoading, error } = useGetCategoryPropertiesQuery(category.toLowerCase());
  if (error) {
    console.log("error is: ", error);
    toast.error("Something went wrong");
    navigate("/");
  }
  let properties = data?.properties || [];
  properties = [...properties].reverse();

  return (
    isLoading ? <Loader /> : (
      <section className="mt-16">
        <div className='w-[90%] mx-auto text-[.92rem] md:text-base'>
          <h1 className="text-[1.65rem] sm:text-3xl md:text-4xl font-bold text-sky-900">Category Properties</h1>
          <div className="flex justify-center items-start gap-[1.75rem] mt-16 flex-wrap">
            {
              properties?.length > 0 ? (
                properties?.map((item, i) => {
                  return <div key={i}>
                    <Card property={item} />
                  </div>
                })
              ) : (
                <div>
                  No Properties In This Category
                </div>
              )
            }
          </div>
        </div>
      </section>
    )
  )
}

export default Category;