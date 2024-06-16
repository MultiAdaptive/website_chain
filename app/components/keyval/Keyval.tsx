import styles from './Keyval.module.css'
export default function Keyval({ label, value }: {label: string, value: string | number | undefined | null }) {
    return <div className={styles.wrapper}>
        <p>{label}</p>
        <p>{value}</p>
    </div>
}