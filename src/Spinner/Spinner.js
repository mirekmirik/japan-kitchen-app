import styles from './Spinner.module.css'

const Spinner = () => {


    return (
        <div className={styles.item}>
			<i className={`${styles.loader} ${styles['--1']}`}></i>
		</div>
    )
}

export default Spinner