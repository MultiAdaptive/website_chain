"use client"
import axios from "axios";
import { useEffect, useState, useContext, useCallback } from "react";
import { useRouter } from "next/navigation";
import BlobSortCard from "@/app/components/blobsortcard/BlobSortCard";
import BlobTable from "@/app/components/blobtable/BlobTable";
import BlobContext from "../context";
import styles from "./page.module.css";
import { IPagination, IBlob } from '@/app/types';
import { chain } from "lodash";

export default function Page() {
    const router = useRouter();
    const store = useContext(BlobContext);
    const [pagination, setPagination] = useState<IPagination>({
        page: 1,
        perPage: 10,
        total: 0
    });
    const [paginateParams, setPaginateParams] = useState<any>({
        page: 1
    })
    const [blobList, setBlobList] = useState<Array<IBlob>>([]);

    const apiGetBtcBlobList = useCallback(async (params?: any) => {
        const res = await axios.get("/api/btc-blobs", { params });
        if(res.status === 200){
            let list = res.data.data;
            list.sort((a: IBlob, b: IBlob) => {
                const keyMap = new Map([
                    ['index', 'BlobID'],
                    ['fee', 'Fee'],
                    ['size', 'Size'],
                    ['state', 'State']
                ])
                const key = keyMap.get(store.sortKey)
                // state状态 invalid排在前面
                if(store.sortKey === 'state'){
                    if(a['State'] !== 'valid' && b['State'] === 'valid'){
                        return 1;
                    }else{
                        return - 1;
                    }
                }else{
                    if(key) return (b[key as keyof IBlob] as number) - (a[key as keyof IBlob] as number)
                }
            })
            setBlobList(list);
            setPagination(res.data.pagination)
        }
    }, [store.sortKey])

    function handleRouter(BlobID: number, chain: string = 'btc') {
        router.push(`/blobs/detail?blobID=${BlobID}&chain=${chain}`)
    }

    function handlePaginate(current: number, _pageSize: number) {
        setPaginateParams({
            page: current
        })
    }

    useEffect(() => {
        apiGetBtcBlobList({
            chain: 'btc',
            ...paginateParams
        })
    }, [paginateParams, apiGetBtcBlobList])

    return <div className={`flex flex-wrap ${styles.page_wrapper}`}>
        <div className={`fmt-16 mt-4 ${styles.list_wrapper}`}>
            {
                store.mode === 'list' ? <>
                {
                    blobList.map((blob, index) => {
                        return <BlobSortCard sortKey={store.sortKey} onClickHandle={() => {if(blob) handleRouter(blob.BlobID)}} key={index} blob={blob}/>
                    })
                }
                </> : <BlobTable chain="btc" handlePaginate={handlePaginate} blobList={blobList} pagination={pagination}/>
            }
        </div>
    </div>;
}