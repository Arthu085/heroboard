import { createContext, useState, useCallback, useRef, useEffect } from "react";
import { useLoading } from "../hooks/useLoading";
import type { ReactNode } from "react";

import ToastContainer from "../components/Toast";

// Tipos de toast permitidos
type ToastType = "success" | "error" | "warning" | "info";

// Estrutura de um toast
type Toast = {
	id: number;
	message: string;
	type: ToastType;
};

// Interface do contexto
type ToastContextType = {
	addToast: (message: string, type?: ToastType) => void;
};

// Criação do contexto com valor default vazio
export const ToastContext = createContext<ToastContextType>({
	addToast: () => {},
});

type ToastProviderProps = {
	children: ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
	const [toasts, setToasts] = useState<Toast[]>([]);
	const { isLoading } = useLoading();
	const timeoutRefs = useRef<Map<number, ReturnType<typeof setTimeout>>>(
		new Map()
	);

	const addToast = useCallback(
		(message: string, type: ToastType = "success") => {
			const id = Date.now();
			setToasts((prev) => [...prev, { id, message, type }]);

			const timeoutId = setTimeout(() => {
				setToasts((prev) => prev.filter((toast) => toast.id !== id));
				timeoutRefs.current.delete(id);
			}, 5000);

			timeoutRefs.current.set(id, timeoutId);
		},
		[]
	);

	useEffect(() => {
		if (isLoading) {
			timeoutRefs.current.forEach((timeoutId) => clearTimeout(timeoutId));
		} else {
			setToasts((currentToasts) => {
				currentToasts.forEach((toast) => {
					if (!timeoutRefs.current.has(toast.id)) {
						const timeoutId = setTimeout(() => {
							setToasts((prev) => prev.filter((t) => t.id !== toast.id));
							timeoutRefs.current.delete(toast.id);
						}, 5000);
						timeoutRefs.current.set(toast.id, timeoutId);
					}
				});
				return currentToasts;
			});
		}
	}, [isLoading]);

	return (
		<ToastContext.Provider value={{ addToast }}>
			{children}
			{!isLoading && <ToastContainer toasts={toasts} />}
		</ToastContext.Provider>
	);
}
