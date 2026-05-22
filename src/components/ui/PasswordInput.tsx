import React, { useState } from "react";

interface PasswordInputProps {
    label:string;
    name:string;
    register:any;
    error?:string;
}

export const PasswordInput: React.FC<PasswordInputProps>=({
    label,
    name,
    register,
    error
}) => {
    const [show,setShow] = useState(false);

    return(
        <div className= "flex flex-col gap-1" >
            <label className="font-medium">{label}</label>

            <div className="relative">
                <input
                type={show ?"text" : "password"}
                {...register(name)}
                className={`p-2 border rounded w-full focus:outline-none ${error ? 'bg-red-200 border-red-600' : 'bg-white border-black'}`}
                />

                <button
                type="button"
                onClick={()=> setShow(!show)}
                className="absolute right-2 top-2 text-sm"
                >
                    {show ? "Hide" : "Show"}
                </button>
            </div>
        
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};