import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { FaHeart, FaRegHeart, facilities } from '../constant';
import { cn } from "../libs/utils";
import { useNewBookingMutation } from "../redux/apis/bookingApi";
import { useGetSinglePropertyQuery } from "../redux/apis/propertyApi";
import { useToggleWishlistPropertyMutation } from "../redux/apis/userApi";
import { setUser } from "../redux/slices/user";

const PropertyDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { propertyId } = useParams();

  const [bookingErrorMessage, setBookingErrorMessage] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [nights, setNights] = useState(0);
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 5),
  });
  const { user } = useSelector((state) => state.user);

  // Toggle Wishlist and New Booking
  const [toggleWishlist] = useToggleWishlistPropertyMutation();
  const [newBooking, { isLoading: isBookingLoading, error: bookingError }] = useNewBookingMutation();

  //Fetching Property
  const { data, isLoading: isPropertyLoading, error: propertyError } = useGetSinglePropertyQuery(propertyId);
  if (propertyError) {
    toast.error("Something went wrong");
    navigate("/");
  }
  const property = data?.property;

  const propertyOrder = {
    date,
    userId: user?._id,
    hostId: property?.host._id,
    propertyId,
    total: totalCost,
  }

  const bookingHandler = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You need to login first");
      return;
    }

    const { data } = await newBooking(propertyOrder);

    // If error occured
    if (bookingError) {
      setBookingErrorMessage(bookingError.data.message);
      return;
    }
    else {
      const updatedUser = data?.updatedUser;
      dispatch(setUser(updatedUser));
      toast.success("Booking successful");
      navigate("/trips");
    }
  }

  const wishlistHandler = async () => {
    if (!user) {
      toast.error("You need to login first");
      return;
    }
    // Add Wishlist Functionality
    const { data, error } = await toggleWishlist({ userId: user._id, propertyId });
    if (error) {
      toast.error("Something went wrong");
      navigate("/");
      return;
    }

    // Saving the Updated user in the redux
    dispatch(setUser(data?.updatedUser));
  }

  useEffect(() => {
    setTotalCost(property?.price * nights)
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
  }, [date]);

  const inWishlist = user?.wishList?.includes(property?._id);

  return (
    isPropertyLoading ? (<Loader />) : (
      <section className="mt-8 text-sm md:text-[.94rem]">
        <div className='w-[82%] mx-auto flex flex-col items-start gap-4'>
          <div className='flex justify-between items-center w-full'>
            <h1 className="text-[1.65rem] sm:text-3xl md:text-4xl font-bold text-sky-900">{property.name}</h1>
            <div className='flex gap-2 items-center'>
              {
                inWishlist ? <FaRegHeart className='cursor-pointer transition-all duration-300' onClick={wishlistHandler} /> : <FaHeart className='cursor-pointer transition-all duration-300' onClick={wishlistHandler} />
              }
              <p className='font-semibold'>Save</p>
            </div>
          </div>
          {/* Property Images */}
          <div className="flex justify-center items-center gap-2 flex-wrap">
            {
              property.images.map((image, i) => (
                <div key={i} className='h-44 w-68'>
                  <img src={image} alt="site image" className='h-full w-full object-cover' />
                </div>
              ))
            }
          </div>

          <h3 className='text-lg font-bold'>An entire place in {property.location}</h3>
          <p>{property.guests} guests - {property.bedrooms} bedroom - {property.beds} bed - {property.baths} bathrooms</p>

          <div className='h-[1px] w-full bg-slate-500' />

          {/* Host Details */}
          <div className='flex items-center gap-4'>
            <img src={property.host.profilePicture} alt="host" className='h-16 rounded-full' />
            <p className='text-[1.11rem] font-semibold'>Hosted by {property.host.name}</p>
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
          <div className='flex flex-col md:flex-row gap-6 md:gap-0 justify-between w-full'>
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
                <p className="text-lg sm:text-xl md:text-2xl font-bold">₹{property.price} x{nights} nights</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold">Total Price: ₹{property.price * nights}</p>
                <p>Start Date: {date?.from ? format(date.from, "dd-MMMM-y") : "-"}</p>
                <p>Start Date: {date?.to ? format(date.to, "dd-MMMM-y") : "-"}</p>
                <button className='text-white w-full rounded-lg text-center bg-orange-500 py-2 mt-3 px-4' disabled={isBookingLoading} onClick={bookingHandler}>
                  {
                    isBookingLoading ? 'Loading...' : `Booking`
                  }
                  {/* Sign Up */}
                </button>
                {
                  bookingError && (
                    <p className='text-red-600 text-sm -mt-2'>{bookingErrorMessage || `Something went wrong`}</p>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    )

  )
}

export default PropertyDetails;