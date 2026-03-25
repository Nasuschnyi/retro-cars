'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
	const [mounted, setMounted] = useState(false);
	const bodyOverflowRef = useRef<string | null>(null);

	const closeMenu = () => setIsOpen(false);
	const toggleMenu = () => setIsOpen((prev) => !prev);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted) return;

		const { style } = document.body;

		if (isOpen) {
			if (bodyOverflowRef.current === null) {
				bodyOverflowRef.current = style.overflow || '';
			}
			style.overflow = 'hidden';
			return;
		}

		if (bodyOverflowRef.current !== null) {
			style.overflow = bodyOverflowRef.current;
			bodyOverflowRef.current = null;
		}
	}, [isOpen, mounted]);

	useEffect(
		() => () => {
			if (bodyOverflowRef.current !== null) {
				document.body.style.overflow = bodyOverflowRef.current;
				bodyOverflowRef.current = null;
			}
		},
		[]
	);

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

	const overlay = mounted
		? createPortal(
				<>
					<div
						className={styles.backdrop}
						data-open={isOpen ? 'true' : 'false'}
						onClick={closeMenu}
						aria-hidden="true"
					/>

					<nav
						className={styles.panel}
						data-open={isOpen ? 'true' : 'false'}
						id="mobile-menu"
						aria-hidden={!isOpen}
						aria-label="Mobile menu"
					>
						<p>Menu</p>
						<ul>
							{navItems.map((item) => (
								<li key={`${item.label}-mobile`}>
									<Link
										href={item.href}
										onClick={closeMenu}
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
						<Link
							className={styles.cta}
							href={contactHref}
						>
							{contactLabel}
						</Link>
					</nav>
					{isOpen ? renderButton(true) : null}
				</>,
				document.body
			)
		: null;

	return (
		<div className={styles.root}>
			{isOpen ? null : renderButton(false)}
			{overlay}
		</div>
	);
};
