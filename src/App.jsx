import React, { useState } from "react";
import { HfInference } from "@huggingface/inference";

import MainContainer from "./components/MainContainer";

function App() {
	const [input, setInput] = useState("");
	const [answer, setAnswer] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const hf = new HfInference(import.meta.env.VITE_HF_WRITE);

	async function makeRequest(e) {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await hf.textGeneration({
				inputs: input,
				model: "HuggingFaceH4/zephyr-7b-beta",
			});
			setAnswer(response.generated_text);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	function handleChange(e) {
		setInput(e.target.value);
	}

	return (
		<MainContainer>
			<h1 className="w-full py-6 text-xl text-center border-b">Learn AI</h1>

			<section className="flex flex-col gap-4 p-4 border-b">
				<h2 className="">Text Generation</h2>
				<form className="flex gap-2">
					<input
						type="text"
						name="input"
						value={input}
						disabled={isLoading}
						placeholder="ask something..."
						className="w-full px-4 py-2 border rounded-xl"
						onChange={handleChange}
					/>
					<button
						onClick={makeRequest}
						className={`px-4 py-2 font-light text-white  rounded-xl ${
							isLoading ? "bg-gray-300" : "bg-blue-300"
						}`}
					>
						ask
					</button>
				</form>

				<div className="px-4 font-normal text-center">
					<h1>{answer}</h1>
				</div>
			</section>
		</MainContainer>
	);
}

export default App;
