import type { ReactNode } from "react";

import Footer from "./Footer";

type ContainerProps = {
	title: string;
	subtitle: string;
	children: ReactNode;
};

export default function Container({
	children,
	title,
	subtitle,
}: ContainerProps) {
	return (
		<div className="flex flex-col min-h-screen md:ml-58 ml-3 mt-15">
			<main className="flex-grow">
				<h1 className="text-xl font-semibold mb-4 text-left">{title}</h1>
				<h2 className="text-lg  mb-4 text-left">{subtitle}</h2>
				{children}
			</main>
			<Footer />
		</div>
	);
}
