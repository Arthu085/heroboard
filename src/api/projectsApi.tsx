import api from "../services/api";

type Project = {
	id: number;
	name: string;
	description: string;
	responsible: string;
	status: string;
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
