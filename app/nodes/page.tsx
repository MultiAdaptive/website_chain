"use client"
import { useEffect, useState } from "react"
import { Button, ConfigProvider } from "antd"
import EasySearch from "../components/easysearch/EasySearch"
import NodeCard from "../components/nodecard/NodeCard"
import styles from "./page.module.css"
import { Typechain, INode } from "../types"

const options = ['All', 'Bitcoin', 'Ethereum'];
const keyMap = new Map([
    ['All', 'all'],
    ['Bitcoin', 'btc'],
    ['Ethereum', 'eth']
])

export default function Page() {

    const [val, setVal] = useState('All')
    const [data, setData] = useState<INode[]>([]);

    const handleChange = (item: string) => {
        setVal(item);
    };

    useEffect(() => {
        const nodes = JSON.parse(localStorage.getItem('nodes') || '[]');
        const key = keyMap.get(val);
        if (key === 'all') {
            setData(nodes)
        } else {
            const newData = nodes.filter((item: INode) => {
                return item.chain === key;
            })
            setData(newData)
        }
    }, [val])

    return <div className={styles.nodesWrapper}>
        <ConfigProvider
        theme={{
            components: {
                Button: {
                    colorPrimary: '#4682C8',
                    algorithm: true,  
                },
            },
        }}
        >
        <div className={styles.nodesHeader}>
            <div className={styles.nodeRadios}>
                {
                    options.map(item => {
                        return <Button className={styles.nodeButton} onClick={() => { handleChange(item) }} key={item} type={val === item ? "primary" : "default"}>{item}</Button>
                    })
                }
            </div>
            <EasySearch placeholder="Search by Address / Txn / Hash / Commitment"></EasySearch>
        </div>
        </ConfigProvider>
        <div className={styles.nodeContent}>
            {
                Array.isArray(data) && data?.map((item, index) => {
                    return <NodeCard key={index} node={item}></NodeCard>
                })
            }
        </div>
    </div>
}