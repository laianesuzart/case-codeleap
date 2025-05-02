interface Props {
	text: string;
}
export function Title({ text }: Props) {
	return <h2 className="highlighted-text">{text}</h2>;
}
