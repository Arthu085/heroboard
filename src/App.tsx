import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home/Home";
import NewProject from "./pages/NewProject/NewProject";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/new" element={<NewProject />} />
			</Routes>
		</Router>
	);
}

export default App;
