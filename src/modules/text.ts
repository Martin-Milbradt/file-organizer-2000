import { requestUrl } from "obsidian";
import { logMessage } from "../../utils";

async function useText(content: string, systemPrompt: string) {
	const data = {
		model: "gpt-4-1106-preview",
		temperature: 0,
		messages: [
			{
				role: "system",
				content: systemPrompt,
			},
			{
				role: "user",
				content: content,
			},
		],
	};

	const response = await requestUrl({
		url: "http://localhost:3000/api/text",
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const result = await response.json;
	logMessage(result);
	logMessage(result.choices[0].message.content);
	// remove all special characters except # to avoid having tags item listed with - or other special characters
	return result.choices[0].message.content
		.trim()
		.replace(/[^a-zA-Z0-9# ]/g, "");
}

export default useText;
