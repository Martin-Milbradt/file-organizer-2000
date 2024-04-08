// Ollama/Mistral version
import { requestUrl } from "obsidian";
import { logMessage } from "../../utils";
import { log } from "console";

async function useName(document, apiKey) {
	logMessage("useName Mistral running");
	const data = {
		model: "dolphin-mistral",
		stream: false,
		temperature: 0,
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
		url: "http://localhost:11434/v1/chat/completions",
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
			//Authorization: `Bearer ${apiKey}`,
		},
	});

	const result = await response.json;
	logMessage("Mistral document name", result.choices[0].message.content);
	return result.choices[0].message.content.trim();
}

export default useName;

// // OpenAI Version
// import { requestUrl } from "obsidian";
// import { logMessage } from "../../utils";

// async function useName(document, apiKey) {
// 	const data = {
// 		model: "gpt-4-1106-preview",
// 		messages: [
// 			{
// 				role: "system",
// 				content:
// 					"You are a helpful assistant. You only answer short (less than 30 chars titles). You do not use any special character just text. Use something very specific to the content not a generic title.",
// 			},
// 			{
// 				role: "user",
// 				content: "Give a title to this document: \n " + document,
// 			},
// 		],
// 	};

// 	const response = await requestUrl({
// 		url: "https://api.openai.com/v1/chat/completions",
// 		method: "POST",
// 		body: JSON.stringify(data),
// 		headers: {
// 			"Content-Type": "application/json",
// 			Authorization: `Bearer ${apiKey}`,
// 		},
// 	});

// 	const result = await response.json;
// 	//logMessage("documenttitle", result.choices[0].message.content);
// 	return result.choices[0].message.content.trim();
// }

// export default useName;
