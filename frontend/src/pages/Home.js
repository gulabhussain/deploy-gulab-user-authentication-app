import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import './Home.css';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => navigate('/login'), 1000);
    }

    const fetchProducts = async () => {
        try {
            const url = "http://localhost:3000/products";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json();
            setProducts(result);
        } catch (err) {
            handleError(err);
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className="home-page">
            {/* ===== Header ===== */}
            <header className="home-header">
                <h2>👋 Welcome, <span>{loggedInUser}</span></h2>
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </header>

            {/* ===== Products ===== */}
            <section className="product-section">
                <h3>🛒 Products</h3>

                <div className="product-grid">
                    {products && products.map((item, index) => (
                        <div className="product-card" key={index}>
                            <h4>{item.name}</h4>
                            <p>₹ {item.price}</p>
                        </div>
                    ))}
                </div>
            </section>

            <ToastContainer />
        </div>
    )
}

export default Home;
