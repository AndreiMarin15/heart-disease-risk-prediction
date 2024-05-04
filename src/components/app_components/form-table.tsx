import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export function FormTable({
	setValues,
	fields,
}: {
	setValues: any;
	fields: { field: string; value: string; id: number }[];
}) {
	return (
		<Table>
			<TableCaption>
				{
					"This tool is using AI in order to predict diabetes risk. Please do not consider it a diagnosis as it's not 100% accurate"
				}
			</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px] text-center">Field</TableHead>
					<TableHead className="w-[100px]"></TableHead>
					<TableHead className="text-center">Value</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{fields.map((field) => (
					<TableRow key={field.id}>
						<TableCell className="font-medium  w-[100px]">{field.field}</TableCell>
						<TableCell></TableCell>
						<TableCell className="text-center items-center">
							<Input type="text" onChange={(e) => setValues(field.id, e.target.value)} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
