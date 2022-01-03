import React from "react";
import { Link } from "react-router-dom";
import styles from "style.css";

const Navigation = ({userOb}) => 
        <nav className="Nav">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li>{userOb && <Link to="/profile">{userOb.displayName ? userOb.displayName : "유저"}님 반갑습니다.</Link>}</li>
            </ul>
        </nav>
export default Navigation;