import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAPI_KEY, dangerouslyAllowBrowser: true });

export const handler = {
	predict: async (data: {}) => {
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
};
