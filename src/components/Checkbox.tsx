import { ChangeEvent } from "react";
import { cn } from "../utils";

interface CheckboxProps {
  isChecked: boolean;
  label: string;
  onChange: (event: ChangeEvent<HTMLDivElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  isChecked,
  label,
  onChange,
  ...props
}) => {
  return (
    <div
      {...props}
      className={"flex justify-center items-center"}
      onChange={onChange}
    >
      <label className="flex flex-row items-center w-full">
        <input
          type="checkbox"
          checked={isChecked}
          readOnly
          className="w-4 h-4 accent-pink-600 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
        />
        <span className={cn("ml-4", isChecked && "line-through")}>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
