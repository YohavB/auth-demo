import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            Home 
            <div>
                <Link to="/login">Log in</Link>
            </div>
        </div>
    )
}
