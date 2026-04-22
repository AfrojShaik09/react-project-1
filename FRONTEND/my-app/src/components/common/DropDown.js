import React, { useEffect, useRef } from "react";
import "./Dropdown.css";

export default function Dropdown({ label, isOpen, setIsOpen, children }) {
  const dropdownRef = useRef(null);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  return (
    <div className="dropdown-wrapper" ref={dropdownRef}>
      <button
        className="dropdown-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {label} ▾
      </button>

      {isOpen && <div className="dropdown-menu">{children}</div>}
    </div>
  );
}
