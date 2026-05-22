import { InputText } from "./ui/InputText";

interface FormInputProps {
    text?: string;
    label?: string;
    type: string;
    name: string;
    register: any;
    error?: string;
    placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({ text, label, type, name, register, error, placeholder }) => {
    const displayLabel = label || text || "";
    return (
        <div className="flex flex-col gap-2 mb-3">
            <label className="font-medium">{displayLabel}</label>
            <InputText type={type} name={name} register={register} placeholder={placeholder} error={error} />
        </div>
    )
}

export default FormInput;