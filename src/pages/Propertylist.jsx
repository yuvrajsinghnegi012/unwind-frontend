import React from 'react';
import { properties } from "../constant";
import Card from "../components/Card";

const Propertylist = () => {
  return (
    <section className="mt-16">
      <div className='w-[90%] mx-auto '>
      <h1 className="text-4xl font-bold text-sky-900">Property List</h1>
      <div className="flex justify-center items-center gap-[1.75rem] mt-16 flex-wrap">
          {
            properties.map((property, id) => (
              <Card key={id} property={property} />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Propertylist;