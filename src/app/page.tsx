"use client";

import { FormTable } from "@/components/app_components/form-table";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { handler } from "./lib/agent";

export default function Home() {
	const [fields, setValues] = React.useState([
		{
			field: "Diastoic Blood Pressure",
			value: "",
			id: 1,
		},
		{
			field: "Triceps Skin Fold Thickness",
			value: "",
			id: 2,
		},
		{
			field: "Serum Insulin",
			value: "",
			id: 3,
		},
		{
			field: "BMI",
			value: "",
			id: 4,
		},
		{
			field: "Diabetes Pedigree Function",
			value: "",
			id: 5,
		},
		{
			field: "Age",
			value: "",
			id: 6,
		},
		{
			field: "Pregnancies",
			value: "",
			id: 7,
		},
		{
			field: "Glucose",
			value: "",
			id: 8,
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
			<div className="w-full border rounded-lg p-5 shadow-2xl">
				<FormTable fields={fields} setValues={setValue} />
			</div>
			<div
				className="w-40 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center shadow-2xl cursor-pointer"
				onClick={async () => {
					console.log("clicked");
					console.log(await handler.predict(fields));
				}}
			>
				Predict
			</div>
		</div>
	);
}
