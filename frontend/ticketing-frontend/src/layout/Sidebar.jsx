import React from 'react'
import { Link } from "react-router-dom"

const role = localStorage.getItem("role");
const isAdmin = role === "ADMIN";

const Sidebar = () => {
    return (
        <div>
            <h1>Ticket Management System</h1>

            <nav>
                <ul>
                    <li>
                        <Link to="profile">My Profile</Link>
                    </li>

                    <li>
                        <Link to="tickets">Tickets</Link>
                    </li>

                    <li>
                        <Link to="my-tickets">My Tickets</Link>
                    </li>

                    {isAdmin && (
                        <>
                            <li>
                                <Link to="create-ticket">Create Ticket</Link>
                            </li>
                            <li>
                                <Link to="admin/users">Pending Users</Link>
                            </li>
                            <li>
                                <Link to="admin/all-users">All Users</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
