import { useState } from "react";
import { deleteProject } from "../../api/projectsApi";
import { useLoading } from "../../hooks/useLoading";
import { useToast } from "../../hooks/useToast";

import Buttons from "../../components/Buttons";
import Modal from "../../components/Modal";
import LoadingScreen from "../../components/LoadingScreen";

type ModalDeleteProps = {
	openDeleteModal: boolean;
	closeDeleteModal: () => void;
	idProject: number | null;
	onSuccess: () => void;
};

export default function DeleteProjectModal({
	openDeleteModal,
	closeDeleteModal,
	idProject,
	onSuccess,
}: ModalDeleteProps) {
	const { isLoading, setIsLoading } = useLoading();
	const { addToast } = useToast();

	const [disabled, setDisabled] = useState(false);

	const handleDeleteProject = async () => {
		setDisabled(true);
		setIsLoading(true);

		try {
			if (!idProject) return;
			const response = await deleteProject(idProject);
			addToast(response.message, "success");
			onSuccess();
			closeDeleteModal();
		} catch (error: any) {
			addToast(error.message || "Erro ao excluir projeto", "error");
		} finally {
			setDisabled(false);
			setIsLoading(false);
		}
	};

	return (
		<>
			{isLoading && <LoadingScreen />}
			<Modal
				isOpen={openDeleteModal}
				onClose={closeDeleteModal}
				title={`Excluir projeto de nº ${idProject}`}
				content="Tem certeza que deseja excluir o projeto?"
				actions={
					<>
						<Buttons
							text="Excluir"
							variant="warning"
							disabled={disabled}
							onClick={() => handleDeleteProject()}
						/>
					</>
				}
			/>
		</>
	);
}
