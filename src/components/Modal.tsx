import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import Buttons from "./Buttons";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	title?: ReactNode;
	content?: ReactNode;
	actions?: ReactNode;
	size?: "w-xl" | "average" | "big";
};

export default function Modal({
	isOpen,
	onClose,
	title,
	content,
	actions,
	size = "w-xl",
}: ModalProps) {
	const [show, setShow] = useState(false);
	const [animate, setAnimate] = useState(false);

	const sizeClass =
		size === "average" ? "max-w-2xl" : size === "big" ? "max-w-4xl" : size;

	useEffect(() => {
		if (isOpen) {
			setShow(true);
			requestAnimationFrame(() => {
				requestAnimationFrame(() => setAnimate(true));
			});
		} else {
			setAnimate(false);
			const timeout = setTimeout(() => setShow(false), 500);
			return () => clearTimeout(timeout);
		}
	}, [isOpen]);

	if (!show) return null;

	return (
		<div
			onClick={onClose}
			className={`fixed inset-0 z-70 flex items-center justify-center bg-black/70 transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
				animate ? "opacity-100" : "opacity-0 pointer-events-none"
			}`}>
			<div
				onClick={(e) => e.stopPropagation()}
				className={`bg-gray-800 rounded-lg shadow-2xl ${sizeClass} w-full p-6 relative
          transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${
						animate
							? "opacity-100 scale-100 translate-y-0"
							: "opacity-0 scale-90 translate-y-8"
					}
        `}>
				<div className="flex flex-col gap-6">
					{title && (
						<h2 className="text-xl font-bold border-b border-gray-600 pb-3 text-white ">
							{title}
						</h2>
					)}

					{content && (
						<div className="text-white max-h-[60vh] overflow-y-auto pr-2 border-b border-gray-600 pb-3 custom-scrollbar">
							{content}
						</div>
					)}

					<div className="w-fit ml-auto flex gap-2 ">
						{actions}
						<Buttons
							text="Fechar"
							title="Fechar modal"
							onClick={onClose}
							variant="default"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
