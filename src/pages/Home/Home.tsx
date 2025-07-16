import { useEffect, useState } from "react";
import { findAllProjects } from "../../api/projectsApi";

import Buttons from "../../components/Buttons";
import Container from "../../components/Container";
import Sidebar from "../../components/Sidebar";
import Table, { type Header } from "../../components/Table";
import DeleteModal from "./DeleteModal";

export default function Home() {
	type Project = {
		id: number;
		name: string;
		description: string;
		responsible: string;
		status: string;
	};

	const [projects, setProjects] = useState<Project[]>([]);
	const [message, setMessage] = useState("");
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
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
		try {
			const response = await findAllProjects();
			const projectsWithTranslatedStatus = response.data.map((project) => ({
				...project,
				status: statusMap[project.status] || project.status,
			}));
			setProjects(projectsWithTranslatedStatus);

			setMessage(response.message);
		} catch (error: any) {
			alert(error.message || "Erro ao carregar projetos");
		}
	};

	useEffect(() => {
		loadProjects();
	}, []);

	function handleOpenDelete(id: number) {
		setOpenDeleteModal(true);
		setIdProject(id);
	}

	function handleCloseDelete() {
		setOpenDeleteModal(false);
	}

	return (
		<>
			<Sidebar />
			<Container
				title="Bem-vindo(a) à lista de projetos!"
				subtitle="Aqui você pode visualizar, editar e excluir os projetos cadastrados.">
				<Table
					headers={headers}
					data={projects}
					renderActions={(row) => (
						<div className="flex flex-row gap-3">
							<Buttons text="Editar" title="Editar projeto" variant="primary" />
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
			<DeleteModal
				openDeleteModal={openDeleteModal}
				closeDeleteModal={handleCloseDelete}
				idProject={idProject}
				onSuccess={loadProjects}
			/>
		</>
	);
}
