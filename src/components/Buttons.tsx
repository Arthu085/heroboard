type ButtonsProps = {
	variant?: "primary" | "info" | "success" | "warning" | "default";
	text: string;
	disabled?: boolean;
	title?: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
};

export default function Buttons({
	variant = "default",
	text,
	title,
	onClick,
	type = "button",
	disabled = false,
}: ButtonsProps) {
	let bgClass = "";
	let hoverClass = "";

	switch (variant) {
		case "primary":
			bgClass = "bg-blue-500";
			hoverClass = "hover:bg-blue-700";
			break;

		case "info":
			bgClass = "bg-sky-700";
			hoverClass = "hover:bg-sky-900";
			break;
		case "success":
			bgClass = "bg-green-700";
			hoverClass = "hover:bg-green-900";
			break;
		case "warning":
			bgClass = "bg-red-600";
			hoverClass = "hover:bg-red-800";
			break;
		default:
			bgClass = "bg-gray-500";
			hoverClass = "hover:bg-gray-700";
	}

	const disabledClass = "bg-gray-400 cursor-not-allowed hover:bg-gray-400";

	return (
		<button
			type={type}
			title={title}
			className={`${
				disabled ? disabledClass : bgClass + " " + hoverClass
			} text-white px-4 py-2 rounded transition-colors duration-200 cursor-pointer w-full`}
			onClick={disabled ? undefined : onClick}
			disabled={disabled}>
			{disabled ? "Carregando..." : text}
		</button>
	);
}
