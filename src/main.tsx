import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";

import { LoadingProvider } from "./contexts/LoadingContext.tsx";
import { ToastProvider } from "./contexts/ToastContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<LoadingProvider>
			<ToastProvider>
				<App />
			</ToastProvider>
		</LoadingProvider>
	</StrictMode>
);
