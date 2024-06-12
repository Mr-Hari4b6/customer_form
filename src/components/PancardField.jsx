import React, { useState } from 'react';
import './PancardField.css';

const PanCardInput = () => {
    const [pan, setPan] = useState('');
    const [error, setError] = useState('');

    const validatePan = (value) => {
        const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (value.length === 10) {
            if (!regex.test(value)) {
                setError('Invalid PAN card format. Format: AAAAA9999A');
            } else {
                setError('');
            }
        } else {
            setError('');
        }
    };

    const handleChange = (e) => {
        const { value } = e.target;
        if (value.length <= 10) {
            let upperValue = value.toUpperCase();
            setPan(upperValue);
            validatePan(upperValue);
        }
    };

    const handleKeyPress = (e) => {
        const { key, target } = e;
        const { value } = target;

        if (value.length < 5) {
            if (!/[A-Z]/i.test(key)) {
                e.preventDefault();
                setError('First 5 characters must be letters.');
            } else {
                setError('');
            }
        } else if (value.length >= 5 && value.length < 9) {
            if (!/[0-9]/.test(key)) {
                e.preventDefault();
                setError('Characters 6 to 9 must be numbers.');
            } else {
                setError('');
            }
        } else if (value.length === 9) {
            if (!/[A-Z]/i.test(key)) {
                e.preventDefault();
                setError('Last character must be a letter.');
            } else {
                setError('');
            }
        }
    };   

    return (
        <>
            <div className="form-group">
                <label htmlFor="pan">PAN Card Number:</label>
                <input
                    type="text"
                    id="pan"
                    value={pan}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="AAAAA9999A"
                    maxLength="10"
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    );
};

export default PanCardInput;
