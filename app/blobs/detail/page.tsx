"use client"
import { useState, useEffect, useContext } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Keyval from "@/app/components/keyval/Keyval"
import BlobContext from "../context"
import { IBlobDetail } from "@/app/types"
import { testImageUrl } from "@/app/utils"
import styles from "./page.module.css"

export default function BlobsDetail() {
    const router = useRouter();
    const store = useContext(BlobContext)
    const [blobDetail, setBlobDetail] = useState<IBlobDetail>()

    function getParams(url: string):  { [key:string]: any}{
        const paramStr = url.split('?').slice(-1)[0];
        const paramArr = paramStr.split('&');
        const params:{ [key:string]: any} = {};
        paramArr.forEach(item => {
            let arr = item.split('=');
            params[arr[0]] = arr[1]
        })
        return params;
    }

    async function apiGetBlobDetail() {
        const params = getParams(location.href);
        const res = await axios.get(`/api/blob-detail`, { params });
        if(res.status === 200) {
            setBlobDetail(res.data);
            store.dispatchCurrBlobNum({
                type: 'update',
                blobNum: res.data?.BlobID
            })
        }
    }

    useEffect(() => {
        router.refresh();
        apiGetBlobDetail();
        return () => {
            store.dispatchCurrBlobNum({
                type: 'delete',
            })
        }
    }, [store.searchVal])

    return <div className={styles.detail}>
        <div className={styles.rowFirst}>
            <div className={styles.overview}>
                <h3 className={styles.title}>Overview</h3>
                <div className={styles.overviewContent}>
                    <Keyval label={"Blob Index:"} value={blobDetail?.BlobID}/>
                    <Keyval label={"Status:"} value={blobDetail?.Status}/>
                    <Keyval label={"Block:"} value={blobDetail?.BlockNum}/>
                    <Keyval label={"Timestamp:"} value={blobDetail?.Timestamp}/>
                    <Keyval label={"Fee:"} value={blobDetail?.Fee}/>
                    <Keyval label={"Size:"} value={blobDetail?.Size}/>
                    <Keyval label={"Validator:"} value={blobDetail?.Validator}/>
                </div>
            </div>
            <div className={styles.commitment}>
                <h3 className={styles.title}>Blob Commitment</h3>
                <div className={styles.commitmentContent}>
                    <div className={styles.commitmentContentItem}>
                        <p>Hash</p>
                        <p>{blobDetail?.Hash}</p>
                    </div>
                    <div className={styles.commitmentContentItem}>
                        <p>Commitment</p>
                        <p>{blobDetail?.Commitment}</p>
                        <p>x: {blobDetail?.Commitment_xy.x}</p>
                        <p>y: {blobDetail?.Commitment_xy.y}</p>
                    </div>
                    <div className={styles.commitmentContentItem}>
                        <p>proof</p>
                        <p>{blobDetail?.Proof}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.rowSecond}>
            <h3 className={styles.title}>Data</h3>
            <div className={styles.dataContent}>
                <div className={styles.validBtn}>
                    {
                        blobDetail?.StorageState === 'valid' ? <>
                            <img src="/valid.svg" alt="有效" />
                            valid
                        </> : <>
                            <img src="/invalid.svg" alt="无效" />
                            invalid
                        </>
                    }
                </div>
                {
                    testImageUrl(blobDetail?.Data || '') ? <img src={blobDetail?.Data} alt="img"/> : blobDetail?.Data
                }
            </div>
        </div>
    </div>
}