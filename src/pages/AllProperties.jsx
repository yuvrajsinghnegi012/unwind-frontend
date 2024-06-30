import { useState } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Card from "../components/Card";
import Loader from '../components/Loader';
import { useGetSearchPropertiesQuery } from '../redux/apis/propertyApi';
import { categories } from "../constant";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

const AllProperties = () => {
  const navigate = useNavigate();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [sort, setSort] = useState("asc");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const { data, isLoading, error } = useGetSearchPropertiesQuery({ search: search.trim(), sort, category });
  if (error) {
    console.log("error is: ", error);
    toast.error("Something went wrong");
    navigate("/");
  }
  const properties = data?.properties || [];

  return (
    isLoading ? <Loader /> : (
      <section className="mt-16">
        <div className='w-[90%] mx-auto '>
          <h1 className="text-4xl font-bold text-sky-900">All Properties</h1>
          <div className="flex justify-between items-center mt-8">
            <div className="flex text-center gap-[2rem] items-center">
              {/* Category */}
              <select
                name='category'
                value={sort}
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none border-slate-300 border-2 px-1 py-1 rounded-sm">
                {
                  categories.map((item, i) => (
                    <option key={i} value={item.label}>{item.label}</option>
                  ))
                }
              </select >
              {/* SORT */}
              <select name='sort' value={sort} onChange={(e) => setSort(e.target.value)} className="outline-none border-slate-300 border-2 px-2 py-1 rounded-sm">
                <option value="asc">Low To High &uarr;</option>
                <option value="dsc">High To Low &darr;</option>
              </select >
              {/* SLIDER -- have to make for price filteration*/}
            </div>
            {/* SEARCH */}
            <div className="w-[18rem]">
              <input
                type="text"
                name="search"
                id="query"
                placeholder="Search by name, location, etc"
                className="w-full outline-none border-slate-300 border-2 px-4 py-[.35rem] rounded-sm"
                onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
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