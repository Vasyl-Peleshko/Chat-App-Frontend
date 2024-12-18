export interface InputFieldProps {
    type: string; // Тип поля вводу (наприклад, 'text', 'email', 'password')
    placeholder?: string; // Плейсхолдер для інпуту (необов'язковий)
    value: string; // Значення поля вводу
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Обробник зміни значення
  }