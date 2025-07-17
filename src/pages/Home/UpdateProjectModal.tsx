import { useEffect, useState } from "react";
import { updateProject } from "../../api/projectsApi";
import { useLoading } from "../../hooks/useLoading";
import { useToast } from "../../hooks/useToast";

import Modal from "../../components/Modal";
import Buttons from "../../components/Buttons";
import Form from "../../components/Form";
import LoadingScreen from "../../components/LoadingScreen";

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
	onSuccess,
}: UpdateProjectModalProps) {
	const { isLoading, setIsLoading } = useLoading();
	const { addToast } = useToast();

	const [formData, setFormData] = useState({
		name: "",
		description: "",
		responsible: "",
		status: "",
	});
	const [disabled, setDisabled] = useState(false);

	const statusReverseMap: Record<string, string> = {
		Pendente: "pending",
		"Em andamento": "in_progress",
		Concluído: "completed",
	};

	useEffect(() => {
		if (project && openUpdateModal) {
			setFormData({
				name: project.name,
				description: project.description,
				responsible: project.responsible,
				status: statusReverseMap[project.status] || "",
			});
		}
	}, [project, openUpdateModal]);

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

		// Apenas essa verificação já resolve
		if (formData.status !== statusReverseMap[project.status]) {
			if (formData.status === "") {
				addToast("Selecione um status válido", "warning");
				return;
			}
			updatedFields.status = formData.status;
		}

		// Agora essa verificação funciona corretamente
		if (Object.keys(updatedFields).length === 0) {
			addToast("Nenhuma alteração para salvar", "warning");
			return;
		}

		setDisabled(true);
		setIsLoading(true);

		try {
			const response = await updateProject(
				project.id,
				updatedFields.name,
				updatedFields.description,
				updatedFields.status,
				updatedFields.responsible,
			);

			addToast(response.message, "success");
			await onSuccess();
			closeUpdateModal();
		} catch (error: any) {
			addToast(error.message || "Erro ao atualizar projeto", "error");
		} finally {
			setDisabled(false);
			setIsLoading(false);
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleUpdateProject();
	};

	return (
		<>
			{isLoading && <LoadingScreen />}
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
		</>
	);
}
