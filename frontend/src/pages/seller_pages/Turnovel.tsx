import { useSelector } from "react-redux";
import { RootState } from "../../redux/authStore";
import HeaderSeller from "../../layouts/HeaderSeller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Turnovel() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="m-0 p-0">
      <HeaderSeller />
      <div className="flex gap-2 justify-center py-5 px-2">
        <section className="h-[95%] rounded flex justify-center bg-white">
          {user && (
            <ul className="w-full h-full flex flex-col justify-center gap-2 rounded shadow-[0px_0px_3px_1px_rgba(0,0,0,0.75)] p-2">
              <li className="flex items-center justify-center mb-3">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-[100px] h-[100px] rounded-full"
                />
              </li>
              <li className="bg-gray-100 rounded flex text-center px-1">
                <span className="font-bold mx-1"> Tên: </span>
                <p>{user.fullname}</p>
              </li>
              <li className="bg-gray-100 rounded flex text-center px-1">
                <span className="font-bold mx-1"> Email:</span>{" "}
                <p>{user.email}</p>
              </li>
              <li className="bg-gray-100 rounded flex text-center px-1">
                <span className="font-bold mx-1">Phone: </span>
                <p>{user.phone}</p>
              </li>
              <li className="bg-gray-100 rounded flex text-center px-1">
                <span className="font-bold mx-1">Địa chỉ:</span>
                <p> {user.address}</p>
              </li>
              <li className="bg-gray-100 rounded flex text-center px-1">
                <span className="font-bold mx-1">Quyền:</span>
                <p> {user.role}</p>
              </li>
              {/* logout btn */}
              <li className="flex items-center justify-center mt-6">
                <button
                  type="button"
                  className="flex w-[80px] items-center justify-center rounded bg-cyan-500 text-xl font-bold text-white py-1"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </section>
        <section className="flex flex-col gap-3">
          {/* filter */}
          <ul className="flex gap-1">
            <li>
              <button className="border-gray-500 border-[1.5px] rounded px-2">
                Tháng 1
              </button>
            </li>
            <li>
              <button className="border-gray-500 border-[1.5px] rounded px-2">
                Tháng 2
              </button>
            </li>
            <li>
              <button className="border-gray-500 border-[1.5px] rounded px-2">
                Tháng 3
              </button>
            </li>
            <li>
              <button className="border-gray-500 border-[1.5px] rounded px-2">
                Tháng 4
              </button>
            </li>
            <li>
              <button className="border-gray-500 border-[1.5px] rounded px-2">
                Tháng 5
              </button>
            </li>
            <li>
              <button className="border-gray-500 border-[1.5px] rounded px-2">
                Tháng 6
              </button>
            </li>
            <li>
              <button className="border-gray-500 border-[1.5px] rounded px-2">
                Tháng 7
              </button>
            </li>
            <li>
              <button className="border-gray-500 border-[1.5px] rounded px-2">
                Tháng 8
              </button>
            </li>
            <li>
              <button className="border-gray-500 border-[1.5px] rounded px-2">
                Tháng 9
              </button>
            </li>
            <li>
              <button className="border-gray-500 border-[1.5px] rounded px-2">
                Tháng 10
              </button>
            </li>
            <li>
              <button className="border-gray-500 border-[1.5px] rounded px-2">
                Tháng 11
              </button>
            </li>
            <li>
              <button className="border-gray-500 border-[1.5px] rounded px-2">
                Tháng 12
              </button>
            </li>
          </ul>
          {/* search */}
          <form
            action=""
            className="w-full flex items-center justify-center"
          >
            <div className="w-[500px] relative h-[35px]">
              <input
                type="text"
                name="search"
                className="h-full border rounded-lg w-full outline-0 text-center"
                placeholder="Nhập từ khóa để tìm kiếm"
              />
              <button className="bg-green-500 rounded-r-lg absolute h-full right-0 w-[50px]">
                <FontAwesomeIcon icon={["fas", "search"]} className="text-white"/>
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
