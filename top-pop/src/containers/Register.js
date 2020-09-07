import React, { useState, useRef } from "react";
import validate from "validate.js"

function Register() {
    const formref = useRef();
    const [errors, setErrors] = useState({});

    var constraints = {
        email: {
            presence: true,
            email: true
        },
        password: {
            presence: true,
            length: {
                minimum: 6
            }
        },
        confirmPassword: {
            presence: true,
            equality: {
                attribute: "password",
                message: "^The passwords does not match"
            }
        },
        fullName: {
            presence: true
        }
    }

    function onClick() {
        validate(formref.current, constraints) ? setErrors(validate(formref.current, constraints)) : alert("SUCCESS")
    }

    return (
        <div className="form-wrapper">
            <h1>Create Account</h1>
            <form ref={formref}>
                <div className="fullName">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        placeholder="Full name"
                        type="text"
                        name="fullName"
                    />
                    {errors.fullName && (<span>{errors.fullName}</span>)}
                </div>
                <div className="email">
                    <label htmlFor="email">Email</label>
                    <input
                        placeholder="email"
                        type="text"
                        name="email"
                    />
                    {errors.email && (<span>{errors.email}</span>)}
                </div>
                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input
                        placeholder="password"
                        type="password"
                        name="password"
                    />
                    {errors.password && (<span>{errors.password}</span>)}
                </div>
                <div className="confirmPassword">
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input
                        placeholder="password"
                        type="password"
                        name="confirmPassword"
                    />
                    {errors.confirmPassword && (<span>{errors.confirmPassword}</span>)}
                </div>
            </form>
            <div className="createAccount">
                <button onClick={onClick}>Create Account</button>
            </div>

        </div>
    );
}

export default Register;