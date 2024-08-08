"use client"
import styles from "./DetailNavbar.module.css"
import EasySearch from "../easysearch/EasySearch"
import Image from 'next/image'
import bitcoinPic from '../../../public/bitcoin.svg';
import ethPic from '../../../public/eth.svg';


export default function DetailNavbar({ blobNum, handleSearch }: { blobNum: string,   handleSearch: (key: string, val: string) => void }) {
    return <div className={styles.detail_navbar}>
        <div className={styles.link_box}>
            {
                blobNum === 'btc' ?
                    <Image src={bitcoinPic} alt="bitcoin" width={22} height={30}    />
                    :
                    <Image src={ethPic} alt="eth" width={30} height={30}/>

            }

            <span>{blobNum} - Blob </span>
        </div>
        <EasySearch onSearch={handleSearch} placeholder="Search by Address / Txh / Hash / Blob / Commitment"></EasySearch>
    </div>
}