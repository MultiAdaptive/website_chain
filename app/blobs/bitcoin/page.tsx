"use client"
import axios from "axios";
import { useEffect, useState, useContext, useRef } from "react";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { If, Then, Else } from "react-if";
import BlobSortCard from "@/app/components/blobsortcard/BlobSortCard";
import BlobTable from "@/app/components/blobtable/BlobTable";
import BlobContext from "../context";
import { BotObserve } from "@/app/utils";
import styles from "./page.module.css";
import { IPagination, IBlob } from '@/app/types';

export default function Page() { 
    const router = useRouter();
    const store = useContext(BlobContext);
    const observeRef = useRef<BotObserve>();
    // 卡片loading
    const [cardLoading, setCardLoading] = useState<boolean>(true);
    // 表格loading
    const [tableLoading, setTableLoading] = useState<boolean>(true);
    // 卡片分页
    const [cardPagi, setCardPagi] = useState<IPagination>({
        page: 1,
        per_page: 12,
    });
    // 表格分页
    const [pagination, setPagination] = useState<IPagination>({
        page: 1,
        per_page: 12,
       
    });
    // 表格总数据条数
    const [total, setTotal] = useState<number>(0)
    // 卡片列表数据
    const [blobList, setBlobList] = useState<Array<IBlob>>([]);
    // 表格列表数据
    const [tableList, setTableList] = useState<Array<IBlob>>([]);

    const apiGetBtcBlobList = async (params?: any) => {
        const res = await axios.get("/api_btc/show-blob", { params });
        if(res.status === 200){
            return res.data;
        }
    }

    const dealDataForCard = async (params?: any) => {
        setCardLoading(true);
        const res = await apiGetBtcBlobList(params)
        const { data } = res;
        data?.sort((a: IBlob, b: IBlob) => {
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
        setCardLoading(false);
        setBlobList([...blobList, ...data]);
    }

    const dealDataForTable = async (params: any) => {
        setTableLoading(true);
        const res = await apiGetBtcBlobList(params)
        const { data, pagination } = res;
        data?.sort((a: IBlob, b: IBlob) => {
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
        setTotal(pagination.total ?? 0);
        setTableLoading(false);
        setTableList(data);
    }

    function handleRouter(commitment_hash: string, blob_id: number) {
        router.push(`/blobs/detail?commitment_hash=${commitment_hash}&chain=btc&id=${blob_id}`)
        
    }

    function handlePaginate(current: number, _pageSize: number) {
        setPagination({
            ...pagination,
            page: current
        })
    }

    const handleLoadMore = () => {
        const footer = document.getElementById('footer');
        const getIn = () => {
            setCardPagi({...cardPagi, page: cardPagi.page + 1})
        }
        const observe = new BotObserve({node: footer, getIn})
        return observe;
    }

    useEffect(() => {
        if(!cardLoading && store.mode === 'list') {
            observeRef.current = undefined;
            observeRef.current = handleLoadMore();
            return () => {
                observeRef.current?.disconnect();
            }
        }
    }, [cardLoading])

    useEffect(() => {
        if(store.mode === 'list'){
            dealDataForCard(cardPagi);
        }else{
            dealDataForTable(pagination);
        }
    }, [cardPagi, pagination])

    return <div className={`flex flex-wrap ${styles.page_wrapper}`}>
        <div className={`fmt-16 mt-4 ${styles.list_wrapper}`}>
            <If condition={store.mode === 'list'}>
                <Then>
                    <If condition={blobList?.length > 0}>
                        <Then>
                            {
                                blobList.map((blob, index) => {
                                   return <BlobSortCard  sortKey={store.sortKey} onClickHandle={() => {if(blob) handleRouter(blob.commitment_hash,blob.blob_id)}} key={index} blob={blob} chain='btc'/>
                                })
                            }
                        </Then>
                        <Else>
                            <div style={{width: '100%', marginTop: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                {cardLoading ? <Spin></Spin> : null}
                            </div>
                        </Else>
                    </If>
                </Then>
                <Else>
                    <BlobTable loading={tableLoading} blobList={tableList} pagination={{...pagination, total}} handlePaginate={handlePaginate} chain='btc'/>
                </Else>
            </If>
        </div>
        <div style={{width: '100%', marginTop: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {store.mode === 'list' && blobList?.length > 0 && cardLoading ? <Spin></Spin> : null}
        </div>
    </div>;
}
 