import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown = ({ options, value, onChange, label, icon, fieldName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (option) => {
        onChange({ target: { name: fieldName, value: option } });
        setIsOpen(false);
    };

    return (
        <div className="hologram-dropdown" ref={dropdownRef}>
            <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#2d5016',
                fontWeight: 500,
                fontSize: '0.9rem'
            }}>
                {icon} {label}
            </label>

            <div
                className={`hologram-trigger ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span style={{
                    color: value ? '#2d5016' : '#9ca3af',
                    fontWeight: value ? 500 : 400
                }}>
                    {value ? (
                        value.charAt(0).toUpperCase() + value.slice(1)
                    ) : (
                        `Select ${label}`
                    )}
                </span>

                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                        fill: '#4a7c2c'
                    }}
                >
                    <path d="M6 9L1 4h10z" />
                </svg>
            </div>

            {isOpen && (
                <div className="hologram-menu">
                    {options.map((option, index) => (
                        <div
                            key={option}
                            className={`hologram-option ${value === option ? 'selected' : ''}`}
                            onClick={() => handleSelect(option)}
                            style={{
                                animationDelay: `${index * 0.03}s`
                            }}
                        >
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
