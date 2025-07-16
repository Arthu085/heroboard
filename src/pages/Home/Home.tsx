import { useEffect, useState } from "react";
import { findAllProjects } from "../../api/projectsApi";
import { useLoading } from "../../hooks/useLoading";
import { useToast } from "../../hooks/useToast";

import Buttons from "../../components/Buttons";
import Container from "../../components/Container";
import Sidebar from "../../components/Sidebar";
import Table, { type Header } from "../../components/Table";
import DeleteProjectModal from "./DeleteProjectModal";
import UpdateProjectModal from "./UpdateProjectModal";
import LoadingScreen from "../../components/LoadingScreen";

export default function Home() {
	type Project = {
		id: number;
		name: string;
		description: string;
		responsible: string;
		status: string;
	};

	const { isLoading, setIsLoading } = useLoading();
	const { addToast } = useToast();

	const [projects, setProjects] = useState<Project[]>([]);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [openUpdateModal, setOpenUpdateModal] = useState(false);
	const [idProject, setIdProject] = useState<number | null>(null);

	const headers: Header<Project>[] = [
		{ label: "Nome", key: "name" },
		{ label: "Descrição", key: "description" },
		{ label: "Responsável", key: "responsible" },
		{ label: "Status", key: "status" },
	];

	const statusMap: Record<string, string> = {
		pending: "Pendente",
		in_progress: "Em andamento",
		completed: "Concluído",
	};

	const loadProjects = async () => {
		setIsLoading(true);

		try {
			const response = await findAllProjects();
			const projectsWithTranslatedStatus = response.data.map((project) => ({
				...project,
				status: statusMap[project.status] || project.status,
			}));
			setProjects(projectsWithTranslatedStatus);
		} catch (error: any) {
			addToast(error.message || "Erro ao carregar projetos", "error");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		loadProjects();
	}, []);

	const selectedProject = projects.find((p) => p.id === idProject) ?? null;

	function handleOpenDelete(id: number) {
		setOpenDeleteModal(true);
		setIdProject(id);
	}

	function handleCloseDelete() {
		setOpenDeleteModal(false);
	}

	function handleOpenUpdate(id: number) {
		setOpenUpdateModal(true);
		setIdProject(id);
	}

	function handleCloseUpdate() {
		setOpenUpdateModal(false);
	}

	return (
		<>
			{isLoading && <LoadingScreen />}
			<Sidebar />
			<Container
				title="Bem-vindo(a) à lista de projetos!"
				subtitle="Aqui você pode visualizar, editar e excluir os projetos cadastrados.">
				<Table
					headers={headers}
					data={projects}
					renderActions={(row) => (
						<div className="flex flex-row gap-3">
							<Buttons
								text="Editar"
								title="Editar projeto"
								variant="primary"
								onClick={() => handleOpenUpdate(row.id)}
							/>
							<Buttons
								text="Excluir"
								title="Excluir projeto"
								variant="warning"
								onClick={() => handleOpenDelete(row.id)}
							/>
						</div>
					)}
				/>
			</Container>
			<DeleteProjectModal
				openDeleteModal={openDeleteModal}
				closeDeleteModal={handleCloseDelete}
				idProject={idProject}
				onSuccess={loadProjects}
			/>
			<UpdateProjectModal
				openUpdateModal={openUpdateModal}
				closeUpdateModal={handleCloseUpdate}
				project={selectedProject}
				onSuccess={loadProjects}
			/>
		</>
	);
}
