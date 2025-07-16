import { useState } from "react";

import Container from "../../components/Container";
import Sidebar from "../../components/Sidebar";
import Form from "../../components/Form";

export default function NewProject() {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		responsible: "",
	});
	const [disabled, setDisabled] = useState(false);

	const fields = [
		{ name: "name", label: "Nome do Projeto", placeholder: "Digite o nome" },
		{
			name: "description",
			label: "Descrição",
			placeholder: "Digite a descrição",
		},
		{
			name: "responsible",
			label: "Responsável (herói)",
			placeholder: "Nome do responsável",
		},
	];

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setDisabled(true);
		console.log(formData);
	};

	return (
		<>
			<Sidebar />
			<Container
				title="Bem-vindo(a) ao cadastro de projetos!"
				subtitle="Aqui você pode cadastrar seus novos projetos.">
				<Form
					fields={fields}
					values={formData}
					onChange={handleChange}
					onSubmit={handleSubmit}
					title="Novo Projeto"
					buttonText="Cadastrar"
					buttonTitle="Cadastrar projeto"
					disabled={disabled}
				/>
			</Container>
		</>
	);
}
