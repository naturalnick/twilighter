import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/esm/Spinner";

import "./SearchBar.css";

export default function SearchBar({ getTweets, isLoading }) {
	const [input, setInput] = useState("");
	const [queryType, setQueryType] = useState("tweet");

	function handleChange(e) {
		if (
			isLetter(e.nativeEvent.data) ||
			!isNaN(e.nativeEvent.data) ||
			e.nativeEvent === "_"
		) {
			queryType === "username"
				? setInput(formatUsername(e.target.value))
				: setInput(e.target.value);
		} else if (
			isAllowedSpecialCharacter(e.nativeEvent.data) &&
			queryType === "tweet"
		) {
			setInput(e.target.value);
		}
	}

	function handleKeyDown(e) {
		if (e.key === "Enter") {
			handleClick();
		}
	}

	function handleRadio(e) {
		if (e.target.name === "username")
			setInput((prevInput) => formatUsername(prevInput));

		setQueryType(e.target.name);
	}

	function handleClick() {
		setInput((prevInput) => prevInput.trim());
		getTweets(queryType, input.trim());
	}

	function formatUsername(text) {
		let username = text.split(" ").join("");
		username = username.split("#").join("");
		username = username.split("@").join("");
		return username;
	}

	function isLetter(char) {
		return char === null || char.toLowerCase() !== char.toUpperCase();
	}

	function isAllowedSpecialCharacter(char) {
		return char === "#" || char === "@";
	}
	return (
		<div>
			<Card border="primary" className="search-container p-3">
				<Card.Body>
					<Card.Title className="search-card-title">
						Searching
						{queryType === "tweet"
							? " tweets by keyword or phrase"
							: " twitter acounts by username"}
						.
					</Card.Title>
					<div key={`inline-checkbox}`} className="mb-3">
						<Form.Check
							inline
							label="By Tweet"
							name="tweet"
							type="radio"
							id={`inline-checkbox-1`}
							checked={queryType === "tweet"}
							onChange={handleRadio}
						/>
						<Form.Check
							inline
							label="By Username"
							name="username"
							type="radio"
							id={`inline-checkbox-2`}
							checked={queryType === "username"}
							onChange={handleRadio}
						/>
					</div>
					<InputGroup className="mb-2">
						<Form.Control
							placeholder={
								queryType === "tweet" ? "Keyword" : "Username"
							}
							aria-label="Twitter User"
							aria-describedby="twitter-user"
							type="text"
							value={input || ""}
							onChange={handleChange}
							onKeyDown={handleKeyDown}
						/>
						<Button
							className="search-btn"
							onClick={handleClick}
							disabled={isLoading}
							variant="primary"
							size="lg"
						>
							Search
						</Button>
					</InputGroup>
					<Form.Text>
						{queryType === "tweet"
							? "Alphanumeric characters (letters A-Z, numbers 0-9) # and @"
							: "Alphanumeric characters only (letters A-Z, numbers 0-9). No spaces. Must be exact match to twitter username / handle."}
					</Form.Text>
				</Card.Body>
			</Card>
			{isLoading ? (
				<Spinner className="spinner" animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			) : (
				<></>
			)}
		</div>
	);
}
