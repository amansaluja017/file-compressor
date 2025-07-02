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
    const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
      withCredentials: true
    })

    if (response.status === 200) {
      console.log(response.data.data);
      dispatch(logout());
    }
  }

  return (
    <div className="relative bg-base-100 w-full top-0 z-50">
      <div className="navbar bg-transparent shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Image modifier</a>
        </div>
        {/* <div className="flex gap-2">
          <div className="dropdown dropdown-end">
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
                <a className="justify-between">
                  Profile
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div> */}
        {!status && (
          <div className="gap-5 flex">
            <Link to="/login" className="btn btn-outline btn-info">
              Login
            </Link>
            <Link to="/signup" className="btn btn-outline btn-success">
              Signup
            </Link>
          </div>
        )}
        {status && (
          <div className="gap-5 flex">
            <Link onClick={() => logoutBtn()} to="/" className="btn btn-outline btn-info">
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
