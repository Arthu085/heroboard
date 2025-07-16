import { createContext, useState } from "react";
import type { ReactNode } from "react";

// Definindo o tipo do contexto
type LoadingContextType = {
	isLoading: boolean;
	setIsLoading: (value: boolean) => void;
};

// Criando o contexto com valor inicial undefined (tratado no hook)
export const LoadingContext = createContext<LoadingContextType | undefined>(
	undefined
);

// Tipagem das props do provider
type LoadingProviderProps = {
	children: ReactNode;
};

// Provider
export const LoadingProvider = ({ children }: LoadingProviderProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	return (
		<LoadingContext.Provider value={{ isLoading, setIsLoading }}>
			{children}
		</LoadingContext.Provider>
	);
};
