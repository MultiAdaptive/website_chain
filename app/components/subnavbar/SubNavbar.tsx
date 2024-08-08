"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from "./SubNavbar.module.css"
import EasySearch from "../easysearch/EasySearch"
import clsx from "clsx"

export default function SubNavbar({ handleSearch }: {  handleSearch: (key: string, val: string) => void }) {
    const pathname = usePathname();
    return <div className={styles.subnavbar}>
        <div className={styles.linkBox}>
            <Link className={clsx(styles.link, pathname === '/blobs/bitcoin' && styles.activeLink)}  href="/blobs/bitcoin">BitCoin</Link>
            <Link className={clsx(styles.link, pathname === '/blobs/ethereum' && styles.activeLink)}  href="/blobs/ethereum">Ethereum</Link>
        </div>
        <EasySearch  onSearch={handleSearch} placeholder="Search by Address / Txh / Hash / Blob / Commitment"></EasySearch>
    </div>
}