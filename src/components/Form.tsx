import type { FormEvent, ChangeEvent } from "react";
import Buttons from "./Buttons";

type Field = {
	name: string;
	label: string;
	placeholder?: string;
	type?: string;
};

type SimpleFormProps = {
	fields: Field[];
	values: Record<string, string>;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
	title?: string;
	buttonText?: string;
	buttonTitle?: string;
	disabled?: boolean;
};

export default function Form({
	fields,
	values,
	onChange,
	onSubmit,
	title = "Formulário",
	buttonText = "Salvar",
	buttonTitle = "Salvar",
	disabled = false,
}: SimpleFormProps) {
	return (
		<form
			onSubmit={onSubmit}
			className="bg-gray-900 shadow-md rounded-xl p-6 w-full mt-5 max-w-3xl mx-auto">
			{title && (
				<h2 className="text-2xl font-bold mb-6 text-center text-white">
					{title}
				</h2>
			)}

			{fields.map(({ name, label, placeholder, type = "text" }) => (
				<div key={name} className="mb-4">
					<label
						htmlFor={name}
						className="block text-sm font-medium mb-1 text-white">
						{label}
					</label>
					<input
						id={name}
						name={name}
						type={type}
						value={values[name] || ""}
						onChange={onChange}
						placeholder={placeholder}
						className="w-full border  rounded-lg p-2 bg-gray-700 border-gray-700 text-white"
						required
					/>
				</div>
			))}

			<Buttons
				text={buttonText}
				variant="success"
				type="submit"
				title={buttonTitle}
				disabled={disabled}
			/>
		</form>
	);
}
