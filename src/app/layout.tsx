import { Unbounded } from 'next/font/google';
import './globals.scss';

const unbounded = Unbounded({
	subsets: ['latin'],
	weight: ['300', '400', '500'],
	variable: '--font-unbounded',
	display: 'swap',
});

export const metadata = {
	title: 'Cars Classic Autotrader',
	description: 'Classic cars marketplace',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={unbounded.variable}
		>
			<body>{children}</body>
		</html>
	);
}
