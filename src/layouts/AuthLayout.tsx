import { Outlet } from "react-router-dom";

export default function AuthLayout(){
    return(
        <div className="min-h-screen w-full grid grid-cols-2 items-center">
            {/*kiri */}
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                {/* <img src="https://www.invofest-harkatnegeri.com/assets/text-image.png"
                    alt=""
                    className="w-96"
                /> */}
                <p className="text-7xl text-purple-700 font-bold text-center mb-1">Event Management</p>

            </div>

            {/*kanan*/}
            <div className="p-6">
                <Outlet />
            </div>
        </div>
    );
}