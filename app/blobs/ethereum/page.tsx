"use client"
import axios from "axios";
import { useEffect, useState, useContext, useCallback } from "react";
import { useRouter } from "next/navigation";
import BlobSortCard from "@/app/components/blobsortcard/BlobSortCard";
import BlobContext from "../context";
import BlobTable from "@/app/components/blobtable/BlobTable";
import styles from './page.module.css';
import { IPagination, IBlob } from '@/app/types';

export default function Page() {
    const router = useRouter();
    const store = useContext(BlobContext);
    const [paginateParams, setPaginateParams] = useState<any>({
        page: 1
    })
    const [pagination, setPagination] = useState<IPagination>({
        page: 1,
        perPage: 10,
        total: 0
    });
    const [blobList, setBlobList] = useState<Array<IBlob>>([]);


    const apiGetEthBlobList = useCallback(async (params?: any) => {
        const res = await axios.get("/api/eth-blobs", { params });
        // const res = await axios.get("/api/eth-blobs", { params: {...params, filter: store.sortKey} });
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
                if(key) return (b[key as keyof IBlob] as number) - (a[key as keyof IBlob] as number)
                
            })
            setBlobList(list);
            setPagination(res.data.pagination)
        }
    }, [store.sortKey])

    function handleRouter(BlobID: number, chain: string = 'eth') {
        router.push(`/blobs/detail?blobID=${BlobID}&chain=${chain}`)
    }

    function handlePaginate(current: number, _pageSize: number) {
        setPaginateParams({
            page: current,
        })
    }

    useEffect(() => {
        apiGetEthBlobList({
            chain: 'eth',
            ...paginateParams
        })
    }, [paginateParams, apiGetEthBlobList])

    return <div className={`flex flex-wrap ${styles.page_wrapper}`}>
        <div className={`fmt-16 mt-4 ${styles.list_wrapper}`}>
            {
                store.mode === 'list' ? <>
                {
                    blobList.map((blob, index) => {
                        return <BlobSortCard sortKey={store.sortKey} onClickHandle={() => {if(blob) handleRouter(blob.BlobID)}} key={index} blob={blob}/>
                    })
                }
                </> : <BlobTable chain="eth" blobList={blobList} pagination={pagination} handlePaginate={handlePaginate}/>
            }
        </div>
    </div>;
}