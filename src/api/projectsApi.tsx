import api from "../services/api";

type Project = {
	id: number;
	name: string;
	description: string;
	responsible: string;
	status: string;
};

type FindAllProjectsResponse = {
	message: string;
	data: Project[];
};

type DeleteProjectResponse = {
	message: string;
};

export async function createProject(
	name: string,
	description: string,
	responsible: string,
): Promise<Project> {
	try {
		const response = await api.post("/projects", {
			name,
			description,
			responsible,
		});
		return response.data;
	} catch (error: any) {
		throw error.response?.data || { message: "Erro de conexão" };
	}
}

export async function findAllProjects(): Promise<FindAllProjectsResponse> {
	try {
		const response = await api.get("/projects");
		return {
			message: response.data.message,
			data: response.data.data,
		};
	} catch (error: any) {
		throw error.response?.data || { message: "Erro de conexão" };
	}
}

export async function deleteProject(
	id: number,
): Promise<DeleteProjectResponse> {
	try {
		const response = await api.delete(`/projects/${id}`);
		return {
			message: response.data.message,
		};
	} catch (error: any) {
		throw error.response?.data || { message: "Erro de conexão" };
	}
}
