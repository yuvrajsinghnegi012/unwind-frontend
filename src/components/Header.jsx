import { logo, IoMdSearch, LuMenu, FaUser } from "../constant";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/apis/userApi";
import toast from "react-hot-toast";
import { setUser } from "../redux/slices/user";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [logout, { error }] = useLogoutMutation();
  const [query, setQuery] = useState("");
  const logoutHandler = async () => {
    await logout();
    if (error) {
      toast.error("Something went wrong");
      console.log(error);
      return;
    }
    else {
      dispatch(setUser(null));
      navigate("/");
      toast.success("Logout Successful");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      query ? navigate(`/search?search=${query}`) : toast.error("No query to search");
    }
  };

  return (
    <header>
      <div className="px-2 md:px-8 py-3 flex gap-4 justify-between items-center">
        <img src={logo} className="h-12 sm:h-16 cursor-pointer" alt="Logo" onClick={() => navigate("/")} />
        <div className="flex items-center justify-between px-3 py-1 sm:px-4 sm:py-2 rounded-full border-[2px] md:border-2 border-slate-400 lg:w-[20rem]">
          <input type="text"
            name="query"
            id="query"
            placeholder="Search by name, location, etc"
            className="w-[60%] md:w-full outline-none text-sm md:base"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <IoMdSearch className="text-orange-600 font-bold text-xl sm:text-2xl cursor-pointer" onClick={() => query ? navigate(`/search?search=${query}`) : toast.error("No query to search")} />
        </div>
        <div className="flex items-center gap-2">
          <button className={`text-slate-800 font-medium hidden md:block`} onClick={() => user ? navigate(`/host-property`) : toast.error("Login Required")}>Become A Host</button>
          {
            user ? (
              <Menubar className="border-slate-500">
                <MenubarMenu>
                  <MenubarTrigger>
                    <div className="flex items-center gap-3 cursor-pointer">
                      <LuMenu className="text-slate-500 text-xl" />
                      <FaUser className="text-slate-500 text-lg" />
                    </div>
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarRadioGroup value="options">
                      <MenubarRadioItem value="trip" onClick={() => { navigate("/trips") }} className="cursor-pointer">Trip List</MenubarRadioItem>
                      <MenubarRadioItem value="wish" onClick={() => { navigate("/wishlist") }} className="cursor-pointer">Wish List</MenubarRadioItem>
                      <MenubarRadioItem value="property" onClick={() => { navigate("/property-list") }} className="cursor-pointer">Property List (self hosted)</MenubarRadioItem>
                      <MenubarRadioItem value="host" onClick={() => { navigate("/host-property") }} className="cursor-pointer">Become A Host</MenubarRadioItem>
                    </MenubarRadioGroup>
                    <MenubarSeparator />
                    <MenubarItem inset onClick={logoutHandler} className="cursor-pointer">Logout</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            ) : (
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>
                    <div className="flex items-center gap-3 cursor-pointer">
                      <LuMenu className="text-slate-400 text-xl" />
                      <FaUser className="text-slate-400 text-lg" />
                    </div>
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarRadioGroup value="options">
                      <MenubarRadioItem value="login" onClick={() => { navigate("/login") }} className="cursor-pointer">Login</MenubarRadioItem>
                      <MenubarRadioItem value="register" onClick={() => { navigate("/register") }} className="cursor-pointer">Register</MenubarRadioItem>
                    </MenubarRadioGroup>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )
          }
        </div>
      </div>
    </header>
  )
}

export default Header;
