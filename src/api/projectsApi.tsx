import api from "../services/api";

type Project = {
	id: number;
	name: string;
	description: string;
	responsible: string;
	status: string;
	message: string;
};

type PaginatedProjects = {
	data: Project[];
	total: number;
	page: number;
	limit: number;
};

type FindAllProjectsResponse = {
	message: string;
	data: PaginatedProjects;
};

type DeleteProjectResponse = {
	message: string;
};

type UpdateProjectsResponse = {
	message: string;
	data: Project[];
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

export async function findAllProjects(
	page?: number,
	limit?: number,
	status?: string,
): Promise<FindAllProjectsResponse> {
	try {
		const params = new URLSearchParams();

		if (page !== undefined) params.append("page", page.toString());
		if (limit !== undefined) params.append("limit", limit.toString());
		if (status) params.append("status", status);

		const response = await api.get(`/projects?${params.toString()}`);

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

export async function updateProject(
	id: number,
	name?: string,
	description?: string,
	status?: string,
	responsible?: string,
): Promise<UpdateProjectsResponse> {
	try {
		const response = await api.patch(`/projects/${id}`, {
			name,
			description,
			responsible,
			status,
		});
		return {
			message: response.data.message,
			data: response.data.data,
		};
	} catch (error: any) {
		throw error.response?.data || { message: "Erro de conexão" };
	}
}
