import { useEffect, useState } from "react";
import { updateProject } from "../../api/projectsApi";

import Modal from "../../components/Modal";
import Buttons from "../../components/Buttons";
import Form from "../../components/Form";

type UpdateProjectModalProps = {
	openUpdateModal: boolean;
	closeUpdateModal: () => void;
	project: {
		id: number;
		name: string;
		description: string;
		responsible: string;
		status: string;
	} | null;
	disabled?: boolean;
	onSuccess: () => Promise<void>;
};

export default function UpdateProjectModal({
	openUpdateModal,
	closeUpdateModal,
	project,
	disabled = false,
	onSuccess,
}: UpdateProjectModalProps) {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		responsible: "",
		status: "",
	});

	const statusReverseMap: Record<string, string> = {
		Pendente: "pending",
		"Em andamento": "in_progress",
		Concluído: "completed",
	};

	useEffect(() => {
		if (project) {
			setFormData({
				name: project.name,
				description: project.description,
				responsible: project.responsible,
				status: statusReverseMap[project.status] || "",
			});
		}
	}, [project]);

	const fields = [
		{ name: "name", label: "Nome", placeholder: "Digite o nome" },
		{
			name: "description",
			label: "Descrição",
			placeholder: "Digite a descrição",
		},
		{
			name: "responsible",
			label: "Responsável",
			placeholder: "Digite o responsável",
		},
		{
			name: "status",
			label: "Status",
			placeholder: "Selecione o status",
			type: "select",
			options: [
				{ value: "pending", label: "Pendente" },
				{ value: "in_progress", label: "Em andamento" },
				{ value: "completed", label: "Concluído" },
			],
		},
	];

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleUpdateProject = async () => {
		if (!project) return;

		const updatedFields: {
			name?: string;
			description?: string;
			responsible?: string;
			status?: string;
		} = {};

		if (formData.name !== project.name) updatedFields.name = formData.name;
		if (formData.description !== project.description)
			updatedFields.description = formData.description;
		if (formData.responsible !== project.responsible)
			updatedFields.responsible = formData.responsible;
		if (formData.status !== project.status)
			updatedFields.status = formData.status;

		if (formData.status !== project.status) {
			if (formData.status === "") {
				alert("Selecione um status válido");
				return;
			}
			updatedFields.status = formData.status;
		}

		if (Object.keys(updatedFields).length === 0) {
			alert("Nenhuma alteração para salvar");
			return;
		}

		try {
			await updateProject(
				project.id,
				updatedFields.name,
				updatedFields.description,
				updatedFields.status,
				updatedFields.responsible,
			);

			await onSuccess();
			closeUpdateModal();
		} catch (error: any) {
			alert(error.message || "Erro ao atualizar projeto");
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleUpdateProject();
	};

	return (
		<Modal
			size="average"
			isOpen={openUpdateModal}
			onClose={closeUpdateModal}
			title={`Atualizar projeto de nº ${project?.id ?? ""}`}
			content={
				<Form
					fields={fields}
					values={formData}
					onChange={handleChange}
					onSubmit={handleSubmit}
					title=""
					hideSubmitButton={true}
					classForm="w-full mx-auto pl-0.5 pr-0.5"
				/>
			}
			actions={
				<>
					<Buttons
						text="Editar"
						variant="primary"
						disabled={disabled}
						onClick={handleUpdateProject}
					/>
				</>
			}
		/>
	);
}
