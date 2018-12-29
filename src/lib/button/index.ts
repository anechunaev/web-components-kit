import Component, { IComponent } from '../../modules/component';

@Component({
	tag: 'test-button',
	shadow: true,
	style: 'button { background: #36C; border: 0; border-radius: 5px; padding: 10px 15px; }',
})
class Button extends HTMLElement {
	public static render() {
		return '<div><h1>Hello custom button!</h1><button>Hello world!</button></div>';
	}
}

export default Button;