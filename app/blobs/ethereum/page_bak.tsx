"use client"
import axios from "axios";
import { useEffect, useState, useContext, useCallback } from "react";
import { useRouter } from "next/navigation";
import BlobSortCard from "@/app/components/blobsortcard/BlobSortCard";
import BlobContext from "../context";
import BlobTable from "@/app/components/blobtable/BlobTable";
import styles from './page.module.css';
import { IPagination, IBlob } from '@/app/types';
import { Else, If, Then } from "react-if";
import { Spin } from "antd";

export default function Page() {
    const router = useRouter();
    const store = useContext(BlobContext);
    const [paginateParams, setPaginateParams] = useState<any>({
        page: 1, 
        per_page: 12,
    })
    const [pagination, setPagination] = useState<IPagination>({
      

        page: 1,
        per_page: 12,
        total: 0
    });
    const [blobList, setBlobList] = useState<Array<IBlob>>([]);


    const apiGetEthBlobList = useCallback(async (params?: any) => {
        const res = await axios.get("/api/show-blob", { params });
        // const res = await axios.get("/api/eth-blobs", { params: {...params, filter: store.sortKey} });
        if(res.status === 200){
            let list = res.data.data;
            list.sort((a: IBlob, b: IBlob) => {
                const keyMap = new Map([
                    ['index', 'index'],
                    ['fee', 'fee'],
                    ['size', 'length'],
                    ['state', 'state']
                ])
                const key = keyMap.get(store.sortKey)
                if(key) return (b[key as keyof IBlob] as number) - (a[key as keyof IBlob] as number)
                
            })
            // for (let item in list) {
        
            // item.hash_show = getHash(item.commitment_hash) + ""
            // item.age_show = getTimeSince(targetDate)
            // item.v_show = Array.from(getHash(item.validators[0]) + "")
            // item.store_show = isTimestampMoreThan14DaysAgo(targetDate) ? 'Invalid' : "Valid"
            // }
            setBlobList(list);
            setPagination(res.data.pagination)
        }
    }, [store.sortKey])

    function handleRouter(commitment_hash: string, blob_id: number ) {
        router.push(`/blobs/detail?commitment_hash=${commitment_hash}&chain=eth&id=${blob_id}`)

    }

    function handlePaginate(current: number, _pageSize: number) {
        setPaginateParams({
            page: current,
            per_page: 12,
        })
    }

    useEffect(() => {
        apiGetEthBlobList({
            ...paginateParams
        })
    }, [paginateParams, apiGetEthBlobList])

    return <div className={`flex flex-wrap ${styles.page_wrapper}`}>
        <div className={`fmt-16 mt-4 ${styles.list_wrapper}`}>
            {
                store.mode === 'list' ? <>
                {
                    blobList.map((blob, index) => {
                        return <BlobSortCard sortKey={store.sortKey} onClickHandle={() => {if(blob) handleRouter(blob.commitment_hash,blob.blob_id)}} key={index} blob={blob} chain='eth'/>
                    })
                }
                </> : <BlobTable loading={false}  blobList={blobList} pagination={pagination} handlePaginate={handlePaginate} chain='eth'/>
            }
        </div>
    </div>;

    // return <div className={`flex flex-wrap ${styles.page_wrapper}`}>
    // <div className={`fmt-16 mt-4 ${styles.list_wrapper}`}>
    //     <If condition={store.mode === 'list'}>
    //         <Then>
    //             <If condition={blobList?.length > 0}>
    //                 <Then>
    //                     {
    //                         blobList.map((blob, index) => {
    //                         return <BlobSortCard  sortKey={store.sortKey} onClickHandle={() => {if(blob) handleRouter(blob.commitment_hash,blob.blob_id)}} key={index} blob={blob} chain='eth'/>
    //                         })
    //                     }
    //                 </Then>
    //                 <Else>
    //                     <div style={{width: '100%', marginTop: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    //                         {"cardLoading" ? <Spin></Spin> : null}
    //                     </div>
    //                 </Else>
    //             </If>
    //         </Then>
    //         <Else>
    //             <BlobTable loading={Boolean("tableLoading")} blobList={blobList} pagination={{...pagination,30}} handlePaginate={handlePaginate} chain='eth'/>
    //         </Else>
    //     </If>
    // </div>
    // <div style={{width: '100%', marginTop: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    //     {store.mode === 'list' && blobList?.length > 0 && "cardLoading" ? <Spin></Spin> : null}
    // </div>
    // </div>;
}