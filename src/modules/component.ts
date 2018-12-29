export interface IOptions {
	tag: string;
	style?: string;
	shadow?: boolean;
}

export interface IComponent {
	new (...args: any[]): any;

	beforeRender?(): void;
	render(): string;
	afterRender?(): void;

	beforeUnload?(): void;
	unload?(): void;

	beforeUpdate?(): void;
	update?(): void;
	afterUpdate?(): void;
}

const noop = () => {};

export default (options: IOptions) => (ClassConstructor: {new (...args: any[]): any;}) => {
	if (typeof options['tag'] === 'undefined') {
		throw new Error("You should define the name of custom element in @Component decorator");
	}

	if (options.tag.indexOf('-') <= 0) {
		throw new Error("Incorrect tag name, you should use \"-\" symbol in the tag");
	}

	const useShadow = typeof options.shadow === 'undefined' ? true : options.shadow;
	const template = document.createElement('template');
	const connectedCallback = ClassConstructor.prototype.connectedCallback || noop;
	const disconnectedCallback = ClassConstructor.prototype.disconnectedCallback || noop;
	
	ClassConstructor.prototype.connectedCallback = function() {
		if (typeof this.beforeRender === 'function') {
			this.beforeRender();
		}

		const rendered = this.render();
		template.innerHTML = rendered;
		if (options.style) {
			template.innerHTML = `<style>${options.style}</style>${rendered}`;
		}

		const clone = document.importNode(template.content, true);

		if (useShadow) {
			this.attachShadow({mode: 'open'}).appendChild(clone);
		} else {
			this.appendChild(clone);
		}

		connectedCallback.call(this);

		if (typeof this.afterRender === 'function') {
			this.afterRender();
		}
	};

	ClassConstructor.prototype.disconnectedCallback = function() {
		if (typeof this.beforeUnload === 'function') {
			this.beforeUnload();
		}

		if (typeof this.unload === 'function') {
			this.unload();
		}
		disconnectedCallback.call(this);
	};

	window.customElements.define(options.tag, ClassConstructor);
}