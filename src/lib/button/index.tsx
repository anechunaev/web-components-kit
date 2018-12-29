import Component from '../../modules/component';
import WebElement from '../../modules/element';
import styles from './style';

@Component({
	tag: 'test-button',
	dynamicStyles: styles,
	theme: {
		color: {
			blue: '#0073FF',
			red: '#FF4169',
		},
	},
})
export class Button extends WebElement {
	public beforeRender() {
		console.log(Date.now(), 'Before render');
	}

	public render(ctx: any) {
		console.log(Date.now(), 'Render');
		return (
			<button
				className={this.classes.wrapper}
				onClick={console.log}
			>
				<slot />
			</button>
		);
	}

	public afterRender() {
		console.log(Date.now(), 'After render');
	}

	public beforeUnload() {
		console.log(Date.now(), 'Before unload');
	}

	public unload() {
		console.log(Date.now(), 'Unload');
	}
}