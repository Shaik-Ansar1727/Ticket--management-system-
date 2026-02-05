import React from 'react'
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";



const Sidebar = () => {
    const { role, loading } = useAuth();
    if (loading) return null;

    const isAdmin = role === "ADMIN";

    return (
        <aside className="hidden md:block w-64 bg-gray-900 text-white min-h-screen shrink-0">


            <div className="px-6 py-5 border-b border-gray-700">
                <h1 className="text-lg font-semibold">
                    Ticket Management
                </h1>
            </div>


            <nav className="px-4 py-6">
                <ul className="space-y-2">
                    <li>
                        <Link
                            to="profile"
                            className="block rounded px-4 py-2 hover:bg-gray-800"
                        >
                            My Profile
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="tickets"
                            className="block rounded px-4 py-2 hover:bg-gray-800"
                        >
                            Tickets
                        </Link>
                    </li>

                    {role !== "ADMIN" && (
                        <li>
                            <Link
                                to="my-tickets"
                                className="block rounded px-4 py-2 hover:bg-gray-800"
                            >
                                My Tickets
                            </Link>
                        </li>
                    )}


                    {isAdmin && (
                        <>


                            <li>
                                <Link
                                    to="create-ticket"
                                    className="block rounded px-4 py-2 hover:bg-gray-800"
                                >
                                    Create Ticket
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="admin/users"
                                    className="block rounded px-4 py-2 hover:bg-gray-800"
                                >
                                    Pending Users
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="admin/all-users"
                                    className="block rounded px-4 py-2 hover:bg-gray-800"
                                >
                                    All Users
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </aside>
    );

}

export default Sidebar
