import OpenAI from "openai";
import { BardAPI } from "bard-api-node";
const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAPI_KEY, dangerouslyAllowBrowser: true });

export const handler = {
	predict: async (data) => {
		console.log(data);
		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [
				// {
				// 	role: "user",
				// 	content: "Hello ChatGPT",
				// },
				{
					role: "system",
					content:
						"You are an endocrinologist. A patient gives you the following data where field is the patient data and value is the value of that data:",
				},
				{
					role: "user",
					content: `${data}`,
				},
				{
					role: "system",
					content:
						"Based on the data, what is the patient's risk of diabetes? Please provide a percentage. I only want the percentage, no any other text.",
				},
			],
		});

		console.log(response);
		return response;
	},

	predictBard: async (data) => {
		console.log("Predicting Bard");

		const dataString = data.map((item) => `${item.field}: ${item.value}`).join(", ");
		const prompt = `You are an heart disease risk prediction bot based on Framingham's Risk Score Calculator. A patient gives you the following data where field is the patient data and value is the value of that data: ${dataString}. Based on the data, what is the patient's risk of having a heart disease? Please provide a percentage. I want the percentage only, no any other text.`;
		console.log(dataString);
		const prompt2 = `A patient gives you the following data where field is the patient data and value is the value of that data: ${dataString}. Using only the data and not considering the other variables not included in the data provided, calculate the Framingham Heart Disease Risk Score. What is the patient's risk of having a heart disease? Please provide the percentage based on your calculation. I want the percentage only, no any other text. Please be as accurate and consistent with your answers as possible.`;

		// 'Gender: Male, Age: 48, Smoker: Yes, Cigarettes per day: 7, Blood Pressure Medication: None, Diabetes: Yes, Cholesterol: 240 mg/dl, Systolic Blood Pressure: 145 mmhg, Diastolic Blood Pressure: 83 mmhg, BMI:27, Heart Rate: 110 bpm, Heart Rate: 110 bpm, Glucose: 112 mg/dl'

		try {
			const bard = new BardAPI();
			await bard.initializeChat(process.env.NEXT_PUBLIC_GEMINI_API);

			const response = await bard.getBardResponse(prompt2);
			console.log(response);
			console.log(response.text);

			return response.text;
		} catch (error) {
			console.error("Error:", error);
		}
	},
};
