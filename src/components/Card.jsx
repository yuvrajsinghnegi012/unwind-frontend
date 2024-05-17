import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";
const Card = ({ property }) => {

    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-start h-[17rem]">
            <Carousel className="h-full w-full rounded-lg mb-2">
                {
                    property.images.map((item, i) => (
                        <div key={i} className="">
                            <img src={item} className="w-full h-full rounded-lg" alt={item.label} />
                        </div>
                    ))
                }
            </Carousel>
            <div className="flex flex-col items-start cursor-pointer" onClick={()=>navigate(`/property-details/${property._id}`)}>
                <h2 className=" font-bold">{property.location}</h2>
                <p>{property.label}</p>
                <p>{property.highlight}</p>
                <p><span className="font-bold">₹{property.price}</span> per night</p>
            </div>
        </div>
    )
}

export default Card;