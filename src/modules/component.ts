export interface IOptions {
	tag: string;
	style?: string;
	shadow?: boolean;
	dynamicStyles?: (theme: any) => {[key: string]: any} | {[key: string]: any};
	theme?: any;
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

		let rendered = '';
		if (typeof options.style !== 'undefined') {
			rendered = `<style>${options.style}</style>${rendered}`;
		}
		if (typeof options.dynamicStyles !== 'undefined') {
			const dynamicStyles = typeof options.dynamicStyles === 'function' ? options.dynamicStyles(options.theme) : options.dynamicStyles;
			const styleSheets = this.$$jss.createStyleSheet(dynamicStyles);

			this.classes = styleSheets.classes;

			rendered = `${rendered}<style>${styleSheets.toString()}</style>`;
		}
		rendered = rendered + this.render();
		template.innerHTML = rendered;

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