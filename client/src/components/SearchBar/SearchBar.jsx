import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import "./SearchBar.css";

export default function SearchBar({ handleSearch }) {
	const [input, setInput] = useState("");
	const [queryType, setQueryType] = useState("tweet");

	return (
		<Card className="search-container">
			<Card.Body className="search-bar">
				<h3>
					Searching
					{queryType === "tweet"
						? " tweets by keyword"
						: " twitter acounts by username"}
					.
				</h3>
				<div key={`inline-checkbox}`} className="mb-3">
					<Form.Check
						inline
						label="By Tweet"
						name="tweet"
						type="radio"
						id={`inline-checkbox-1`}
						checked={queryType === "tweet"}
						onChange={(e) => setQueryType(e.target.name)}
					/>
					<Form.Check
						inline
						label="By Username"
						name="username"
						type="radio"
						id={`inline-checkbox-2`}
						checked={queryType === "username"}
						onChange={(e) => setQueryType(e.target.name)}
					/>
				</div>
				<InputGroup>
					<Form.Control
						placeholder={queryType === "tweet" ? "Keyword" : "Username"}
						aria-label="Twitter User"
						aria-describedby="twitter-user"
						value={input || ""}
						onChange={(e) => setInput(e.target.value)}
					/>
					<Button
						onClick={() => handleSearch(queryType, input)}
						variant="secondary"
						size="lg"
					>
						Search
					</Button>
				</InputGroup>
			</Card.Body>
		</Card>
	);
}
