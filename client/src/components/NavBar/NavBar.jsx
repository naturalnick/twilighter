import React from "react";
import { Outlet, Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavBar.css";

export default function NavBar() {
	return (
		<>
			<Navbar className="NavBar" expand="md">
				<Container>
					<Navbar.Brand>
						<Link className="title-link" to="/">
							<h1>Twilighter</h1>
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav mg={6} className="ms-auto">
							<Link className="link" to="/search">
								Search
							</Link>
							<Link className="link" to="/random">
								Random
							</Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<div className="main">
				<Outlet />
			</div>
		</>
	);
}
