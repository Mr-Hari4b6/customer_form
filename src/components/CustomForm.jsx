import React, { useState } from 'react';
import './CustomForm.css';

const CustomForm = () => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [rollNoError, setRollNoError] = useState('');
    const [pan, setPan] = useState('');
    const [panError, setPanError] = useState('');
    const [dob, setDob] = useState('');
    const [dobError, setDobError] = useState('');
    const [daysSinceDob, setDaysSinceDob] = useState(0);

    const handleNameChange = (e) => {
        const { value } = e.target;
        const regex = /^[A-Za-z]*$/;
        if (regex.test(value)) {
            setName(value);
            setNameError('');
        } else {
            setNameError('Name should contain only alphabets.');
        }
    };

    const handleRollNoChange = (e) => {
        const { value } = e.target;
        const regex = /^[A-Za-z0-9]{0,8}$/;
        if (regex.test(value)) {
            setRollNo(value);
            setRollNoError('');
            if (value.length !== 8) {
                setRollNoError('Roll No must be 8 characters long.');
            }
        } else {
            setRollNoError('Roll No should be alphanumeric and 8 characters long.');
        }
    };
    
    const validatePan = (value) => {
        const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (value.length === 10) {
            if (!regex.test(value)) {
                setPanError('Invalid PAN card format. Format: AAAAA9999A');
            } else {
                setPanError('');
            }
        } else {
            setPanError('');
        }
    };

    const handleKeyPress = (e) => {
        const { key, target } = e;
        const { value } = target;

        if (value.length < 5) {
            if (!/[A-Z]/i.test(key)) {
                e.preventDefault();
                setPanError('First 5 characters must be letters.');
            } else {
                setPanError('');
            }
        } else if (value.length >= 5 && value.length < 9) {
            if (!/[0-9]/.test(key)) {
                e.preventDefault();
                setPanError('Characters 6 to 9 must be numbers.');
            } else {
                setPanError('');
            }
        } else if (value.length === 9) {
            if (!/[A-Z]/i.test(key)) {
                e.preventDefault();
                setPanError('Last character must be a letter.');
            } else {
                setPanError('');
            }
        }
    };

    const handlePanChange = (e) => {
        const { value } = e.target;
        if (value.length <= 10) {
            let upperValue = value.toUpperCase();
            setPan(upperValue);
            validatePan(upperValue);
        }
    };

    const handleDobChange = (e) => {
        const { value } = e.target;
        const today = new Date();
        const selectedDate = new Date(value);
        const maxDate = new Date();
        maxDate.setFullYear(today.getFullYear() - 100);
        if (selectedDate > today) {
            setDobError('Date of birth cannot be in the future.');
        } else if (selectedDate < maxDate) {
            setDobError('Date of birth cannot be more than 100 years ago.');
        } else {
            setDobError('');
            setDob(value);
            const diffTime = Math.abs(today - selectedDate);
            setDaysSinceDob(Math.floor(diffTime / (1000 * 60 * 60 * 24)));
        }
    };

    const today = new Date();
    const maxDate = new Date(today.setFullYear(today.getFullYear() - 100));
    const minDateString = maxDate.toISOString().split('T')[0];
    

    return (
        <div className="form-container">
            <form className="form-card">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Enter your name"
                    />
                </div>
                {nameError && <p className="error-message">{nameError}</p>}
                <div className="form-group">
                    <label htmlFor="rollNo">Roll No:</label>
                    <input
                        type="text"
                        id="rollNo"
                        value={rollNo}
                        onChange={handleRollNoChange}
                        placeholder="Enter your roll number"
                    />
                </div>
                {rollNoError && <p className="error-message">{rollNoError}</p>}
                <div className="form-group">
                    <label htmlFor="pan">PAN Card:</label>
                    <input
                        type="text"
                        id="pan"
                        value={pan}
                        onChange={handlePanChange}
                        onKeyPress={handleKeyPress}
                        placeholder="AAAAA9999A"
                        maxLength="10"
                    />
                </div>
                {panError && <p className="error-message">{panError}</p>}
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth:</label>
                    <input
                        type="date"
                        id="dob"
                        value={dob}
                        onChange={handleDobChange}
                        max={new Date().toISOString().split('T')[0]}
                        min={minDateString}
                    />
                </div>
                {dobError && <p className="error-message">{dobError}</p>}
                {dob && !dobError && <p>Total days: {daysSinceDob}</p>}
            </form>
        </div>
    );
};

export default CustomForm;
