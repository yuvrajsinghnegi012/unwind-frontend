import UploadImageCard from '../components/UploadImageCard';
import { useCallback, useEffect, useState } from 'react';
import { FiMinusCircle, MdAddCircleOutline, categories, facilities, IoIosImages } from "../constant";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNewPropertyMutation } from '../redux/apis/propertyApi';
import { setUser } from '../redux/slices/user';

const HostProperty = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [category, setCategory] = useState(null);
  const [placeFacilities, setPlaceFacilities] = useState([]);
  const [images, setImages] = useState([]); /// will be sent to the backend in array
  const [photos, setPhotos] = useState([]); // will be in the form of objects
  const [propertyLocation, setPropertyLocation] = useState({
    apartmentId: "",
    street: "",
    city: "",
    province: "",
    country: "",
  });
  const [propertyDetails, setPropertyDetails] = useState({
    name: "",
    desc: "",
    highlight: "",
    highlightDesc: "",
    price: "",
  });
  const [basicCount, setBasicCount] = useState({
    guests: 1,
    bedrooms: 1,
    beds: 1,
    baths: 1,
  })
  const [newProperty, { isLoading, error }] = useNewPropertyMutation();

  // HANDLERS
  const propertyLocationChangeHandler = (e) => {
    setPropertyLocation((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const propertyLocationSubmitHandler = (e) => {
    e.preventDefault();
    console.log("Property Location is: ", propertyLocation);
  }
  const propertyDetailsChangeHandler = (e) => {
    setPropertyDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const propertyDetailsSubmitHandler = (e) => {
    e.preventDefault();
    console.log("Property Details are: ", propertyDetails);
  }
  const decreaseCount = (item) => {
    const cat = item.toLowerCase();
    if (basicCount[cat] < 2) return;
    setBasicCount((prev) => ({
      ...prev,
      [cat]: basicCount[cat] - 1,
    }));
  }
  const increaseCount = (item) => {
    const cat = item.toLowerCase();
    if (basicCount[cat] > 9) return;
    setBasicCount((prev) => ({
      ...prev,
      [cat]: basicCount[cat] + 1,
    }));
  }
  const toggleFacility = (id) => {
    const alreadyAdded = placeFacilities.includes(id);
    if (alreadyAdded) {
      //Remove Property
      const restFacilities = placeFacilities.filter((facilityId) => id != facilityId);
      setPlaceFacilities(restFacilities);
      return;
    }
    // Not Exist -- Add Facility
    setPlaceFacilities((prev) => ([...prev, id]));
  }
  const handleUploadPhotos = (e) => {
    const newPhotos = Array.from(e.target.files);
    setPhotos((prev) => ([
      ...prev,
      ...newPhotos.map((newPhoto, i) => (
        {
          id: photos.length + i + 1,
          img: newPhoto,
        }
      ))
    ]));
  }
  const removePhotoHandler = (idToRemove) => {
    setPhotos((prev) => prev.filter((photo) => photo.id != idToRemove));
  }
  const moveImage = useCallback((dragIndex, hoverIndex) => {
    setImages((prevCards) => {
      const clonedCards = [...prevCards];
      const removedItem = clonedCards.splice(dragIndex, 1)[0];
      clonedCards.splice(hoverIndex, 0, removedItem);
      return clonedCards;
    });
  }, []);
  const createListingHandler = async () => {
    // No user logged in
    if (!user) {
      toast.error("Login Required");
      navigate("/login");
      return;
    }
    // Making Final Form Data
    const newFormData = new FormData();
    newFormData.append("category", category.toLowerCase());
    const loc = Object.values(propertyLocation).join(", ");
    newFormData.append("location", loc);
    for (const key in basicCount) {
      newFormData.append(key, basicCount[key]);
    }
    for (const facility of placeFacilities) {
      newFormData.append("facilities", facility);
    }
    for (const key in propertyDetails) {
      newFormData.append(key, propertyDetails[key]);
    }
    for (const image of images) {
      newFormData.append("images", image);
    }

    const { data } = await newProperty({ formData: newFormData, userId: user?._id });
    if (error) {
      console.log("error is: ", error);
      return;
    }
    else {
      if (!data?.success){
        toast.error(data?.message || "Something went wrong");
      }
      else {
        dispatch(setUser(data?.updatedUser));
        toast.success("Property Created");
        navigate("/properties");
      }
    }
  }

  useEffect(() => {
    setImages(() => photos?.map((photo) => photo.img));
  }, [photos]);

  return (
    <section className="mt-8">
      <div className='w-[82%] mx-auto flex flex-col items-start gap-4 text-[.92rem] md:text-base'>
        <div className='flex justify-between items-center w-full'>
          <h1 className="text-[1.65rem] sm:text-3xl md:text-4xl font-bold text-sky-900">Host Property</h1>
        </div>

        {/* Property Category */}
        <div className="mt-12 w-[100%]">
          <h2 className='text-xl font-bold text-orange-500'>Step 1: Tell us about your place</h2>
          <div className='mt-2 h-[2px] w-full bg-slate-500' />

          <div className='mt-8 flex flex-col flex-wrap gap-8'>
            {/* Category */}
            <div>
              <p className='mb-6 font-semibold'>Which of these categories best describes your place?</p>
              <div className='flex justify-center items-center flex-wrap gap-4'>
                {
                  categories.map((item, i) => (
                    <div key={i} className={`rounded-xl border-2 p-1 w-[6.5rem] h-[6.5rem] ${category === item.label ? "border-orange-600" : "border-slate-400"} flex flex-col justify-center items-center gap-3 cursor-pointer`} onClick={() => setCategory(item.label)}>
                      <item.icon className="text-2xl" />
                      <p className='font-semibold text-center'>{item.label}</p>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Form */}
            <div>
              <p className='font-semibold '>Where's your place located</p>
              <form onSubmit={propertyLocationSubmitHandler} className='max-w-[35rem] mt-2'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="street" className='text-gray-700 font-medium'>Street Address</label>
                  <input
                    type="text"
                    name='street'
                    id='street'
                    value={propertyLocation.street}
                    placeholder='Lakkha Bagh Road'
                    onChange={propertyLocationChangeHandler}
                    className='outline-none border-2 border-slate-500 px-3 py-2 rounded-lg w-full'
                  />
                </div>
                <div className='mt-4 grid grid-cols-2 gap-x-6 gap-y-4'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="apartmentId" className='text-gray-700 font-medium'>Apartemnt, Suite, etc. (if applicable)</label>
                    <input
                      type="text"
                      name='apartmentId'
                      id='apartmentId'
                      value={propertyLocation.apartmentId}
                      placeholder='apartmentId'
                      onChange={propertyLocationChangeHandler}
                      className='outline-none border-2 border-slate-500 px-3 py-2 rounded-lg w-full'
                    />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="city" className='text-gray-700 font-medium'>City</label>
                    <input
                      type="text"
                      name='city'
                      id='city'
                      value={propertyLocation.city}
                      placeholder='Kotdwar'
                      onChange={propertyLocationChangeHandler}
                      className='outline-none border-2 border-slate-500 px-3 py-2 rounded-lg w-full'
                    />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="province" className='text-gray-700 font-medium'>Province</label>
                    <input
                      type="text"
                      name='province'
                      id='province'
                      value={propertyLocation.province}
                      placeholder='Uttarakhand'
                      onChange={propertyLocationChangeHandler}
                      className='outline-none border-2 border-slate-500 px-3 py-2 rounded-lg w-full'
                    />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="country" className='text-gray-700 font-medium'>Country</label>
                    <input
                      type="text"
                      name='country'
                      id='country'
                      value={propertyLocation.country}
                      placeholder='India'
                      onChange={propertyLocationChangeHandler}
                      className='outline-none border-2 border-slate-500 px-3 py-2 rounded-lg w-full'
                    />
                  </div>
                </div>
              </form>
              <div>
                <div className='mt-8 flex flex-col '>
                  <p className='mb-3 font-semibold'>Share some basics about your place</p>
                  <div className='flex gap-6 justify-start align-center'>
                    {
                      ["Guests", "Bedrooms", "Beds", "Baths"].map((item, i) => (
                        <div key={i} className='flex justify-center items-center p-2 rounded-md gap-3 border-2 border-slate-400 font-semibold'>
                          <p className='text-[.92rem]'>{item}</p>
                          <div className='flex gap-1 items-center'>
                            <FiMinusCircle
                              onClick={() => decreaseCount(item)}
                              className='font-bold text-lg hover:text-orange-700'
                            />
                            <p>{basicCount[item.toLowerCase()]}</p>
                            <MdAddCircleOutline
                              onClick={() => increaseCount(item)}
                              className='font-bold text-lg hover:text-orange-700'
                            />
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What Does Place Offers */}
        <div className="mt-12">
          <h2 className='text-xl font-bold text-orange-500'>Step 2: Make your place stand out</h2>
          <div className='mt-2 h-[2px] w-full bg-slate-500' />

          {/* Facilities */}
          <div className='mt-8 flex flex-col gap-8'>
            <p className='mb-6 font-semibold'>Tell guests what your place has to offer</p>
            <div className='flex justify-center items-center flex-wrap gap-4'>
              {
                facilities.map((item) => (
                  <div key={item.id} className={`rounded-xl border-2 p-1 w-[11rem] h-[4.5rem] ${placeFacilities.includes(item.id) ? "border-orange-600" : "border-slate-400"} flex flex-col justify-center items-center gap-1 cursor-pointer`} onClick={() => toggleFacility(item.id)}>
                    <item.icon className="text-2xl" />
                    <p className='text-[.84rem] font-semibold text-center'>{item.name}</p>
                  </div>
                ))
              }
            </div>
          </div>

          {/*  Upload Photos */}
          <div className='mt-8 flex flex-col gap-4'>
            <p className='mb-2 font-semibold text-[1.1rem] text-[#2976bb]'>Add some photos of your place</p>
            <div className=''>
              {
                photos.length < 1 ? (
                  <div className='flex justify-center items-center w-72 h-40 border-[3px] border-dotted border-slate-400'>
                    <input type="file" name='image' id="image" accept='image/*' multiple className='hidden' onChange={handleUploadPhotos} />
                    <label htmlFor="image" className='flex flex-col justify-center items-center p-2 gap-4 cursor-pointer'>
                      <IoIosImages className='text-4xl' />
                      <p className='font-semibold'>Upload from your photos</p>
                    </label>
                  </div>
                ) : (
                  <div className='flex flex-wrap gap-4'>
                    {
                      photos.map((photo, index) => (
                        <UploadImageCard
                          key={index}
                          img={photo.img}
                          photoId={photo.id}
                          index={index}
                          moveImage={moveImage}
                          removePhotoHandler={removePhotoHandler}
                        />
                      ))
                    }
                    <div className='flex justify-center items-center w-72 h-40 border-[3px] border-dotted border-slate-400'>
                      <input type="file" name='image' id="image" accept='image/*' multiple className='hidden' onChange={handleUploadPhotos} />
                      <label htmlFor="image" className='flex flex-col justify-center items-center p-2 gap-4 cursor-pointer'>
                        <IoIosImages className='text-4xl' />
                        <p className='font-semibold'>Upload from your photos</p>
                      </label>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>

        {/* What Make Your Place Attractive And Exciting */}
        <div className='mt-8 flex flex-col w-full'>
          <p className='mb-2 font-semibold text-[1.1rem] text-[#2976bb]'>Tell guests what your place has to offer</p>
          <div className='flex justify-start items-center flex-wrap gap-4 w-full'>
            <form onSubmit={propertyDetailsSubmitHandler} className='flex flex-col w-[35rem] mt-2 gap-5'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="title" className='text-gray-700 font-medium'>Name</label>
                <input
                  type="text"
                  name='name'
                  id='name'
                  value={propertyDetails.name}
                  placeholder='A luxurious glamping tent...'
                  onChange={propertyDetailsChangeHandler}
                  className='outline-none border-2 border-slate-500 px-3 py-2 rounded-lg w-full'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="desc" className='text-gray-700 font-medium'>Description</label>
                <textarea
                  name='desc'
                  id='desc'
                  value={propertyDetails.desc}
                  placeholder='Enjoy your morning sipping in a....'
                  onChange={propertyDetailsChangeHandler}
                  className='outline-none border-2 border-slate-500 px-3 py-2 rounded-lg w-full'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="highlight" className='text-gray-700 font-medium'>Highlight</label>
                <input
                  type="text"
                  name='highlight'
                  id='highlight'
                  value={propertyDetails.highlight}
                  placeholder='Tucked away in a private wooded...'
                  onChange={propertyDetailsChangeHandler}
                  className='outline-none border-2 border-slate-500 px-3 py-2 rounded-lg w-full'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="highlightDesc" className='text-gray-700 font-medium'>Highlight Details</label>
                <textarea
                  name='highlightDesc'
                  id='highlightDesc'
                  value={propertyDetails.highlightDesc}
                  placeholder='You are welcome to use all the campground has to...'
                  onChange={propertyDetailsChangeHandler}
                  className='outline-none border-2 border-slate-500 px-3 py-2 rounded-lg w-full'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="price" className='text-gray-700 font-medium'>Now, set your PRICE</label>
                <p>
                  <input
                    type="number"
                    name='price'
                    id='price'
                    value={propertyDetails.price}
                    placeholder='100'
                    onChange={propertyDetailsChangeHandler}
                    className='outline-none border-2 border-slate-500 px-3 py-2 rounded-lg w-full'
                  />
                </p>
              </div>
            </form>
          </div>
        </div>

        <button className='mt-3 text-white px-5 py-2 bg-orange-500 hover:bg-orange-600 duration-300 transition-all rounded-lg' disabled={isLoading} onClick={createListingHandler}>
          {
            isLoading ? 'Loading...' : `Create Your Listing`
          }
          {/* Sign Up */}
        </button>
        {
          error && (
            <p className='text-red-600 text-sm -mt-2'>{error.message || `Something went wrong`}</p>
          )
        }
      </div>
    </section>
  )
}

export default HostProperty;