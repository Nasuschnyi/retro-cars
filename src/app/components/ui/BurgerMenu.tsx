'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './burger-menu.module.scss';

type NavItem = {
	href: string;
	label: string;
};

type BurgerMenuProps = {
	navItems: NavItem[];
	contactHref: string;
	contactLabel: string;
};

export const BurgerMenu = ({
	navItems,
	contactHref,
	contactLabel,
}: BurgerMenuProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const closeMenu = () => setIsOpen(false);
	const toggleMenu = () => setIsOpen((prev) => !prev);

	return (
		<div
			className={styles.root}
			data-open={isOpen ? 'true' : 'false'}
		>
			<button
				className={styles.burger}
				type="button"
				aria-label={isOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={isOpen}
				aria-controls="mobile-menu"
				onClick={toggleMenu}
			>
				<span className={styles.burgerLine} />
				<span className={styles.burgerLine} />
				<span className={styles.burgerLine} />
			</button>

			<div
				className={styles.backdrop}
				onClick={closeMenu}
				aria-hidden="true"
			/>

			<div
				className={styles.menu}
				id="mobile-menu"
				aria-hidden={!isOpen}
			>
				<p className={styles.title}>Menu</p>
				<ul className={styles.list}>
					{navItems.map((item) => (
						<li
							className={styles.item}
							key={`${item.label}-mobile`}
						>
							<Link
								className={styles.link}
								href={item.href}
								onClick={closeMenu}
							>
								{item.label}
							</Link>
						</li>
					))}
				</ul>
				<Link
					className={styles.contact}
					href={contactHref}
				>
					{contactLabel}
				</Link>
			</div>
		</div>
	);
};
