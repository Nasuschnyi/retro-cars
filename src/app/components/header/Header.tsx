import Link from 'next/link';
import styles from './header.module.scss';

export const Header = () => (
	<header className={styles.header}>
		<nav className={styles.nav}>
			<Link
				className={styles.logo}
				href="/"
			>
				Cars Classic Autotrader
			</Link>
			<ul className={styles.list}>
				<li className={styles.item}>
					<Link href="/">Cars</Link>
				</li>
				<li className={styles.item}>
					<Link href="/">About Us</Link>
				</li>
				<li className={styles.item}>
					<Link href="/">Services</Link>
				</li>
				<li className={styles.item}>
					<Link href="/">Contacts</Link>
				</li>
			</ul>
			<Link
				className={styles.contact}
				href="tel:+12403751288"
			>
				+1 (240) 375-1288
			</Link>
		</nav>
	</header>
);
