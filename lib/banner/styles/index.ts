import { c, cB, cE, cM } from "../../_utils/css-render";

export default c([
	cB(
		"banner",
		`
	margin: 0;
	background: var(--s-color);
	`,
		[
			cE("border", {
				border: "var(--s-color)",
				color: "var(--s-text-color)",
			}),
		]
	),
]);
