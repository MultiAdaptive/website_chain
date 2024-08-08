"use client"
import { SwapOutlined, UnorderedListOutlined,AppstoreOutlined } from "@ant-design/icons"
import { TypeSortKey } from "../../types"
import { upperFirstCase } from "@/app/utils"
import styles from "./SortBar.module.css"
import clsx from "clsx"
import Image from 'next/image'
import checkPic from '../../../public/index_check.svg'


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
                            sortKey ===  key   ?<Image src={checkPic} className={styles.indexCheck} alt="index check"  width={16} priority />: <SwapOutlined className={styles.icon}/>
                        }
                        <span>{upperFirstCase(key)}</span>
                    </div>
                })
            }
        </div>
        {
            mode === 'list' && <UnorderedListOutlined style={{ fontSize: '16px', color: '#4682C8' }} onClick={() => { toggleListMode && toggleListMode()}}/>
        }
        {
            
            mode === 'table' && <AppstoreOutlined style={{ fontSize: '16px', color: '#4682C8' }} onClick={() => { toggleListMode && toggleListMode()}}/>
        }
        
         {/* <picture>
             <source srcSet="https://example.com/hero.avif" type="image/avif" />
             <source srcSet="https://example.com/hero.webp" type="image/webp" />
             <img
               src="https://example.com/hero.jpg"
               alt="Landscape picture"
               width={800}
               height={500}
             />
           </picture> */}
         
    </div>
}