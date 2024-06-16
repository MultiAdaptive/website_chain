"use client"
import { useState } from "react";
import { Input, Select, message } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { useRouter } from "next/navigation";
import axios from "axios";
import { ISearchBlobParams } from "../../types"
import styles from "./EasySearch.module.css"

const Search = Input.Search;
const options = [
    {
        value: 'All Filters',
        label: 'All Filters'
    },
    {
        value: 'BlobID',
        label: 'BlobID'
    },
    {
        value: 'BlockNum',
        label: 'BlockNum'
    },
    {
        value: 'Validator',
        label: 'Validator'
    },
    {
        value: 'TxHash',
        label: 'TxHash'
    },
    {
        value: 'Commitment',
        label: 'Commitment'
    },
 
]
export default function EasySearch(props: { placeholder?: string, onSearch?: (key: string, value: string) => void }) {
    const { placeholder, onSearch } = props;
    const router = useRouter();
    const [current, setCurrent] = useState<string>("All Filters")

    function handleChange(val: string) {
        setCurrent(val)
    }

    async function apiSearchBlob(params?: ISearchBlobParams) {
        const res = await axios.get("/api/search", {
            params
        })
        if(res.status === 200){
            if(res.data === null){
                message.warning({
                    className: styles.messageStyle,
                    content: <div style={{display:'inline-block', textAlign: 'left'}}>
                        <p>Nothing was found </p>
                        <p>Use the hash of a block, transaction, </p>
                        <p>address or namespace for correct search</p>
                    </div>
                })
            }else{
                const blob = res.data[0];
                const chain = blob.chain || "btc";
                router.push(`/blobs/detail/?blobID=${blob.BlobID}&chain=${chain}`)
            }
        }
    }

    function handleSearch(key: string, value: string) {
        if(onSearch instanceof Function){
            onSearch(key, value);
        }
        apiSearchBlob({
            q: value,
            category: key === "All Filters" ? "All" : key
        })
    }

    return  <div className={styles.easySearchContainer}>
        <div className={styles.rightBox}>
            <Select defaultValue={"All Filters"} className={styles.easySearchSelect} options={options} onChange={handleChange}/>
            <Search 
                className={styles.easySearch} 
                enterButton={<SearchOutlined className={styles.searchIcon}/>}
                placeholder={placeholder} 
                onSearch={(val) => {handleSearch(current, val)}}
            />
        </div>
    </div>
}