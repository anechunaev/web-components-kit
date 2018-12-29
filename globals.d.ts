declare module 'jss' {
	const mod: any;
	export default mod;
}

declare module 'jss-preset-default' {
	const mod: any;
	export default mod;
}

declare namespace JSX {
	interface IntrinsicElements {
		button: Partial<HTMLButtonElement> & { onClick?(e: any): void };
		div: Partial<HTMLDivElement>;
		span: Partial<HTMLSpanElement>;
		a: Partial<HTMLAnchorElement>;
		input: Partial<HTMLInputElement>;
		slot: Partial<HTMLSlotElement>;
	}
}