import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function ProductContainerSeller() {
  return (
    <div className="container-lg my-3 flex flex-col justify-center items-center">
      <div className="my-6">
        <h1 className="text-4xl font-bold">My Shop</h1>
      </div>
      {/* row */}
      <div className="w-[95%] h-[95%] grid md:grid-cols-4 grid-cols-2 rounded gap-3">
        {/* col */}
        <div
          className="group relative h-[300px] my-2 mx-2 shadow-[0px_0px_3px_0px_rgba(0,0,0,0.6)] rounded
        bg-[url('https://vestdep.net/upload/vestdep/%E1%BA%A2NH%20S%E1%BA%A2N%20PH%E1%BA%A8M/vd437%20(2).jpg')] bg-cover bg-center bg-no-repeat]"
        >
          {/* info */}
          <div className="hidden group-hover:flex absolute bottom-0 flex-col items-center justify-center w-full font-bold mb-2">
            <p>price: 200$ </p>
            <p>Name: </p>
            {/* button */}
            <div className="flex gap-2">
              <Link
                to="/shopdetailseller"
                className="bg-green-500 px-2 rounded text-xl text-white hover:bg-green-600 flex items-center"
              >
                Detail
              </Link>
              <button className="bg-green-500 px-2 h-[40px] rounded text-xl text-white hover:bg-green-600">
                <FontAwesomeIcon icon={["fas", "pen"]} />
              </button>
              <button className="bg-yellow-500 px-2 h-[40px] rounded text-xl text-white hover:bg-yellow-600">
                <FontAwesomeIcon icon={["fas", "trash"]} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
