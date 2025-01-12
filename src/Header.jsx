import { Link } from "react-router";


export default function Header() {
    return (
        <header>
            
            <h1>Henna Rajakisto</h1>
            <h2>Art Portfolio</h2>
            <p>Handmade & digital collages</p>

            <nav>
                <ul className='nav-links-container'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
            
        </header>
    )
    }

        