import { useState } from "react";
import { deleteProject } from "../../api/projectsApi";

import Buttons from "../../components/Buttons";
import Modal from "../../components/Modal";

type ModalDeleteProps = {
	openDeleteModal: boolean;
	closeDeleteModal: () => void;
	idProject: number | null;
	disabled?: boolean;
	onSuccess: () => void;
};

export default function DeleteModal({
	openDeleteModal,
	closeDeleteModal,
	idProject,
	disabled = false,
	onSuccess,
}: ModalDeleteProps) {
	const [message, setMessage] = useState("");

	const handleDeleteProject = async () => {
		try {
			if (!idProject) return;
			const response = await deleteProject(idProject);
			setMessage(response.message);
			closeDeleteModal();
			onSuccess();
		} catch (error: any) {
			alert(error.message || "Erro ao excluir projeto");
		}
	};

	return (
		<Modal
			isOpen={openDeleteModal}
			onClose={closeDeleteModal}
			title={`Excluir projeto de nº ${idProject}`}
			content="Tem certeza que deseja excluir o projeto?"
			actions={
				<>
					<Buttons
						text="Excluir"
						variant="success"
						disabled={disabled}
						onClick={() => handleDeleteProject()}
					/>
				</>
			}
		/>
	);
}
