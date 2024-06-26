import logo from "../assets/logo.png";
import loginPhoto from "../assets/loginPhoto.png";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
    GiBarn,
    GiBoatFishing,
    GiCactus,
    GiCastle,
    GiCaveEntrance,
    GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import {
  FaSkiing,
  FaPumpSoap,
  FaShower,
  FaFireExtinguisher,
  FaUmbrellaBeach,
  FaKey,
} from "react-icons/fa";
import { FaHouseUser, FaPeopleRoof, FaKitchenSet } from "react-icons/fa6";
import {
  BiSolidWasher,
  BiSolidDryer,
  BiSolidFirstAid,
  BiWifi,
  BiSolidFridge,
  BiWorld,
} from "react-icons/bi";
import { BsSnow, BsFillDoorOpenFill, BsPersonWorkspace } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla, MdMicrowave, MdBalcony, MdYard, MdPets } from "react-icons/md";
import {
  PiBathtubFill,
  PiCoatHangerFill,
  PiTelevisionFill,
} from "react-icons/pi";
import { TbIroning3 } from "react-icons/tb";
import {
  GiHeatHaze,
  GiCctvCamera,
  GiBarbecue,
  GiToaster,
  GiCampfire,
} from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";
import { BiSolidMessageAltCheck } from "react-icons/bi";
import { FaPhone } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FiMinusCircle } from "react-icons/fi";
import { MdAddCircleOutline } from "react-icons/md";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";

import payment from "../assets/payment.png";

export const categories = [
  {
    label: "All",
    icon: BiWorld,
  },
  {
    img: "../assets/beach_cat.jpg",
    label: "Beachfront",
    icon: TbBeach ,
    description: "This property is close to the beach!",
  },
  {
    img: "../assets/windmill_cat.webp",
    label: "Windmills",
    icon: GiWindmill,
    description: "This property is has windmills!",
  },
  {
    img: "../assets/modern_cat.webp",
    label: "Iconic cities",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    img: "../assets/countryside_cat.webp",
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    img: "../assets/pool_cat.jpg",
    label: "Amazing Pools",
    icon: TbPool,
    description: "This is property has a beautiful pool!",
  },
  {
    img: "../assets/island_cat.webp",
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    img: "../assets/lake_cat.webp",
    label: "Lakefront",
    icon: GiBoatFishing,
    description: "This property is near a lake!",
  },
  {
    img: "../assets/skiing_cat.jpg",
    label: "Ski-in-out",
    icon: FaSkiing,
    description: "This property has skiing activies!",
  },
  {
    img: "../assets/castle_cat.webp",
    label: "Castles",
    icon: GiCastle,
    description: "This property is an ancient castle!",
  },
  {
    img: "../assets/cave_cat.jpg",
    label: "Caves",
    icon: GiCaveEntrance,
    description: "This property is in a spooky cave!",
  },
  {
    img: "../assets/camping_cat.jpg",
    label: "Camping",
    icon: GiForestCamp,
    description: "This property offers camping activities!",
  },
  {
    img: "../assets/arctic_cat.webp",
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in arctic environment!",
  },
  {
    img: "../assets/desert_cat.webp",
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    img: "../assets/barn_cat.jpg",
    label: "Barns",
    icon: GiBarn,
    description: "This property is in a barn!",
  },
  {
    img: "../assets/lux_cat.jpg",
    label: "Luxury",
    icon: IoDiamond,
    description: "This property is brand new and luxurious!",
  },
];

export const types = [
  {
    name: "An entire place",
    description: "Guests have the whole place to themselves",
    icon: FaHouseUser,
  },
  {
    name: "Room(s)",
    description:
      "Guests have their own room in a house, plus access to shared places",
    icon: BsFillDoorOpenFill,
  },
  {
    name: "A Shared Room",
    description:
      "Guests sleep in a room or common area that maybe shared with you or others",
    icon: FaPeopleRoof,
  },
];

export const facilities = [
  {
    id: 1,
    name: "Bath tub",
    icon: PiBathtubFill,
  },
  {
    id: 2,
    name: "Personal care products",
    icon: FaPumpSoap,
  },
  {
    id: 3,
    name: "Outdoor shower",
    icon: FaShower,
  },
  {
    id: 5,
    name: "Washer",
    icon: BiSolidWasher,
  },
  {
    id: 6,
    name: "Dryer",
    icon: BiSolidDryer,
  },
  {
    id: 7,
    name: "Hangers",
    icon: PiCoatHangerFill,
  },
  {
    id: 8,
    name: "Iron",
    icon: TbIroning3,
  },
  {
    id: 9,
    name: "TV",
    icon: PiTelevisionFill,
  },
  {
    id: 10,
    name: "Dedicated workspace",
    icon: BsPersonWorkspace
  },
  {
    id: 11,
    name: "Air Conditioning",
    icon: BsSnow,
  },
  {
    id: 12,
    name: "Heating",
    icon: GiHeatHaze,
  },
  {
    id: 13,
    name: "Security cameras",
    icon: GiCctvCamera,
  },
  {
    id: 14,
    name: "Fire extinguisher",
    icon: FaFireExtinguisher,
  },
  {
    id: 15,
    name: "First Aid",
    icon: BiSolidFirstAid,
  },
  {
    id: 16,
    name: "Wifi",
    icon: BiWifi,
  },
  {
    id: 17,
    name: "Cooking set",
    icon: FaKitchenSet,
  },
  {
    id: 18,
    name: "Refrigerator",
    icon: BiSolidFridge,
  },
  {
    id: 19,
    name: "Microwave",
    icon: MdMicrowave,
  },
  {
    id: 20,
    name: "Stove",
    icon: GiToaster,
  },
  {
    id: 21,
    name: "Barbecue grill",
    icon: GiBarbecue,
  },
  {
    id: 22,
    name: "Outdoor dining area",
    icon: FaUmbrellaBeach,
  },
  {
    id: 23,
    name: "Private patio or Balcony",
    icon: MdBalcony,
  },
  {
    id: 24,
    name: "Camp fire",
    icon: GiCampfire,
  },
  {
    id: 25,
    name: "Garden",
    icon: MdYard,
  },
  {
    id: 26,
    name: "Free parking",
    icon: AiFillCar,
  },
  {
    id: 27,
    name: "Self check-in",
    icon: FaKey,
  },
  {
    id: 28,
    name: " Pet allowed",
    icon: MdPets,
  }
];

export { logo, payment, loginPhoto };
export { BiSolidMessageAltCheck, FaPhone, FaRegHeart, FaHeart, FiMinusCircle, MdAddCircleOutline, IoIosImages, BiTrash };



// Temporary
import img1 from "../assets/Listing1/1.jpg";
import img2 from "../assets/Listing1/2.jpg";
import img3 from "../assets/Listing1/3.jpeg";
import img4 from "../assets/Listing1/4.jpg";
import img5 from "../assets/Listing1/5.jpg";

export const properties = [
  {
    _id: "6651d94c45115333dd143eea",
    images: [img1, img2, img3, img4, img5],
    label: "Beachfront",
    location: "Milford, Connecticut, United States",
    highlight: "An entire place",
    price: 713,
  },
  {
    _id: "6651d94c45115333dd143eea",
    images: [img1, img2, img3, img4, img5],
    label: "Beachfront",
    location: "Milford, Connecticut, United States",
    highlight: "An entire place",
    price: 713,
  },
  {
    _id: "6651d94c45115333dd143eea",
    images: [img1, img2, img3, img4, img5],
    label: "Beachfront",
    location: "Milford, Connecticut, United States",
    highlight: "An entire place",
    price: 713,
  },
  {
    _id: "6651d94c45115333dd143eea",
    images: [img1, img2, img3, img4, img5],
    label: "Beachfront",
    location: "Milford, Connecticut, United States",
    highlight: "An entire place",
    price: 713,
  },
  {
    _id: "6651d94c45115333dd143eea",
    images: [img1, img2, img3, img4, img5],
    label: "Beachfront",
    location: "Milford, Connecticut, United States",
    highlight: "An entire place",
    price: 713,
  },
  {
    _id: "6651d94c45115333dd143eea",
    images: [img1, img2, img3, img4, img5],
    label: "Beachfront",
    location: "Milford, Connecticut, United States",
    highlight: "An entire place",
    price: 713,
  },
  {
    _id: "6651d94c45115333dd143eea",
    images: [img1, img2, img3, img4, img5],
    label: "Beachfront",
    location: "Milford, Connecticut, United States",
    highlight: "An entire place",
    price: 713,
  },
  {
    _id: "6651d94c45115333dd143eea",
    images: [img1, img2, img3, img4, img5],
    label: "Beachfront",
    location: "Milford, Connecticut, United States",
    highlight: "An entire place",
    price: 713,
  },
  {
    _id: "6651d94c45115333dd143eea",
    images: [img1, img2, img3, img4, img5],
    label: "Beachfront",
    location: "Milford, Connecticut, United States",
    highlight: "An entire place",
    price: 713,
  },
  {
    _id: "6651d94c45115333dd143eea",
    images: [img1, img2, img3, img4, img5],
    label: "Beachfront",
    location: "Milford, Connecticut, United States",
    highlight: "An entire place",
    price: 713,
  },
];



////////////////////////////////
// Single Property
// import img1 from "../assets/Listing1/1.jpg";
// import img2 from "../assets/Listing1/2.jpg";
// import img3 from "../assets/Listing1/3.jpeg";
// import img4 from "../assets/Listing1/4.jpg";
// import img5 from "../assets/Listing1/5.jpg";
// import img6 from "../assets/Listing1/6.jpg";
// import img7 from "../assets/Listing1/7.jpg";
// import img8 from "../assets/Listing1/8.jpg";
// import userImg from "../assets/phucmai.png";

// export const property = {
//   name: "Cheerful 3 Bedroom Cottage with Fire Place",
//   price: 1080,
//   location: "Milford, Connecticut, United States",
//   images: [img1, img2, img3, img4, img5, img6, img7, img8],
//   guests: 3,
//   bedroom: 2,
//   bed: 2,
//   bath: 1,
//   host: {
//     name: "Phuc Mai",
//     profilePicture: userImg,
//   },
//   desc: "Located at the end of a gravel Lane, amongst tree, making it the perfect gateway. The expansive patio and beachfront yard offer infinity views of your private beach. Bait a crab pot to catch your own dinner or enjoy a meal from one of the local restaurants. A spacious modern apen living space with amazing views greets you upon arrival. The space opens onto your private deck with an outdoor seating area. Take your pick of two private bedrooms with access to outdoor balcony spaces and amazing water views. Bathrooms are well appointed with all the comforts of home.",
//   highlight: "Recharge your battery and reset your mind by staying at our waterfront paradise.",
//   highlightDesc: "Spend time with your trive while relaxing in this beautiful, well-appointed home featuring stunning wide water views of the Chesapeake Bay.",
//   facilities: [1, 2, 3, 5, 8, 22, 24, 25, 27],
// }