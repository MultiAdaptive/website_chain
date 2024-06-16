"use client"
import { IBlob, TypeSortKey } from "@/app/types"
import { Tooltip } from "antd"
import styles from "./BlobSortCard.module.css"

export default function BlobSortCard({ sortKey, blob, onClickHandle }: { sortKey?: TypeSortKey, blob?: IBlob, onClickHandle?: () => void }) {
    const keyMap = new Map([
        ['index', 'BlobID'],
        ['fee', 'Fee'],
        ['size', 'Size'],
        ['state', 'State']
    ])
    const activeKey = keyMap.get(sortKey || 'index')
    return <div className={styles.blobSortCard} onClick={onClickHandle}>
        <div className={styles.cardHeader}>
            <p>Blob Index</p>
            <p>{blob && blob['BlobID']}</p>
        </div>
        <div className={styles.cardContent}>
            {
                Object.keys(blob || {}).map(key => {
                    return <div key={key} className={styles.cardRow}>
                        <p className={styles.rowKey}>{key}</p>
                        <Tooltip title={blob && blob[key as keyof IBlob]} placement="right">
                            <p className={styles.rowValue}>{blob && blob[key as keyof IBlob]}</p>
                        </Tooltip>
                    </div>
                })
            }
        </div>
    </div>
}