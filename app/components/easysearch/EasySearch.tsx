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
        value: 'Bitcoin',
        label: 'Bitcoin'
    },
    {
        value: 'Etheram',
        label: 'Etheram'
    }

]
export default function EasySearch(props: { placeholder?: string, onSearch?: (key: string, value: string) => void }) {
    const { placeholder, onSearch } = props;
    const router = useRouter();
    const [current, setCurrent] = useState<string>("Bitcoin")

    function handleChange(val: string) {
        setCurrent(val)
    }

    async function apiSearchBlob(params?: ISearchBlobParams) {
        const res = await axios.get("/api_btc/filter-blob", { params });

        if (res.status === 200) {
            if (res.data.data === null) {
                message.warning({
                    className: styles.messageStyle,
                    content: <div style={{ display: 'inline-block', textAlign: 'left' }}>
                        <p>Nothing was found </p>
                        <p>Use the hash of a block, transaction, </p>
                        <p>address or namespace for correct search</p>
                    </div>
                })
            } else {
                const blob = res.data.data[0];
                router.push(`/blobs/detail?commitment_hash=${blob.commitment_hash}&chain=btc&id=${blob.blob_id}`)

            }
        }
    }
    async function ethSearchBlob(params?: ISearchBlobParams) {
        const res = await axios.get("/api/filter-blob", { params });

        if (res.status === 200) {
            if (res.data === null) {
                message.warning({
                    className: styles.messageStyle,
                    content: <div style={{ display: 'inline-block', textAlign: 'left' }}>
                        <p>Nothing was found </p>
                        <p>Use the hash of a block, transaction, </p>
                        <p>address or namespace for correct search</p>
                    </div>
                })
            } else {
                const blob = res.data.data[0];
                router.push(`/blobs/detail?commitment_hash=${blob.commitment_hash}&chain=eth&id=${blob.blob_id}`)


            }
        }
    }

    function handleSearch(key: string, value: string) {
        if (onSearch instanceof Function) {
            onSearch(key, value);
        }
        if (key === "Bitcoin") {
            apiSearchBlob({
                filter: value,
                data_size: 0,
                per_page: 4,
                page: 1
            })
        } else {
            ethSearchBlob({
                filter: value,
                data_size: 0,
                per_page: 4,
                page: 1
            })
        }

    }

    return <div className={styles.easySearchContainer}>
        <div className={styles.rightBox}>
            <Select defaultValue={"Bitcoin"} className={styles.easySearchSelect} options={options} onChange={handleChange} />
            <Search
                className={styles.easySearch}
                enterButton={<SearchOutlined className={styles.searchIcon} />}
                placeholder={placeholder}
                onSearch={(val) => { handleSearch(current, val) }}
            />
        </div>
    </div>
}