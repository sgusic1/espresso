import React from "react";

interface ShinyTextProps {
  text: string;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, className = "" }) => {
  return <span className={`shiny-hover ${className}`}>{text}</span>;
};

export default ShinyText;
