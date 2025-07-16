import type { ReactNode } from "react";

export type Header<T> = {
	label: string;
	key: keyof T;
};

type TableProps<T> = {
	headers: Header<T>[];
	data?: T[];
	renderActions?: (row: T) => ReactNode;
};

export default function Table<T>({
	headers,
	data = [],
	renderActions,
}: TableProps<T>) {
	return (
		<div className="w-full overflow-x-auto">
			<table className="w-full table-auto border-collapse rounded-lg overflow-hidden">
				{data.length > 0 && (
					<thead className="bg-gray-900 ">
						<tr>
							{headers.map((header, idx) => (
								<th
									key={idx}
									className="px-4 py-3 text-left font-semibold text-sm text-white border-b">
									{header.label}
								</th>
							))}
							{renderActions && (
								<th className="px-4 py-3 text-left font-semibold text-sm text-white border-b">
									Ações
								</th>
							)}
						</tr>
					</thead>
				)}
				<tbody>
					{data.length === 0 ? (
						<tr>
							<td
								colSpan={headers.length + (renderActions ? 1 : 0)}
								className="text-left py-4 text-white font-semibold  text-base">
								Nenhum projeto cadastrado.
							</td>
						</tr>
					) : (
						data.map((row, rowIndex) => (
							<tr
								key={rowIndex}
								className={`${
									rowIndex % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
								} border-b`}>
								{headers.map((header, cellIndex) => (
									<td
										key={cellIndex}
										className="px-4 py-3 text-sm text-black dark:text-white">
										{row[header.key] as ReactNode}
									</td>
								))}
								{renderActions && (
									<td className="px-4 py-3">{renderActions(row)}</td>
								)}
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}
