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
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const [statusFilter, setStatusFilter] = useState<string | undefined>(
		undefined,
	);

	const limit: number = 7;

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
			let response;

			if (statusFilter) {
				response = await findAllProjects(undefined, undefined, statusFilter);
			} else {
				response = await findAllProjects(page, limit, undefined);
			}

			const projectsArray = response.data.data;

			if (projectsArray.length === 0) {
				if (statusFilter) {
					addToast("Nenhum projeto para o filtro selecionado", "info");
				} else {
					addToast("Nenhum projeto cadastrado", "info");
				}
				setProjects([]);
				setTotal(0);
				return;
			}

			const projectsWithTranslatedStatus = projectsArray.map((project) => ({
				...project,
				status: statusMap[project.status] || project.status,
			}));

			setProjects(projectsWithTranslatedStatus);
			setTotal(response.data.total || projectsArray.length); // fallback para quando não vier total
		} catch (error: any) {
			addToast(error.message || "Erro ao carregar projetos", "error");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		loadProjects();
	}, [page, limit, statusFilter]);

	const totalPages = Math.ceil(total / limit);

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

	const handlePrevPage = () => {
		if (page > 1) setPage(page - 1);
	};

	const handleNextPage = () => {
		if (page < totalPages) setPage(page + 1);
	};

	const isPrevDisabled = page <= 1;
	const isNextDisabled = page >= totalPages;

	return (
		<>
			{isLoading && <LoadingScreen />}
			<Sidebar />
			<Container
				title="Bem-vindo(a) à lista de projetos!"
				subtitle="Aqui você pode visualizar, editar e excluir os projetos cadastrados.">
				<form className="mb-6">
					<label htmlFor="filter" className="mr-2 font-semibold text-white">
						Filtro por status:
					</label>
					<select
						id="filter"
						name="filter"
						value={statusFilter || ""}
						onChange={(e) => {
							setPage(1);
							setStatusFilter(e.target.value || undefined);
						}}
						className="bg-black text-white border border-gray-600 rounded px-3 py-2 transition-all duration-200 ease-in-out hover:border-white focus:outline-none focus:ring-2 focus:ring-white">
						<option value="">Todos</option>
						<option value="pending">Pendente</option>
						<option value="in_progress">Em andamento</option>
						<option value="completed">Concluído</option>
					</select>
				</form>

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
				{!statusFilter && (
					<div className="flex flex-row gap-5 mt-5 w-[300px] h-10 ml-auto">
						<Buttons
							disabled={isPrevDisabled}
							onClick={handlePrevPage}
							variant="info"
							text="Anterior"
							title="Página anterior"
							disabledText="Anterior"
						/>
						<span>
							Página {page} de {totalPages}
						</span>
						<Buttons
							disabled={isNextDisabled}
							onClick={handleNextPage}
							variant="info"
							text="Próxima"
							title="Próxima página"
							disabledText="Próxima"
						/>
					</div>
				)}
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
