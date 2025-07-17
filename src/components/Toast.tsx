import { AnimatePresence, motion } from "framer-motion";

type ToastType = "success" | "error" | "warning" | "info";

type ToastItem = {
	id: string | number;
	type: ToastType;
	message: string;
};

type ToastProps = {
	toasts: ToastItem[];
};

export default function Toast({ toasts }: ToastProps) {
	return (
		<div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-70 space-y-2">
			<AnimatePresence>
				{toasts.map((toast) => (
					<motion.div
						key={toast.id}
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 40 }}
						transition={{ duration: 0.3 }}
						className={`px-4 py-2 rounded shadow text-white transition-all
              ${
								toast.type === "success"
									? "bg-green-600"
									: toast.type === "error"
									? "bg-red-500"
									: toast.type === "warning"
									? "bg-yellow-700"
									: "bg-blue-500"
							}`}>
						{toast.message}
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
}
