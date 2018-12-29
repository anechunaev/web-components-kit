export default (theme: any) => ({
	wrapper: {
		border: `1px solid ${theme.color.blue}`,
		padding: [[ 10, 15 ]],
		font: '400 16px/20px sans-serif',
		borderRadius: 5,
		color: theme.color.blue,
		cursor: 'pointer',

		'&:hover': {
			color: theme.color.red,
			borderColor: theme.color.red,
		},
	},
});