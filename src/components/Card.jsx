import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "../constant";
import { useToggleWishlistPropertyMutation } from "../redux/apis/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slices/user";
import Loader from "./Loader";
import toast from "react-hot-toast";

const Card = ({ property }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [toggleWishlist, { isLoading, error }] = useToggleWishlistPropertyMutation();
    const { user } = useSelector((state) => state.user);

    const wishlistHandler = async () => {
        if (!user) {
            toast.error("You need to login first");
            return;
        }
        // Add Wishlist Functionality
        const { data } = await toggleWishlist({ userId: user?._id, propertyId: property?._id });
        if (error) {
            toast.error("Something went wrong");
            navigate("/");
            return;
        }

        // Saving the Updated user in the redux
        dispatch(setUser(data?.updatedUser));
        setInWishlist(!inWishlist);
    }

    return (
        isLoading ? <Loader /> : (
            <div className="h-full relative flex flex-col items-start w-[20rem]">
                <Carousel className="h-[13rem] w-[20rem] rounded-lg mb-2">
                    {
                        property.images.map((item, i) => (
                            <div key={i} className="">
                                <img src={item} className="w-full h-[13rem] object-cover object-center rounded-lg" alt={item.label} />
                            </div>
                        ))
                    }
                </Carousel>
                <div className="flex flex-col items-start cursor-pointer" onClick={() => navigate(`/property-details/${property._id}`)}>
                    <h2 className="font-bold">{property.name}</h2>
                    <p className="font-semibold ">{property.highlight}</p>
                    <p>{property.location}</p>
                    <p><span className="font-bold">₹{property.price}</span> per night</p>
                </div>
                <div className="absolute z-10 top-2 right-2">
                    {
                        (user?.wishList?.includes(property._id) || false) ? <FaHeart className="text-red-600 text-xl cursor-pointer" onClick={wishlistHandler} /> : <FaRegHeart className="text-red-600 text-xl cursor-pointer" onClick={wishlistHandler} />
                    }
                </div>
            </div>
        )
    )
}

export default Card;