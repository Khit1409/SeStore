// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoaddingAnimation() {
  return (
    <div className="w-screen h-screen backdrop-blur-lg flex items-center justify-center">
      <div className="fixed z-50 w-[200px] h-[200px] flex items-center justify-center rounded">
        <div className="w-[50px] rounded-full h-[50px] border-2 border-t-transparent animate-spin border-gray-500" />
      </div>
    </div>
  );
}
