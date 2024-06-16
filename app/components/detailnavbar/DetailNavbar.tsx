"use client"
import styles from "./DetailNavbar.module.css"
import EasySearch from "../easysearch/EasySearch"

export default function DetailNavbar({ blobNum, handleSearch }: { blobNum: number, handleSearch: (key: string, val: string) => void }) {
    return <div className={styles.detail_navbar}>
        <div className={styles.link_box}>
            <img src="/bitcoin.svg" alt="bitcoin" />
            <span>Blob: {blobNum}</span>
        </div>
        <EasySearch onSearch={handleSearch} placeholder="Search by Address / Txh / Hash / Blob / Commitment"></EasySearch>
    </div>
}