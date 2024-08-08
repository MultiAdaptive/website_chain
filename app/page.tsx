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

    function getFirstApiData() {
        return axios.get("/api_btc/home-data")
    }

    function getSecondApiData() {
        return axios.get("/api/home-data")
    }

    
    const params = {
        chain: 'eth',
      };

    const apiGetNodes = async () => {
        const res = await axios.get("/api/nodes", {params} );
        if (res.status === 200) {
            localStorage.setItem('nodes', JSON.stringify(res.data));
        }
    }


    async function getStaticProps() {
        try {
            const responses = await axios.all([getFirstApiData(), getSecondApiData()]).then(axios.spread((firstResponse, secondResponse) => {
                if (firstResponse.status === 200) {
                    let btcList: IBlob[] = [];
                    btcList = firstResponse.data
                    setBtcBlobList(['btc', ...btcList]);
                }
                if (secondResponse.status === 200) {
                    let ethList: IBlob[] = [];

                    ethList = secondResponse.data

                    setEthBlobList(['eth', ...ethList]);
                }
            }));



        } catch (error) {
            // 处理请求失败的情况
            console.error(error);
        }

    }

    useEffect(() => {
        apiGetNodes();
        getStaticProps()
        const intervalId = setInterval(() => {
            getStaticProps();
            return () => {
                clearInterval(intervalId);
            }
        }, 1000 * 60)
        return () => {
            clearInterval(intervalId);
        }
    }, [])

    return <div className={styles.pageWrapper}>
        <EasySearch placeholder="Search by TxHash / Blob / Commitment / Validator"></EasySearch>
        <div className={clsx("mt-8", styles.cardBox)}>
            <h3 className={clsx("font-bold", styles.title)} style={{}}>Bitcoin Blobs</h3>
            <div className="flex flex-wrap gap-9 mt-4 justify-between">
                {
                    btcBlobList.map((item, index) => {
                        return <BlobCard blob={item} chain="btc" key={index} />
                    })
                }
            </div>
        </div>
        <div className={clsx("mt-8", styles.cardBox)}>
            <h3 className={clsx("font-bold", styles.title)}>Ethereum Blobs</h3>
            <div className="flex flex-wrap gap-8 mt-4 justify-between">
                {
                    ethBlobList.map((item, index) => {
                        return <BlobCard blob={item} chain="eth" key={index} />
                    })
                }
            </div>
        </div>
    </div>
}