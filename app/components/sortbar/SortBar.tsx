"use client"
import { SwapOutlined, UnorderedListOutlined } from "@ant-design/icons"
import { TypeSortKey } from "../../types"
import { upperFirstCase } from "@/app/utils"
import styles from "./SortBar.module.css"
import clsx from "clsx"

const SORT_KEYS: Array<TypeSortKey> = ["index", "fee", "size", "state"];

interface ISortbarProps {
    sortKey: TypeSortKey,
    changeSortKey: (key: TypeSortKey) => void,
    mode: 'list' | 'table', 
    toggleListMode: () => void
}
export default function SortBar({ sortKey, mode, toggleListMode, changeSortKey }: ISortbarProps) {
    return <div className={styles.sortbar}>
        <div className={styles.sortbox}>
            {
                SORT_KEYS.map(key => {
                    return <div key={key} className={clsx(styles.singleSort, {
                        [styles.activeSort]: sortKey === key
                    })} onClick={() => { changeSortKey(key) }}>
                        {
                            sortKey === 'index' && key === 'index' ? <img className={styles.indexCheck} src="/index_check.svg" alt="index check" /> : <SwapOutlined className={styles.icon}/>
                        }
                        <span>{upperFirstCase(key)}</span>
                    </div>
                })
            }
        </div>
        {
            mode === 'list' && <UnorderedListOutlined onClick={() => { toggleListMode && toggleListMode()}}/>
        }
        {
            mode === 'table' && <img src="/list.svg" className={styles.listIcon} onClick={() => { toggleListMode && toggleListMode()}}/>
        }
    </div>
}