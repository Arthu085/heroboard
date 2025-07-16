import { useState } from "react";
import { createProject } from "../../api/projectsApi";
import { useLoading } from "../../hooks/useLoading";
import { useToast } from "../../hooks/useToast";

import Container from "../../components/Container";
import Sidebar from "../../components/Sidebar";
import Form from "../../components/Form";
import LoadingScreen from "../../components/LoadingScreen";

export default function NewProject() {
	const { isLoading, setIsLoading } = useLoading();
	const { addToast } = useToast();

	const [formData, setFormData] = useState({
		name: "",
		description: "",
		responsible: "",
	});
	const [disabled, setDisabled] = useState(false);

	const fields = [
		{
			name: "name",
			label: "Nome do Projeto",
			placeholder: "Digite o nome",
		},
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

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setDisabled(true);
		setIsLoading(true);

		try {
			const response = await createProject(
				formData.name,
				formData.description,
				formData.responsible
			);

			setFormData({ name: "", description: "", responsible: "" });
			addToast(response.message, "success");
		} catch (error: any) {
			addToast(error.message || "Erro ao criar projeto", "error");
		} finally {
			setDisabled(false);
			setIsLoading(false);
		}
	};

	return (
		<>
			{isLoading && <LoadingScreen />}
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
					required={true}
				/>
			</Container>
		</>
	);
}
