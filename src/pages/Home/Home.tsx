import Container from "../../components/Container";
import Sidebar from "../../components/Sidebar";

export default function Home() {
	return (
		<>
			<Sidebar />
			<Container
				title="Bem-vindo(a) à lista de projetos!"
				subtitle="Aqui você pode visualizar, editar e excluir os projetos cadastrados.">
				<p>teste</p>
			</Container>
		</>
	);
}
