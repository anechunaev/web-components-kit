import jss from 'jss';
import preset from 'jss-preset-default';
import * as h from 'hyperscript';

export interface IComponent {
	beforeRender?(): void;
	render(ctx: any): string | HTMLElement;
	afterRender?(): void;

	beforeUnload?(): void;
	unload?(): void;

	beforeUpdate?(): void;
	update?(): void;
	afterUpdate?(): void;
}

jss.setup(preset());

export default class WebElement extends HTMLElement implements IComponent {
	protected classes: {[key: string]: string};
	protected $$jss = jss;
	protected $$h = h.context();

	constructor() {
		super();

		this.classes = {};
		(window as any)['$$h'] = h;
	}

	public render(ctx: any) { return ''; }
}