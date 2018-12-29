import Component from '../../modules/component';

@Component({
	tag: 'test-button',
	style: 'button { background: #36C; border: 0; border-radius: 5px; padding: 10px 15px; color: #fff; }',
})
class Button extends HTMLElement {
	public beforeRender() {
		console.log(Date.now(), 'Before render');
	}

	public render() {
		console.log(Date.now(), 'Render');
		return '<button>Hello world!</button>';
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