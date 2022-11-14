import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./Hero.css";

export default function Hero() {
	return (
		<Container>
			<Row>
				<Col md={12} className="pb-3">
					<Card className="hero-card">
						<Card.Body>
							<Card.Title className="mt-4">
								<span className="cta">Tweet searching simplified.</span>
							</Card.Title>

							<Card.Text className="mt-3 mb-3">
								Twilighter's search engine filters and displays tweets
								without all the ads, notifications and clutter. No
								log-in needed and it's free.
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Row className="mt-3">
				<Col md={6} className="pb-3">
					<Card>
						<Card.Body>
							<Card.Title className="card-title-sub">
								<img
									alt=""
									src={require("../../assets/images/search.png")}
									width="30"
									height="30"
								/>
								{"  "}
								Search Tweets
							</Card.Title>
							<hr />
							<Card.Text className="mb-4">
								Enter a keyword or your favorite twitter account's
								username to see most recent tweets.
							</Card.Text>
							<Link to="/search">
								<div className="d-grid">
									<Button variant="info" size="lg">
										Search
									</Button>
								</div>
							</Link>
						</Card.Body>
					</Card>
				</Col>

				<Col md={6}>
					<Card>
						<Card.Body>
							<Card.Title className="card-title-sub">
								<img
									alt="random"
									src={require("../../assets/images/shuffle.png")}
									width="30"
									height="30"
								/>{" "}
								Random Tweet Generator
							</Card.Title>
							<hr />
							<Card.Text className="mb-4">
								Or use the tweet-randomizer to pull a random tweet from
								some of our favorite Twitter accounts.
							</Card.Text>
							<Link to="/random">
								<div className="d-grid">
									<Button
										className="search-btn"
										variant="light"
										size="lg"
									>
										Randomize
									</Button>
								</div>
							</Link>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}
