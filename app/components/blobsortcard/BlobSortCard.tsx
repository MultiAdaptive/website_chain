"use client"
import { IBlob, TypeSortKey } from "@/app/types"
import { Tooltip } from "antd"
import styles from "./BlobSortCard.module.css"
import Keyval from "@/app/components/blobcarditem/Keyval"
import Link from "next/link"
import { getTimeSince, getHash, isTimestampMoreThan14DaysAgo } from '@/app/utils';


export default function BlobSortCard({ chain,sortKey, blob, onClickHandle }: {chain?:string,sortKey?: TypeSortKey, blob?: IBlob, onClickHandle?: () => void }) {
    const keyMap = new Map([
        ['index', 'BlobID'],
        ['fee', 'Fee'],
        ['size', 'Size'],
        ['state', 'State']
    ])
    const activeKey = keyMap.get(sortKey || 'index')
    const timestamp = blob && blob['receive_at']
    const targetDate = new Date(timestamp + "").getTime();
    const StorageState = isTimestampMoreThan14DaysAgo(targetDate)
    const time = getTimeSince(targetDate);

    return <div className={styles.blobSortCard} onClick={onClickHandle}>
        <div className={styles.cardHeader}>
            <p>Blob Index</p>
            <p>{blob && blob['blob_id']}</p>
        </div>
        <div className={styles.cardContent}>
            <Keyval label={"Commitment:"} value={getHash(blob?.commitment_hash + "")} />
            <div className="flex">
                <p className="w-1/2 basic_gray">Block:</p>
                <Link className="w-1/2 basic_blue hover:underline" target="_blank" href={chain == 'eth' ? `https://etherscan.io/block/${blob?.block_num}` : `http://13.228.170.151:3002/block-height/${blob?.block_num}`} >
                    <p >{blob && blob['block_num']}</p>
                </Link>

            </div>

            <Keyval label={"Age:"} value={time} />
            <Keyval label={"Fee:"} value={blob && blob['fee'] + " Sats"} />
            <Keyval label={"Length:"} value={blob && blob['length']} />
            <Keyval label={"Status:"} value='Confirmed' />
            <Keyval label={"Validator:"} value={getHash(blob?.validators[0] + "")} />
            <Keyval label={"StorageState:"} value={StorageState ? 'Invalid' : "Valid"} />
            {/* {
                Object.keys(blob || {}).map(key => {
                    return <div key={key} className={styles.cardRow}>
                        <p className={styles.rowKey}>{key}</p>
                        <Tooltip title={blob && blob[key as keyof IBlob]} placement="right">
                            <p className={styles.rowValue}>{blob && blob[key as keyof IBlob]}</p>
                        </Tooltip>
                    </div>
                })
            } */}
        </div>
    </div>
}