import { useState, FC } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Імпортуємо іконки

interface InputFieldProps {
  type: string; // Тип поля вводу (наприклад, 'text', 'email', 'password')
  placeholder?: string; // Плейсхолдер для інпуту (необов'язковий)
  value: string; // Значення поля вводу
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Обробник зміни значення
}

const InputField: FC<InputFieldProps> = ({ type, placeholder, value, onChange }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordShown((prevState) => !prevState);
  };

  return (
    <div className="input-wrapper" style={{ position: "relative", display: "flex", alignItems: "center" }}>
      <input
        type={isPasswordShown && type === "password" ? "text" : type}
        placeholder={placeholder}
        className="input-field"
        value={value}
        onChange={onChange}
        required
        style={{ paddingRight: "2rem" }} // Відступ справа для іконки
      />
      {type === "password" && (
        <span
          onClick={togglePasswordVisibility}
          style={{
            position: "absolute",
            right: "0.5rem",
            cursor: "pointer",
            color: "#888",
            display: "flex",
            alignItems: "center"
          }}
        >
          {isPasswordShown ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}
    </div>
  );
};

export default InputField;
