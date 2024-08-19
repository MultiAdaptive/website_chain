import { Card } from "antd"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpOutlined, CheckCircleTwoTone } from "@ant-design/icons"
import clsx from "clsx";
import styles from "./BlobCard.module.css"
import type { IBlob } from "@/app/types"
import { calc } from "antd/es/theme/internal";
import { getTimeSince } from '@/app/utils';
import blobPic from '../../../public/blob.svg';


export default function BlobCard(props: { blob?: IBlob | string, chain: string }) {
    const router = useRouter();
    const { blob, chain } = props;

    function gotToBlobDetail(commitment_hash: string,blob_id: number) {
        router.push(`/blobs/detail?commitment_hash=${commitment_hash}&chain=${chain}&id=${blob_id}`)
    }
 
    function getHash(hash: string) {
        if (hash != null) {
            return hash.slice(0, 5) + "..." + hash.slice(-5)
        }
    }

    if (typeof blob === 'object') {
        const targetDate = new Date(blob.receive_at).getTime();
        const time = getTimeSince(targetDate);

        return <div className={styles.blobCard} onClick={() => { gotToBlobDetail(blob.commitment_hash,blob.blob_id) }}>
            <div className={styles.blobHeader}>
                <CheckCircleTwoTone twoToneColor="#4682C8" className="absolute left-3" />
                <p>{blob.blob_id}</p>
                
            </div>
            <div className={`hover:bg-slate-50 ${styles.blobContent}`}>

                <p className="basic_blue">CM: {getHash(blob.commitment)}</p>
                <Link className=" basic_blue hover:underline" target="_blank" href={chain == 'eth' ? `https://sepolia.etherscan.io/block/${blob?.block_num}` : `http://13.228.170.151:3002/block-height/${blob?.block_num}`} onClick={(e) => {
                    e.stopPropagation();
                }}>
                    <p >{blob.block_num}</p>
                </Link>                                                                                                                                                                                                                    
                <p>{time}</p>
                <p>V: {getHash(blob.validators[0])}</p>
                <p>{blob.fee} {chain == 'btc' ? 'Sat' : 'Eth'}</p>
            </div>
        </div>
    }
    return <Card className={clsx(styles.blobCard, styles.noBorder)}>
        <Image className={styles.imgStyle} src={blobPic} alt="" width={200} height={248} />
        <div className={styles.linkWrapper}>
            <Link className={styles.link} target="_blank"  href={`/blobs/${blob === 'btc' ? 'bitcoin' : 'ethereum'}`}>
                All Blobs
            </Link>
            <ArrowUpOutlined className={styles.arrow} />
        </div>
    </Card>
}