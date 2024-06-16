import { IValidator } from "@/app/types";
import clsx from "clsx";
import styles from "./ValidateCard.module.css";

export default function ValidateCard({validator}: {validator: IValidator}) {
    return <div className={clsx(styles.cardWrapper, validator['status'] === 'Inactive' && styles.orange)}>
        <div className={styles.cardHeader}>
            <span>{validator.validator_name}</span>
            <img src="/validator.svg" alt="img" />
        </div>
        <div className={styles.cardContent}>
            {validator.validator_address}
        </div>
    </div>
}