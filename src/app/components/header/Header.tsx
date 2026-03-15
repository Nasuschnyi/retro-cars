import Link from 'next/link';
import { BurgerMenu } from '../ui/BurgerMenu';
import styles from './header.module.scss';

const navItems = [
	{ href: '/', label: 'Cars' },
	{ href: '/', label: 'About Us' },
	{ href: '/', label: 'Services' },
	{ href: '/', label: 'Contacts' },
];

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
				{navItems.map((item) => (
					<li
						className={styles.item}
						key={item.label}
					>
						<Link
							className={styles.link}
							href={item.href}
						>
							{item.label}
						</Link>
					</li>
				))}
			</ul>

			<Link
				className={styles.contact}
				href="tel:+12403751288"
			>
				+1 (240) 375-1288
			</Link>

			<BurgerMenu
				navItems={navItems}
				contactHref="tel:+12403751288"
				contactLabel="+1 (240) 375-1288"
			/>
		</nav>
	</header>
);
