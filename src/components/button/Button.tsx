import React from "react";

type ButtonProps = {
  text: string;
  onClick: () => void;
};

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <div className="button-item">
      <button onClick={onClick}>{text}</button>
    </div>
  );
};

export default Button;
