"use client"
import { useEffect, useState } from "react"
import { Button } from "antd"
import EasySearch from "../components/easysearch/EasySearch"
import NodeCard from "../components/nodecard/NodeCard"
import styles from "./page.module.css"
import { Typechain, INode } from "../types"
import axios from "axios"

const options = ['All', 'Bitcoin', 'Ethereum'];
const keyMap = new Map([
    ['All', 'all'],
    ['Bitcoin', 'btc'],
    ['Ethereum', 'eth']
])
export default function Page() {
    const [val, setVal] = useState('All')
    const [originData, setOriginData] = useState<INode[]>([]);
    const [data, setData] = useState<INode[]>([]);

    const handleChange = (item: string) => {
        setVal(item);
    };

    const apiGetNodes = async (params?: { [key: string]: string}) => {
        const res = await axios.get('/api/nodes', { params });
        if(res.status === 200){
            setOriginData(res.data);
            setData(res.data)
        }
    }

    useEffect(() => {
        apiGetNodes();
    }, [])

    useEffect(() => {
        const key = keyMap.get(val);
        if(key === 'all'){
            setData(originData)
        }else{
            const newData = originData.filter(item => {
                return item.chain === key;
            })
            setData(newData)
        }
    }, [val, originData])

    return <div className={styles.nodesWrapper}>
        <div className={styles.nodesHeader}>
            <div className={styles.nodeRadios}>
                {
                    options.map(item => {
                        return <Button className={styles.nodeButton} onClick={() => {handleChange(item)}} key={item} type={val === item ? "primary" : "default"}>{item}</Button>
                    })
                }
            </div>
            <EasySearch placeholder="Search by Address / Txn / Hash / Blob / Commitment"></EasySearch>
        </div>
        <div className={styles.nodeContent}>
            {
                data.map((item, index) => {
                    return <NodeCard key={index} node={item}></NodeCard>
                })
            }
        </div>
    </div>
}