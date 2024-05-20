import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import img1 from "../../assets/Listing1/1.jpg";
import img2 from "../../assets/Listing1/2.jpg";
import img3 from "../../assets/Listing1/3.jpeg";
import img4 from "../../assets/Listing1/4.jpg";
import img5 from "../../assets/Listing1/5.jpg";
import img6 from "../../assets/Listing1/6.jpg";
import img7 from "../../assets/Listing1/7.jpg";
import img8 from "../../assets/Listing1/8.jpg";
import userImg from "../../assets/phucmai.png";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { FaHeart, FaRegHeart, facilities } from '../constant';
import { cn } from "../libs/utils";

const property = {
  name: "Cheerful 3 Bedroom Cottage with Fire Place",
  price: 1080,
  location: "Milford, Connecticut, United States",
  images: [img1, img2, img3, img4, img5, img6, img7, img8],
  guests: 3,
  bedroom: 2,
  bed: 2,
  bath: 1,
  host: {
    name: "Phuc Mai",
    profilePicture: userImg,
  },
  desc: "Located at the end of a gravel Lane, amongst tree, making it the perfect gateway. The expansive patio and beachfront yard offer infinity views of your private beach. Bait a crab pot to catch your own dinner or enjoy a meal from one of the local restaurants. A spacious modern apen living space with amazing views greets you upon arrival. The space opens onto your private deck with an outdoor seating area. Take your pick of two private bedrooms with access to outdoor balcony spaces and amazing water views. Bathrooms are well appointed with all the comforts of home.",
  highlight: "Recharge your battery and reset your mind by staying at our waterfront paradise.",
  highlightDesc: "Spend time with your trive while relaxing in this beautiful, well-appointed home featuring stunning wide water views of the Chesapeake Bay.",
  facilities: [1, 2, 3, 5, 8, 22, 24, 25, 27],
}

const PropertyDetails = () => {
  const navigate = useNavigate();
  const { userId, propertyId } = useParams();
  const [totalCost, setTotalCost] = useState(0);
  const [nights, setNights] = useState(0);
  const [date, setDate] = useState({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  // Property Order
  const propertyOrder = {
    date,
    userId,
    propertyId,
    price: totalCost,
  }
  
  const checkoutHandler = () =>{
    navigate("/checkout");
  }
  
  useEffect(() => {
    setTotalCost(property.price * nights)
  }, [nights])
  
  useEffect(() => {
    // No date selected
    if (!date?.to && !date?.from) {
      setNights(0);
      return;
    }
    // Any one selected
    if (!date?.to && date?.from) {
      date.to = date.from;
    }
    if (date?.to && !date?.from) {
      date.from = date.to;
    }
    
    setNights(Math.round((date.to - date.from) / (24 * 60 * 60 * 1000)) + 1);
    setTimeout(() => {
      console.log(date);
      console.log("from: ", date.from);
      console.log("to: ", date.to);
    }, 1000)
  }, [date]);
  
  const inWishlist = false;
  
  return (
    <section className="mt-8">
      <div className='w-[82%] mx-auto flex flex-col items-start gap-4'>
        <div className='flex justify-between items-center w-full'>
          <h1 className="text-4xl font-bold text-sky-900">{property.name}</h1>
          <div className='flex gap-2 items-center'>
            {
              inWishlist ? <FaRegHeart className='cursor-pointer' /> : <FaHeart className='cursor-pointer' />
            }
            <p className='font-semibold'>Save</p>
          </div>
        </div>
        {/* Property Images */}
        <div className="flex justify-start items-center gap-2 flex-wrap">
          {
            property.images.map((image, i) => (
              <div key={i} className='h-48 w-72'>
                <img src={image} alt="site image" className='h-full w-full' />
              </div>
            ))
          }
        </div>

        <h3 className='text-lg font-bold'>An entire place in {property.location}</h3>
        <p>{property.guests} guests - {property.bedroom} bedroom - {property.bed} bed - {property.bath}</p>

        <div className='h-[1px] w-full bg-slate-500' />

        {/* Host Details */}
        <div className='flex items-center gap-4'>
          <img src={property.host.profilePicture} alt="host" className='h-16 rounded-full' />
          <p className='text-[1.11rem] font-semibold'>Hosted by {property.host.profilePicture}</p>
        </div>

        <div className='h-[1px] w-full bg-slate-500' />

        {/* Description */}
        <h3 className='text-lg font-semibold'>Description</h3>
        <p>{property.desc}</p>

        <div className='h-[1px] w-full bg-slate-500' />

        {/* Highlight */}
        <h3 className='text-lg font-semibold'>{property.highlight}</h3>
        <p>{property.highlightDesc}</p>

        <div className='h-[1px] w-full bg-slate-500' />

        {/* What this place offers (falicities)  - Calender*/}
        <div className='flex justify-between w-full'>
          <div className=''>
            <h3 className='text-lg font-semibold mb-6'>What this place offers</h3>
            <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
              {
                facilities.filter((item) => property.facilities.includes(item.id)).map((item, i) => (
                  <div key={i} className='flex items-center gap-1'>
                    <item.icon className='text-3xl' />
                    <p>{item.name}</p>
                  </div>
                ))
              }
            </div>
          </div>
          {/* CALENDAR */}
          <div>
            <h3 className='text-lg font-semibold mb-2 w-fit'>How long do yo want to stay</h3>
            <div className=''>
              <div className={cn("grid gap-2")}>
                <Popover className="flex">
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={1}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="mt-3 flex flex-col justify-center gap-1">
              <p className="text-2xl font-bold">₹{property.price} x{nights} nights</p>
              <p className="text-2xl font-bold">Total Price: ₹{property.price * nights}</p>
              <p>Start Date: {date?.from ? format(date.from, "dd-MMMM-y") : "-"}</p>
              <p>Start Date: {date?.to ? format(date.to, "dd-MMMM-y") : "-"}</p>
              <button className="mt-3 text-white px-5 py-2 bg-orange-500 hover:bg-orange-600 duration-300 transition-all rounded-lg"
              onClick={checkoutHandler}
              >Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PropertyDetails;