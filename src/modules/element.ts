import jss from 'jss';
import preset from 'jss-preset-default';

export interface IComponent {
	beforeRender?(): void;
	render(): string;
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

	constructor() {
		super();

		this.classes = {};
	}

	public render() {
		return '';
	}
}