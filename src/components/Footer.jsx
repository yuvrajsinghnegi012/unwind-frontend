import React from 'react';
import { logo, payment, FaPhone, BiSolidMessageAltCheck } from "../constant";

import { useNavigate } from 'react-router-dom';

const Footer = () => {

  const navigate = useNavigate();

  return (
    <div className=''>
      <div className='w-[95%] pt-44 pb-6 mx-auto flex justify-between items-center'>
        <img src={logo} alt="Logo" className="h-20 w-auto" onClick={() => navigate("/")} />
        <div className="">
          <h2 className='font-bold text-lg mb-3'>Useful Links</h2>
          <p className="cursor-pointer" onClick={() => navigate("/wishlist")}>WishList</p>
          <p className="cursor-pointer">Terms & Conditions</p>
        </div>
        <div>
          <h2 className='font-bold text-lg mb-3'>Contact</h2>
          <div className="flex gap-3 items-center">
            <FaPhone />
            <p>+91 7310962242</p>
          </div>
          <div className="flex gap-3 items-center">
            <BiSolidMessageAltCheck />
            <p>support@unwind.com</p>
          </div>
          <img src={payment} alt="Payment" className='h-8 pt-2' />
        </div>
      </div>
    </div>
  )
}

export default Footer;