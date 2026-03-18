import type React from 'react';

type ArrowProps = React.SVGProps<SVGSVGElement> & {
	title?: string;
};

export default function Arrow({ title, ...props }: ArrowProps) {
	const ariaHidden = title ? undefined : true;

	return (
		<svg
			viewBox="0 0 16 16"
			width="1em"
			height="1em"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden={ariaHidden}
			role={title ? 'img' : 'presentation'}
			focusable="false"
			{...props}
		>
			{title ? <title>{title}</title> : null}
			<path
				d="M0.707 1H14.707M14.707 1V15M14.707 1L0.707 15"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
