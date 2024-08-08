
"use client"
import { useEffect, useState } from "react";
import { Button } from "antd";
import ValidateCard from "../components/validatecard/ValidateCard"
import EasySearch from "../components/easysearch/EasySearch";
import axios from "axios"
import { IValidator } from "@/app/types" 
import styles from "./page.module.css"

const options = ['All Nodes', 'Bitcoin Nodes', 'Ethereum Nodes'];
const keyMap = new Map([
    ['All Nodes', 'all'],
    ['Bitcoin Nodes', 'btc'],
    ['Ethereum Nodes', 'eth']
])
export default function Page() {
    const [val, setVal] = useState('All Nodes')
    const [originValidators, setOriginValidators] = useState<IValidator[]>([]);
    const [validators, setValidators] = useState<Array<IValidator>>([]);

    const handleChange = (item: string) => {
        setVal(item);
    };

    const apiGetValidators = async (params?: any) => {
        const res = await axios.get("/api/getValidator", { params });
        if(res.status === 200){
            setValidators(res.data);
            setOriginValidators(res.data);
        }
    }

    function handleSearch(key: string, value: string) {
        if(key === "Bitcoin"){
            apiGetValidators()
        }else{
            apiGetValidators({
                [key]: value
            })
        }
    }

    useEffect(() => {
        apiGetValidators();
    }, [])

    useEffect(() => {
        const key = keyMap.get(val);
        if(key === 'all'){
            setValidators(originValidators)
        }else{
            const newData = originValidators.filter(item => {
                return item.chain === key;
            })
            setValidators(newData)
        }
    }, [originValidators])

    return <div className={styles.validatorWrapper}>
        <div className={styles.validatorHeader}>
            <div className={styles.validatorRadios}>
                {
                    options.map(item => {
                        return <Button onClick={() => {handleChange(item)}} key={item} type={val === item ? "primary" : "default"}>{item}</Button>
                    })
                }
            </div>
            <EasySearch onSearch={handleSearch}></EasySearch>
        </div>
        <div className={styles.validatorContent}>
            {
                validators.map((item, index) => {
                    return <ValidateCard key={index} validator={item} />
                })
            }
        </div>
    </div>
}