import Buttons from "../../components/Buttons";
import Container from "../../components/Container";
import Sidebar from "../../components/Sidebar";
import Table, { type Header } from "../../components/Table";

export default function Home() {
	type Project = {
		id: number;
		name: string;
		description: string;
		responsible: string;
		status: string;
	};

	const headers: Header<Project>[] = [
		{ label: "Nome", key: "name" },
		{ label: "Descrição", key: "description" },
		{ label: "Responsável", key: "responsible" },
		{ label: "Status", key: "status" },
	];

	return (
		<>
			<Sidebar />
			<Container
				title="Bem-vindo(a) à lista de projetos!"
				subtitle="Aqui você pode visualizar, editar e excluir os projetos cadastrados.">
				<Table
					headers={headers}
					// data={data}
					renderActions={(row) => (
						<div className="flex flex-row gap-3">
							<Buttons text="Editar" title="Editar projeto" variant="primary" />
							<Buttons
								text="Excluir"
								title="Excluir projeto"
								variant="warning"
							/>
						</div>
					)}
				/>
			</Container>
		</>
	);
}
