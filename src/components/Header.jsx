import { IoMdSearch } from "react-icons/io";
import { LuMenu } from "react-icons/lu";
import { FaUser } from "react-icons/fa6";
import { logo } from "../constant";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logoutHandler = () => { }
  let user = false;

  return (
    <header>
      <div className="px-8 py-3 flex gap-4 justify-between items-center">
        <img src={logo} className="h-16 cursor-pointer" alt="Logo" onClick={() => navigate("/")} />
        <div className="flex items-center justify-between px-4 py-2 rounded-full border-2 border-slate-500 lg:w-[20rem]">
          <input type="text" name="search" id="search" placeholder="Mountains...." className="w-[60%] md:w-full outline-none" />
          <IoMdSearch className="text-red-700 font-bold text-2xl cursor-pointer" onClick={() => navigate("/search")} />
        </div>
        <div className="flex items-center gap-2">
          <button className="text-slate-800 font-medium" onClick={() => navigate("/host-property")}>Become A Host</button>
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
                      <MenubarRadioItem value="property" onClick={() => { navigate("/properties") }} className="cursor-pointer">Property List</MenubarRadioItem>
                      <MenubarRadioItem value="reservation" onClick={() => { navigate("/reservations") }} className="cursor-pointer">Reservation List</MenubarRadioItem>
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
