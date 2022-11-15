import { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import SearchBar from "../components/SearchBar/SearchBar";
import Tweet from "../components/Tweet/Tweet";
import "./Search.css";

export default function Search() {
	const [tweets, setTweets] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	async function getTweets(queryType, text) {
		try {
			const response = (
				queryType === "username"
					? await axios.get(
							`http://127.0.0.1:5000/api/user/search?query=${text}`
					  )
					: await axios.get(
							`http://127.0.0.1:5000/api/tweets/search?query=${text}`
					  )
			).data;
			return response;
		} catch (error) {
			if (error.response.status === 404) {
				console.log(error.response.status);
				return undefined;
			}
			return undefined;
		}
	}

	async function handleSearch(queryType, text) {
		setIsLoading(true);
		setTweets(await getTweets(queryType, text));
		setIsLoading(false);
	}

	return (
		<>
			<SearchBar handleSearch={handleSearch} />
			<Container className="mt-2">
				<Row>
					<Col>
						{isLoading ? (
							<Spinner
								className="loading-bar"
								animation="border"
								role="status"
							>
								<span className="visually-hidden">Loading...</span>
							</Spinner>
						) : (
							<></>
						)}
					</Col>
				</Row>
				<Row>
					{tweets !== undefined ? (
						Object.values(tweets).map((tweet) => (
							<Col className="mt-3" xl={6} key={tweet.id}>
								<Tweet {...tweet} />
							</Col>
						))
					) : (
						<Alert className="w-auto m-auto mt-4" variant="warning">
							No results.
						</Alert>
					)}
				</Row>
			</Container>
		</>
	);
}
