import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./Hero.css";

export default function Hero() {
	return (
		<div className="Hero">
			<Container>
				<Row>
					<Col>
						<h2>All your favorite tweets at your fingertips.</h2>
					</Col>
				</Row>
				<Row>
					<Col>
						<p className="hero-p">
							This is more description. You'll like what you see.
						</p>
					</Col>
				</Row>
				<Row className="mt-5">
					<Col md={6} className="pb-3">
						<Card>
							<Card.Body>
								<p>Search for your favorite twitter account.</p>
								<Link to="/search">
									<Button variant="info" size="lg">
										Search
									</Button>
								</Link>
							</Card.Body>
						</Card>
					</Col>

					<Col md={6}>
						<Card>
							<Card.Body>
								<p>
									Or use the tweet-randomizer to pull a random tweet
									from some of our favorite Twitter accounts.
								</p>
								<Link to="/random">
									<Button
										className="random-btn"
										variant="secondary"
										size="lg"
									>
										Randomize
									</Button>
								</Link>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
