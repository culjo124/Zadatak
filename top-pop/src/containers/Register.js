import React, { useState } from "react";
import validate from "validate.js"
import { Link } from 'react-router-dom'
import "../styles/register.scss"

function Register() {
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({});

    const confirmPassConstraints = {
        confirmPassword: {
            presence: { true: true, message: "^This field is required" },
            equality: {
                attribute: "password",
                message: "^Password doesn't match"
            }
        }
    }

    const constraints = {
        email: {
            presence: { true: true, message: "^This field is required" },
            email: { true: true, message: "^This is not a valide email" }
        },
        password: {
            presence: { true: true, message: "^This field is required" },
            length: {
                minimum: 6,
                message: "^Password needs to be at least 6 characters"
            }
        },
        fullName: {
            presence: { true: true, message: "^This field is required" }
        },
        confirmPassword: {
            presence: { true: true, message: "^This field is required" },
            equality: {
                attribute: "password",
                message: "^Password doesn't match"
            }
        }
    }

    function onClick() {
        validate(values, constraints) ? setErrors(validate(values, constraints)) : alert(
            "Full name: " + values.fullName + "\nEmail: " + values.email
        )
    }
    function handleChange(e) {
        switch (e.target.name) {
            case "fullName":
                setValues({ ...values, fullName: e.target.value })
                break

            case "email":
                setValues({ ...values, email: e.target.value })
                break

            case "password":
                setValues({ ...values, password: e.target.value })
                break

            case "confirmPassword":
                setValues({ ...values, confirmPassword: e.target.value })
                break

            default:
                break
        }
    }

    function handleBlur(e) {
        switch (e.target.name) {
            case "fullName":
                setErrors({ ...errors, fullName: validate.single(values.fullName, constraints.fullName) })
                break

            case "email":
                setErrors({ ...errors, email: validate.single(values.email, constraints.email) })
                break

            case "password":
                setErrors({ ...errors, password: validate.single(values.password, constraints.password) })
                break

            case "confirmPassword":
                const result = validate({ password: values.password, confirmPassword: values.confirmPassword }, confirmPassConstraints)
                if (result === undefined) {
                    setErrors({ ...errors, confirmPassword: result })
                } else {
                    setErrors({ ...errors, confirmPassword: result.confirmPassword })
                }
                break

            default:
                break
        }
    }

    return (
        <div>
            <div className="form-wrapper" >
                <h1>Create Account</h1>
                <form >
                    <div className="input">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            placeholder="Full name"
                            type="text"
                            name="fullName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.fullName && (<span>{errors.fullName}</span>)}
                    </div>
                    <div className="input">
                        <label htmlFor="email">Email</label>
                        <input
                            placeholder="email"
                            type="text"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && (<span>{errors.email}</span>)}
                    </div>
                    <div className="input">
                        <label htmlFor="password">Password</label>
                        <input
                            placeholder="password"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.password && (<span>{errors.password}</span>)}
                    </div>
                    <div className="input">
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input
                            placeholder="password"
                            type="password"
                            onPaste={e => {
                                e.preventDefault()
                                return false
                            }}
                            name="confirmPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.confirmPassword && (<span>{errors.confirmPassword}</span>)}
                    </div>
                </form>
                <div className="createAccount">
                    <button onClick={onClick}>Create Account</button>
                    <Link to='/home' ><button>Home</button></Link>
                    <Link to='/gallery' ><button>Gallery</button></Link>
                </div>
            </div >
        </div>
    );
}

export default Register;