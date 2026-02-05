import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
    PageWrapper,
    CenterContainer,
    LeftSection,
    RightSection,
} from "../styles/Home.styles";
import ImageSlider from "../components/ImageSlider";
import { useState } from "react";

import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";


const Home = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState("login");




    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard", { replace: true });
        }
    }, [navigate]);

    return (
        <PageWrapper>
            <CenterContainer>
                <LeftSection>
                    <ImageSlider />

                </LeftSection>


                <RightSection>
                    <div>
                        <h1>Ticket Management System</h1>

                        {mode === "login" ? (
                            <>
                                <p>Sign in to continue</p>

                              <LoginForm onSuccess={() => navigate("/dashboard")} />


                                <p style={{ marginTop: 24 }}>
                                    Don’t have an account?{" "}
                                    <span
                                        style={{ cursor: "pointer", textDecoration: "underline" }}
                                        onClick={() => setMode("register")}
                                    >
                                        Register
                                    </span>
                                </p>
                            </>
                        ) : (
                            <>
                                <p>Create a new account</p>

                                <RegisterForm onSuccess={() => setMode("login")} />

                                <p style={{ marginTop: 24 }}>
                                    Already have an account?{" "}
                                    <span
                                        style={{ cursor: "pointer", textDecoration: "underline" }}
                                        onClick={() => setMode("login")}
                                    >
                                        Login
                                    </span>
                                </p>
                            </>
                        )}
                    </div>
                </RightSection>
            </CenterContainer>
        </PageWrapper>

    );
};

export default Home;
