import { Card } from "antd"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpOutlined } from "@ant-design/icons"
import clsx from "clsx";
import styles from "./BlobCard.module.css"
import type { IBlob } from "@/app/types"



export default function BlobCard(props: { blob?: IBlob | string, chain: string }) {
    const router = useRouter();
    const { blob, chain } = props;
 
    function gotToBlobDetail(BlobID: number){
        router.push(`/blobs/detail?blobID=${BlobID}&chain=${chain}`)
    }


    function getTimeSince(timestamp: number ) {
        var currentTimestamp = new Date().getTime();
        var timeDifference = currentTimestamp - timestamp;
        if (timeDifference < 60000) {
            return Math.floor(timeDifference / 1000) + ' secs ago';
        } else if (timeDifference < 3600000) {
          return Math.floor(timeDifference / 60000) + ' mins ago';
        } else if (timeDifference < 86400000) {
          return Math.floor(timeDifference / 3600000) + ' hours ago';
        } else {
          var date = new Date(timestamp);
          return date.toLocaleDateString();
        }
      }
      
    if(typeof blob === 'object'){
        const targetDate = new Date(blob.Timestamp).getTime();
const time = getTimeSince(targetDate);

        return <div className={styles.blobCard} onClick={() => { gotToBlobDetail(blob.BlobID) }}>
                <div className={styles.blobHeader}>
                    <Image src="/right.svg" alt="cardicon" width={24} height={24}/>
                    <p>{blob.BlobID}</p>
                </div>
                <div className={styles.blobContent}>
                    <p className="basic_blue">CM: {blob.Commitment}</p>
                    <p  className="basic_blue">{blob.Block}</p>
                    <p>{time}</p>
                    <p>V: {blob.Validator}</p>
                    <p>{blob.Fee} {chain=='btc'?'Sat':'Eth'}</p>
                </div>
            </div>
    }
    return <Card className={clsx(styles.blobCard, styles.noBorder)}>
        <Image className={styles.imgStyle} src="/blob.svg" alt="Logo" width={200} height={248}/>
        <div className={styles.linkWrapper}>
            <Link className={styles.link} href={`/blobs/${blob === 'btc' ? 'bitcoin' : 'ethereum'}`}>
                All Blobs 
            </Link>
            <ArrowUpOutlined className={styles.arrow}/>
        </div>
    </Card>
}