import React from "react";
import { Link, NavLink } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavBar.css";

export default function NavBar() {
	return (
		<Navbar className="NavBar" expand="md">
			<Container>
				<Navbar.Brand>
					<Link className="title-link" to="/">
						<img
							alt=""
							src={require("../../assets/images/logo.png")}
							width="50"
							height="50"
							className="d-inline-block align-top"
						/>{" "}
						Twilighter
					</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav mg={6} className="ms-auto">
						<NavLink
							className={({ isActive }) =>
								isActive ? "active link" : "link"
							}
							to="/"
						>
							Home
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive ? "active link" : "link"
							}
							to="/search"
						>
							Search
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive ? "active link" : "link"
							}
							to="/random"
						>
							Random
						</NavLink>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
