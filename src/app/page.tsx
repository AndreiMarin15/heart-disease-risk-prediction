"use client";

import { FormTable } from "@/components/app_components/form-table";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { handler } from "./lib/agent";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
	const { toast } = useToast();
	const [fields, setValues] = React.useState([
		{
			field: "Gender",
			value: "",
			id: 1,
		},
		{
			field: "Age",
			value: "",
			id: 2,
		},
		{
			field: "Smoker",
			value: "",
			id: 3,
		},
		{
			field: "Cigarettes per day",
			value: "",
			id: 4,
		},
		{
			field: "Blood Pressure Medication",
			value: "",
			id: 5,
		},
		{
			field: "Diabetes",
			value: "",
			id: 6,
		},
		{
			field: "Cholesterol",
			value: "",
			id: 7,
		},
		{
			field: "Systolic Blood Pressure",
			value: "",
			id: 8,
		},
		{
			field: "Diastolic Blood Pressure",
			value: "",
			id: 9,
		},
		{
			field: "BMI",
			value: "",
			id: 10,
		},
		{
			field: "Heart Rate",
			value: "",
			id: 11,
		},
		{
			field: "Glucose",
			value: "",
			id: 12,
		},
	]);

	function setValue(id: number, newValue: string) {
		setValues(fields.map((field) => (field.id === id ? { ...field, value: newValue } : field)));
	}

	React.useEffect(() => {
		console.log(fields);
	}, [fields]);

	return (
		<div className="flex flex-col items-center justify-center gap-10">
			<div className="w-full border rounded-lg py-5 px-1shadow-2xl">
				<ScrollArea className="h-[36rem] px-10">
					<FormTable fields={fields} setValues={setValue} />
				</ScrollArea>
			</div>
			<div
				className="w-40 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center shadow-2xl cursor-pointer"
				onClick={async () => {
					console.log("clicked");
					// console.log(await handler.predictBingChat(fields));
					const data = await handler.predictBard(fields);

					toast({
						title: "Diabetes Rate: ",
						description: data,
					});
				}}
			>
				Predict
			</div>
		</div>
	);
}
