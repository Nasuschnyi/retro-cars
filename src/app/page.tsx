import Link from 'next/link';
import styles from './page.module.scss';
import Arrow from './components/icons/Arrow';

export const metadata = {
	title: 'Cars Classic Autotrader | Classic Cars Marketplace',
	description: 'Discover and explore timeless classic retro cars.',
};

export default function Home() {
	return (
		<main className={styles.root}>
			<section
				className={styles.hero}
				aria-label="Page intro"
			>
				<h1 className={styles.title}>Retro cars 1960-1970</h1>
				<div className={styles.deck}>
					<p className={styles.lead}>Vintage retro cars USA</p>
					<Link
						href="/"
						className={styles.cta}
					>
						Find a car
						<Arrow className={styles.icon} />
					</Link>
				</div>
			</section>
		</main>
	);
}
