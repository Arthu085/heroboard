import type { FormEvent, ChangeEvent } from "react";

import Buttons from "./Buttons";

type Field = {
	name: string;
	label: string;
	placeholder?: string;
	type?: string;
	options?: { value: string; label: string }[];
};

type SimpleFormProps = {
	fields: Field[];
	values: Record<string, string>;
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
	title?: string;
	buttonText?: string;
	buttonTitle?: string;
	disabled?: boolean;
	hideSubmitButton?: boolean;
	classForm?: string;
	required?: boolean;
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
	hideSubmitButton = false,
	classForm = "bg-gray-900 shadow-md rounded-xl p-6 w-full mt-5 max-w-3xl mx-auto",
	required = false,
}: SimpleFormProps) {
	return (
		<form onSubmit={onSubmit} className={classForm}>
			{title && (
				<h2 className="text-2xl font-bold mb-6 text-center text-white">
					{title}
				</h2>
			)}

			{fields.map(({ name, label, placeholder, type = "text", options }) => (
				<div key={name} className="mb-4">
					<label
						htmlFor={name}
						className="block text-sm font-medium mb-1 text-white">
						{label}
					</label>
					{type === "select" && options ? (
						<select
							id={name}
							name={name}
							value={values[name] || ""}
							onChange={onChange}
							className="w-full border rounded-lg p-2 bg-gray-700 border-gray-700 text-white"
							required={required}>
							<option value="">{placeholder || "Selecione uma opção"}</option>
							{options.map(({ value, label }) => (
								<option key={value} value={value}>
									{label}
								</option>
							))}
						</select>
					) : (
						<input
							id={name}
							name={name}
							type={type}
							value={values[name] || ""}
							onChange={onChange}
							placeholder={placeholder}
							className="w-full border rounded-lg p-2 bg-gray-700 border-gray-700 text-white"
							required={required}
						/>
					)}
				</div>
			))}

			{!hideSubmitButton && (
				<Buttons
					text={buttonText}
					variant="success"
					type="submit"
					title={buttonTitle}
					disabled={disabled}
				/>
			)}
		</form>
	);
}
