import { requestUrl } from "obsidian";
import { logMessage } from "../../utils";

// Generates titles for documents
async function useName(document) {
	const data = {
		model: "gpt-4-1106-preview",
		messages: [
			{
				role: "system",
				content:
					"You are a helpful assistant. You only answer short (less than 30 chars titles). You do not use any special character just text. Use something very specific to the content not a generic title.",
			},
			{
				role: "user",
				content: "Give a title to this document: \n " + document,
			},
		],
	};

	const response = await requestUrl({
		url: "http://localhost:3000/api/name",
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const result = await response.json;
	logMessage("name result", result.choices[0].message.content);
	return result.choices[0].message.content.trim();
}

export default useName;
