import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./Hero.css";

export default function Hero() {
	return (
		<>
			<Row>
				<Col md={12} className="pb-3">
					<Card className="hero-card">
						<Card.Body>
							<Card.Title className="mt-4">
								<span className="cta">Tweet searching simplified.</span>
							</Card.Title>

							<Card.Text className="mt-3 mb-3">
								Twilighter's search engine filters and displays tweets
								without all the ads, notifications and clutter. No login
								is required and it's completely free, so get searching
								and find the tweets you're looking for today.
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
										Start Searching
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
								Tweet Randomizer
							</Card.Title>
							<hr />
							<Card.Text className="mb-4">
								Or use the tweet-randomizer to pull a random tweet from
								some of our favorite Twitter accounts.
							</Card.Text>
							<Link to="/random">
								<div className="d-grid">
									<Button variant="warning" size="lg">
										Randomize
									</Button>
								</div>
							</Link>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
}
