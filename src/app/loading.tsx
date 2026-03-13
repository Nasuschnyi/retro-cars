import styles from './loading.module.scss';

export default function Loading() {
	return (
		<main
			className={styles.root}
			aria-busy="true"
			aria-live="polite"
		>
			<div
				className={styles.skeleton}
				aria-hidden="true"
			/>
		</main>
	);
}
