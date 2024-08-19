"use client"
import { useState, useEffect, useContext } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Keyval from "@/app/components/keyval/Keyval"
import BlobContext from "../context"
import { IBlobDetail } from "@/app/types"
import { testImageUrl } from "@/app/utils"
import styles from "./page.module.css"
import Image from 'next/image'
import { CopyOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { notification, } from 'antd';
import Link from "next/link";
import validPic from '../../../public/valid.svg'
import inValidPic from '../../../public/valid.svg'
import { getTimeSince, getHash, isTimestampMoreThan14DaysAgo } from '@/app/utils';


export default function BlobsDetail() {
    const router = useRouter();
    const store = useContext(BlobContext)
    const [blobDetail, setBlobDetail] = useState<IBlobDetail>()
    const [chain, setChain] = useState('');
    const [blobId, setBlobId] = useState('');
    const [hash, setHash] = useState('');
    const [storageState, setStorageState] = useState(Boolean);
    const [descText, setDescText] = useState('');
    const [feeText, setFeeText] = useState('');

    function getChain(url: string) {
        const paramStr = url.split('?').slice(-1)[0];
        const paramArr = paramStr.split('&');
        const hash = paramArr[0].split('=')[1]
        const chain = paramArr[1].split('=')[1]
        const blobId = paramArr[2].split('=')[1]
        setChain(chain)
        setBlobId(blobId)
        setHash(hash)
        store.dispatchCurrBlobNum({
            type: 'update',
            blobNum: blobId,
            chain: chain,
        })
        if (chain == 'btc') {
            btcGetBlobDetail({
                commitment_hash: hash,
                data_size: '10040',

            })
        } else {
            apiGetBlobDetail({
                commitment_hash: hash,
                data_size: '10040',

            })
        }

    }
    // function getParams(): { [key: string]: any } {

    //     const params: { [key: string]: any } = {};
    //     paramArr.forEach(item => {
    //         let arr = item.split('=');
    //         params[arr[0]] = arr[1];
    //     })
    //     console.error(params)
    //     return params;
    // }
    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
        api.open({
            message: '',
            description:
                'Successfully copied to clipboard.',
            className: 'custom-class',
            duration: 1,
            style: {
                width: 400,
            },
            placement: 'bottomRight'
        });
    };


    const apiGetBlobDetail = async (params?: { [key: string]: string }) => {
        const res = await axios.get(`/api/blob-detail`, { params });
        if (res.status === 200) {
            setDescText('Confirmed')
            setFeeText('Eth')

            setStorageState(isTimestampMoreThan14DaysAgo(res.data.Timestamp))
            setBlobDetail(res.data);
        }
    }
    const btcGetBlobDetail = async (params?: { [key: string]: string }) => {
        const res = await axios.get(`/api_btc/blob-detail`, { params });
        if (res.status === 200) {
            setDescText('Confirmed')
            setFeeText('Sat')

            setStorageState(isTimestampMoreThan14DaysAgo(res.data.Timestamp))
            setBlobDetail(res.data);

        }
    }

    // async function btcGetBlobDetail() {
    //     const params = getParams();
    //     const res = await axios.get(`/api_btc/blob-detail`, { params });
    //     if (res.status === 200) {
    //         setBlobDetail(res.data);
    //         store.dispatchCurrBlobNum({
    //             type: 'update',
    //             chain: chain,
    //             blobNum: res.data?.index
    //         })
    //     }
    // }

    async function handleCopy(textToCopy: string) {
        try {
            await navigator.clipboard.writeText(textToCopy);
            openNotification()
        } catch (err) {
            console.error('Con‘t copy the text: ', err);
        }
    }


    useEffect(() => {
        router.refresh();
        getChain(location.href);

        return () => {
            store.dispatchCurrBlobNum({
                type: 'delete',
            })
        }
    }, [store.searchVal])

    return <div className={styles.detail}>
        <div className={styles.rowFirst}>
            <div className={styles.overview}>
                <p className="basic_blue  text-lg font-bold">Overview</p>
                <div className={styles.overviewContent}>
                    <Keyval label={"Blob Index:"} value={blobDetail?.blob_id} />
                    <Keyval label={"Status:"} value={descText} />
                    <div className="flex ">
                        <p className="w-1/5 basic_gray">Block:</p>
                        {/* //http://13.228.170.151:3002/block-height/7460 */}
                        {/* //https://sepolia.etherscan.io/   */}
                        {/* https://etherscan.io/block */}
                        <Link className="w-3/4 basic_blue hover:underline" target="_blank" href={chain == 'eth' ? `https://sepolia.etherscan.io/block/${blobDetail?.block_num}` : `http://13.228.170.151:3002/block-height/${blobDetail?.block_num}`}  >
                            <p >{blobDetail?.block_num}</p>
                        </Link>

                        {contextHolder}
                        <CopyOutlined style={{ fontSize: '12px', color: '#4682C8', }} onClick={() => handleCopy(blobDetail?.block_num + "")} />
                    </div>

                    <Keyval label={"Timestamp:"} value={blobDetail?.timestamp} />
                    {/* <Keyval label={"Timestamp:"} value={blobDetail?.timestamp+" "+feeText} /> */}
                    <div className="flex ">
                        <p className="w-1/5 basic_gray">Fee:</p>
                        <p className="basic_black">{blobDetail?.fee} {feeText}</p>
                    </div>

                    <Keyval label={"Size:"} value={blobDetail?.size} />
                    <div className="flex ">
                        <p className="w-1/5 basic_gray">TxHash:</p>
                        {/* //http://13.228.170.151:3002/block-height/7460 */}
                        {/* //https://sepolia.etherscan.io/   */}
                        {/* https://etherscan.io/block */}
                        <Link className="w-3/4 basic_blue hover:underline" target="_blank" href={chain == 'eth' ? `https://sepolia.etherscan.io/tx/${blobDetail?.tx_hash}` : `http://13.228.170.151:3002/block-height/${blobDetail?.block_num}`}  >
                            <p >{blobDetail?.tx_hash}</p>
                        </Link>

                        {contextHolder}
                        {/* <CopyOutlined style={{ fontSize: '12px', color: '#4682C8', }} onClick={() => handleCopy(blobDetail?.block_num + "")} /> */}
                    </div>

                    {/* <Keyval label={"TxHash:"} value={blobDetail?.tx_hash} /> */}
                    <div className="flex  ">
                        <div className="w-1/5 basic_gray">
                            Validator:
                        </div>
                        <div >
                            {
                                <div className="basic_black">
                                    {blobDetail?.validators.map(item => (
                                        <div className="basic_black" key={item}>{item}</div>
                                    ))}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.commitment}>
                <p className="basic_blue text-lg font-bold">Blob Commitment</p>

                <div className={styles.commitmentContent}>
                    <div className={styles.commitmentContentItem}>
                        <p>Hash</p>
                        <p>{blobDetail?.commitment_hash}</p>
                    </div>
                    <div className={styles.commitmentContentItem}>
                        <p>Commitment</p>
                        <p>{blobDetail?.commitment}</p>
                        <p>x: {blobDetail?.commitment_xy.x}</p>
                        <p>y: {blobDetail?.commitment_xy.y}</p>
                    </div>
                    <div className={styles.commitmentContentItem}>
                        {/* <p>proof</p> */}
                        {/* <p>{blobDetail?.Proof}</p> */}
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.rowSecond}>
            <p className="basic_blue  text-lg font-bold">Data</p>
            <div className={styles.dataContent}>

                <div className={styles.validBtn}>
                    {
                        { storageState } ? <>
                            <Image src={validPic} alt="valid" width={16} height={16} className="mr-2" />
                            Valid
                        </> : <>
                            <Image src={inValidPic} alt="invalid" width={16} height={16} className="mr-2" />
                            InValid
                        </>
                    }
                </div>
                <div className=" basic_black  ">
                    <p className="pb-4">
                        <ExclamationCircleOutlined /> Due to the large size of the data, only partial data is displayed.
                    </p>

                    {
                        testImageUrl(blobDetail?.Data || '') ? <img src={blobDetail?.Data} alt="img" /> : <div className={styles.data}>{blobDetail?.data}</div>
                    }
                </div>

            </div>
        </div>
    </div>
}