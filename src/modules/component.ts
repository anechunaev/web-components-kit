export interface IOptions {
	tag: string;
	style?: string;
	shadow?: boolean;
}

export interface IComponent {
	new (): any;
	willLoad?(): void;
	render?(): string;
	didLoad?(): void;
	willUnload?(): void;
	willUpdate?(): void;
	didUpdate?(): void;
}

const noop = () => {};

export default (options: IOptions) => (ClassConstructor: IComponent) => {
	if (typeof options['tag'] === 'undefined') {
		throw new Error("You should define the name of custom element in @Component decorator");
	}

	let finalTemplate = '';
	
	const template = document.createElement('template');
	
	if (options.style) {
		finalTemplate = `<style>${options.style}</style>${ClassConstructor.render ? ClassConstructor.render() : ''}`;
	}
	
	template.innerHTML = finalTemplate;
	
	const connectedCallback = ClassConstructor.prototype.connectedCallback || noop;
	
	ClassConstructor.prototype.connectedCallback = function() {
		const clone = document.importNode(template.content, true);

		if (options.shadow) {
			this.attachShadow({mode: 'open'}).appendChild(clone);
		} else {
			this.appendChild(clone);
		}
		connectedCallback.call(this);
	};

	window.customElements.define(options.tag, ClassConstructor);
}