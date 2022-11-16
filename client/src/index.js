import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Random from "./pages/Random";
import NoPage from "./pages/NoPage";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<Home />} />
					<Route path="search" element={<Search />} />
					<Route path="random" element={<Random />} />
					<Route path="*" element={<NoPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
