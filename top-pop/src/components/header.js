import React from 'react';
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div>
            <Link to="/Home">
                <button style={{ color: "black", backgroundColor: "transparent" }}>
                    HOME
          </button>
            </Link>
            <Link to="/Gallery">
                <button style={{ color: "black", backgroundColor: "transparent" }}>
                    GALLERY
          </button>
            </Link>
            <Link to="/Register">
                <button style={{ color: "black", backgroundColor: "transparent" }}>
                    REGISTER
          </button>
            </Link>
        </div>)

}