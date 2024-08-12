"use client"
import axios from "axios";
import { useState, useContext, useRef, useCallback } from "react";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { If, Then, Else } from "react-if";
import BlobSortCard from "@/app/components/blobsortcard/BlobSortCard";
import BlobTable from "@/app/components/blobtable/BlobTable";
import BlobContext from "../context";
import styles from "./page.module.css";
import { IPagination, IBlob } from '@/app/types';
import { useMount, useUpdateEffect } from "ahooks";
import { debounce } from "lodash";

export default function Page() { 
    const router = useRouter();
    const store = useContext(BlobContext);

    const [loading, setLoading] = useState(false);
    // 分页
    const paginationRef = useRef<IPagination>({
        page: 1,
        per_page: 12
    })
    // 表格总数据条数
    const [total, setTotal] = useState<number>(0)
    // 卡片列表数据
    const [blobList, setBlobList] = useState<Array<IBlob>>([]);

    function isScrollToBottom() {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        
        return scrollTop + clientHeight >= scrollHeight;
    }

    const apiGetEthBlobList = async (params?: any) => {
        const res = await axios.get("/api/show-blob", { params });
        if(res.status === 200){
            return res.data;
        }
    }

    const getAndTransferData = useCallback(debounce(async(params?: any) => {
        if(loading) return;
        setLoading(true)
        const res = await apiGetEthBlobList(params)
        const { data, pagination } = res;
        data.sort((a: IBlob, b: IBlob) => {
            const keyMap = new Map([
                ['index', 'index'],
                ['fee', 'fee'],
                ['size', 'length'],
                ['state', 'state']
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
        setTotal(pagination.total);
        setLoading(false);
        if(!data) {
            return;
        }
        if(store.mode === 'list'){
            setBlobList([...blobList, ...data]);
        }else{
            setBlobList(data);
        }
    }, 100), [blobList, total, store.mode])

    function handleRouter(commitment_hash: string, blob_id: number) {
        router.push(`/blobs/detail?commitment_hash=${commitment_hash}&chain=eth&id=${blob_id}`)
    }

    function handlePaginate(current: number, _pageSize: number) {
        paginationRef.current = {
            ...paginationRef.current,
            page: current
        }
        getAndTransferData(paginationRef.current);
    }

    const handleLoadMore = useCallback(() => {
        if(loading) return;
        if(total <= paginationRef.current.per_page * paginationRef.current.page) return;
        if(store.mode !== 'list') return;
        const reachBottom = isScrollToBottom();
        if(reachBottom){
            paginationRef.current = {
                ...paginationRef.current,
                page: paginationRef.current.page + 1
            }
            getAndTransferData(paginationRef.current);
        }
    }, [loading, store.mode, total])

    useMount(() => {
        getAndTransferData(paginationRef.current);
    })

    useUpdateEffect(() => {
        setBlobList([]);
        setTotal(0);
        paginationRef.current = {
            page: 1,
            per_page: 12
        };
    }, [store.mode])

    useUpdateEffect(() => {
        if(blobList?.length === 0 && total === 0){
            getAndTransferData(paginationRef.current);
        }
    }, [total, blobList])

    useUpdateEffect(() => {
        if(loading){
            document.removeEventListener('scroll', handleLoadMore)
        }else{
            if(total > blobList?.length && store.mode === 'list'){
                setTimeout(() => {
                    document.addEventListener('scroll', handleLoadMore)
                }, 16);
            }else{
                document.removeEventListener('scroll', handleLoadMore)
            }
        }
        return () => {
            document.removeEventListener('scroll', handleLoadMore)
        }
    }, [loading])

    return <div className={`flex flex-wrap ${styles.page_wrapper}`}>
        <div className={`fmt-16 mt-4 ${styles.list_wrapper}`}>
            <If condition={store.mode === 'list'}>
                <Then>
                    <If condition={blobList?.length > 0}>
                        <Then>
                            {
                                blobList.map((blob, index) => {
                                   return <BlobSortCard sortKey={store.sortKey} onClickHandle={() => {if(blob) handleRouter(blob.commitment_hash,blob.blob_id)}} key={index} blob={blob} chain='eth'/>
                                })
                            }
                        </Then>
                        <Else>
                            <div style={{width: '100%', marginTop: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                {loading ? <Spin></Spin> : null}
                            </div>
                        </Else>
                    </If>
                </Then>
                <Else>
                    {
                        <BlobTable loading={loading} blobList={blobList} pagination={{...paginationRef.current, total}} handlePaginate={handlePaginate} chain='eth'/>
                    }
                </Else>
            </If>
        </div>
        <div style={{width: '100%', marginTop: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {store.mode === 'list' && blobList?.length > 0 && loading ? <Spin></Spin> : null}
        </div>
    </div>;
}
 