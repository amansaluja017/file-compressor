import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState } from "../store/Store";
import axios from "axios";
import { logout } from "../store/Slice";

function Header() {
  const typedUseSelectorHook: TypedUseSelectorHook<RootState> = useSelector;
  const status = typedUseSelectorHook((state) => state.user.status);

  const dispatch = useDispatch();

  const logoutBtn = async () => {
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/users/logout`,
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      console.log(response.data.data);
      dispatch(logout());
    }
  };

  return (
    <div className="relative bg-base-100 w-full top-0 z-50 text-white">
      <div className="navbar bg-transparent shadow-sm">
        <div className="">
          <a className="btn btn-ghost text-xl">IM</a>
        </div>
        {status ? (
          <div className="flex gap-2 w-full">
            <div className="w-full flex justify-center items-center">
              <ul className="flex">
                <li>
                <Link to="/home" className="btn btn-ghost">
                  Resizer
                </Link>
              </li>
              <li>
                <Link to="/backgroundChange" className="btn btn-ghost">
                  Background changer
                </Link>
              </li>
              <li>
                <Link to="/extractor" className="btn btn-ghost">
                  Items extractor
                </Link>
              </li>
              </ul>
            </div>
            <div className="dropdown dropdown-end absolute right-4">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <a className="justify-between">Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <Link onClick={() => logoutBtn()} to="/">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ): (
          <div className="gap-5 flex">
            <Link to="/login" className="btn btn-outline btn-info">
              Login
            </Link>
            <Link to="/signup" className="btn btn-outline btn-success">
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
