"use client"
import { useEffect, useState } from "react"
import EasySearch from "./components/easysearch/EasySearch"
import BlobCard from "./components/blobcard/BlobCard"
import axios from "axios"
import clsx from "clsx"
import styles from "./page.module.css"
import { IBlob } from "./types"

export default function Home() {
    const [btcBlobList, setBtcBlobList] = useState<(IBlob | string)[]>(['btc']);
    const [ethBlobList, setEthBlobList] = useState<(IBlob | string)[]>(['eth']);

    async function apiGetHomeData() {
        const res = await axios.get("/api/home-data")
        if(res.status === 200) {
            let btcList: IBlob[] = [];
            let ethList: IBlob[] = [];
            btcList = res.data?.result?.find((item: { chain: string, blobs: IBlob[]}) => item.chain === 'btc').blobs
            ethList = res.data?.result?.find((item: { chain: string, blobs: IBlob[]}) => item.chain === 'eth').blobs
            setBtcBlobList(['btc', ...btcList].slice(0, 6));
            setEthBlobList(['eth', ...ethList].slice(0, 6));
        }
    }

    useEffect(() => {
        apiGetHomeData();
        const intervalId = setInterval(() => {
            apiGetHomeData();
            return () => {
                clearInterval(intervalId);
            }
        }, 1000 * 60)
        return () => {
            clearInterval(intervalId);
        }
    }, [])

    return <div className={styles.pageWrapper}>
        <EasySearch placeholder="Search by Address / Txn / Hash / Blob / Commitment"></EasySearch>
        <div className={clsx("fmt-16 mt-8", styles.cardBox)}>
            <h3 className={clsx("font-bold", styles.title)} style={{}}>Bitcoin Blobs</h3>
            <div className="flex flex-wrap gap-8 mt-4">
                    {
                        btcBlobList.map((item, index) => {
                            return <BlobCard blob={item} chain="btc" key={index}/>
                        })
                    }
            </div>
        </div>
        <div className={clsx("mt-8", styles.cardBox)}>
            <h3 className={clsx("font-bold", styles.title)}>Ethereum Blobs</h3>
            <div className="flex flex-wrap gap-8 mt-4">
            {
                ethBlobList.map((item, index) => {
                    return <BlobCard blob={item} chain="eth" key={index}/>
                })
            }
            </div>
        </div>
    </div>
}