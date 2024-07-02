import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Card from "../components/Card";
import Loader from '../components/Loader';
import { useGetSearchPropertiesQuery } from '../redux/apis/propertyApi';
import { categories } from "../constant";
import 'rc-slider/assets/index.css';
import RangeSlider from "../components/RangeSlider";

const AllProperties = () => {
  const min = 0;
  const max = 100000000;
  const navigate = useNavigate();
  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);
  const [sort, setSort] = useState("asc");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const updateValues = (minValue, maxValue) => {
    setMinPrice(minValue);
    setMaxPrice(maxValue);
  }

  const { data, isLoading, error } = useGetSearchPropertiesQuery({ search: search.trim(), sort, category, minPrice, maxPrice });
  if (error) {
    console.log("error is: ", error);
    toast.error("Something went wrong");
    navigate("/");
  }
  const properties = data?.properties || [];

  return (
    isLoading ? <Loader /> : (
      <section className="mt-16">
        <div className='w-[90%] mx-auto text-sm md:text-[.94rem]'>
          <h1 className="text-[1.65rem] sm:text-3xl md:text-4xl font-bold text-sky-900">All Properties</h1>
          {/* Filters */}
          <div className="flex justify-between items-center mt-8 flex-wrap text-sm">
            <div className="flex text-center gap-2 md:gap-[2rem] justify-center">
              {/* Category */}
              <select
                name='category'
                value={category}
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
              <div className="flex justify-center items-start pt-1">
                <RangeSlider
                  min={min}
                  max={max}
                  handler={updateValues}
                />
              </div>
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
          {/* Displaying Properties */}
          <div className="flex justify-center items-start gap-[1.75rem] mt-4 md:mt-16 flex-wrap">
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