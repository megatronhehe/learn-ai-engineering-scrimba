import React from "react";

export default function MainContainer({ children }) {
	return (
		<main className="flex justify-center font-extralight">
			<div className="w-full max-w-lg ">{children}</div>
		</main>
	);
}
