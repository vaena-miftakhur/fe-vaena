import React from "react";

interface BaseInputProps {
    label?: string;
    name: string;
    register: any;
    error?: string;
    type?: string;
    placeholder?: string;
}

export const InputText: React.FC<BaseInputProps> = ({
    label,
    name,
    register,
    error,
    type = "text",
    placeholder
}) => {
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="font-medium">{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                {...register(name)}
                className={`p-2 border rounded w-full focus:outline-none focus:ring-2 ${
                    error
                        ? 'bg-red-200 border-red-600 focus:ring-red-400'
                        : 'bg-white border-black focus:ring-gray-400'
                }`}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};