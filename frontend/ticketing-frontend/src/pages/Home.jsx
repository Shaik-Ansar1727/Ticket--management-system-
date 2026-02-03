import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Home = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            navigate("/dashboard", { replace: true })
        }
    }, [navigate])

    return (
        <div>
            <h1>Ticket Management System</h1>

            <p>Please choose an option</p>

            <div>
                <Link to="/login">Login</Link>
            </div>

            <div>
                <Link to="/register">Register</Link>
            </div>
        </div>
    )
}

export default Home
