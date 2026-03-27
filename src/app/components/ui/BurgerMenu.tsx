'use client';

import Link from 'next/link';
import { memo, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './burger-menu.module.scss';

type BurgerMenuProps = {
	navItems: { href: string; label: string }[];
	contactHref: string;
	contactLabel: string;
};

export const BurgerMenu = memo(function BurgerMenu({
	navItems,
	contactHref,
	contactLabel,
}: BurgerMenuProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const openState = isOpen ? 'true' : 'false';

	const closeMenu = () => setIsOpen(false);
	const toggleMenu = () => setIsOpen((prev) => !prev);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!isOpen) return;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [isOpen]);

	const renderButton = (floating: boolean) => (
		<button
			className={styles.button}
			type="button"
			aria-label={isOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={isOpen}
			aria-controls="mobile-menu"
			onClick={toggleMenu}
			data-floating={floating ? 'true' : undefined}
		>
			<span className={styles.line} />
			<span className={styles.line} />
			<span className={styles.line} />
		</button>
	);

	const overlay =
		mounted
			? createPortal(
					<>
						<div
							className={styles.backdrop}
							data-open={openState}
							onClick={closeMenu}
							aria-hidden="true"
						/>

						<nav
							className={styles.panel}
							data-open={openState}
							id="mobile-menu"
							aria-hidden={!isOpen}
							aria-label="Mobile menu"
						>
							<p>Menu</p>
							<ul onClick={closeMenu}>
								{navItems.map((item) => (
									<li key={item.label}>
										<Link href={item.href}>{item.label}</Link>
									</li>
								))}
							</ul>
							<Link
								className={styles.cta}
								href={contactHref}
								onClick={closeMenu}
							>
								{contactLabel}
							</Link>
						</nav>
						{isOpen && renderButton(true)}
					</>,
					document.body,
				)
			: null;

	return (
		<div className={styles.root}>
			{!isOpen && renderButton(false)}
			{overlay}
		</div>
	);
});
