import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

type MenuItem = {
	label: string;
	page: string;
};

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const menuItems: MenuItem[] = [
		{ label: "Lista de Projetos", page: "" },
		{ label: "Novo Projeto", page: "new" },
	];

	return (
		<>
			{/* Botão para abrir/fechar no mobile */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-700 text-white rounded-lg active:bg-gray-600 transition-colors duration-200">
				{isOpen ? <X size={20} /> : <Menu size={20} />}
			</button>

			<aside
				className={`
					fixed top-0 left-0 h-full z-40
					bg-gray-500 dark:bg-gray-800 rounded-r-3xl
					flex flex-col
					w-full md:w-52 px-6 py-8
					overflow-hidden
					transition-transform duration-300 ease-in-out
					${isOpen ? "translate-x-0" : "-translate-x-full"}
					md:translate-x-0
				`}>
				<h1 className="text-2xl font-bold text-white mt-7 md:mt-4 mb-5 whitespace-nowrap transition-opacity duration-300 opacity-100">
					Hero Board
				</h1>

				<nav className="flex flex-col gap-4 flex-1 max-h-[1000px] overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar">
					{menuItems.map(({ label, page }) => (
						<button
							key={label}
							className="
								text-white flex items-center gap-4 w-full
								hover:text-blue-600 hover:bg-blue-50
								active:bg-blue-100 active:text-blue-600
								rounded-lg transition-colors duration-200 focus:outline-none cursor-pointer px-2 py-3"
							onClick={() => {
								navigate(`/${page}`);
								setIsOpen(false);
							}}>
							<span className="whitespace-nowrap transition-opacity duration-300 opacity-100">
								{label}
							</span>
						</button>
					))}
				</nav>

				<footer className="text-white text-sm whitespace-nowrap transition-opacity duration-300 opacity-100 mb-5">
					© 2025 Hero Board
				</footer>
			</aside>
		</>
	);
}
