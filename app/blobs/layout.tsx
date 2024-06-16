"use client"
import { usePathname } from "next/navigation";
import DetailNavbar from "@/app/components/detailnavbar/DetailNavbar"
import SubNavbar from "@/app/components/subnavbar/SubNavbar";
import SortBar from "@/app/components/sortbar/SortBar";
import BlobContext, { BlobProvider } from "./context";
import { useContext } from "react";
import { TypeSortKey } from "../types";

export default function Layout({children}: { children: React.ReactNode}){
    const pathname = usePathname();
    
    return <BlobProvider>
        {
            pathname === '/blobs/detail' ? <DetailNavbarHoc/> : <>
                <SubNavbarHoc/>
                <SortBarHoc/>
            </>
        }
        {children}
    </BlobProvider>
}

// 利用高阶组件收敛页面级状态操作
function SortBarHoc(){
    const store = useContext(BlobContext);
    const { sortKey, mode, dispatchUpdateMode, dispatchUpdateSortKey } = store;

    function changeSortKey(key: TypeSortKey){
        dispatchUpdateSortKey({
            type: 'update',
            sortKey: key
        })
    }

    function toggleListMode() {
        dispatchUpdateMode({
            type: 'update',
            mode: store.mode === 'list' ? 'table' : 'list'
        })
    }

    return <SortBar sortKey={sortKey} mode={mode} toggleListMode={toggleListMode} changeSortKey={changeSortKey}></SortBar> 
}

function DetailNavbarHoc(){
    const store = useContext(BlobContext);
    const { dispatchSearchVal, currBlobNum } = store;
    
    return <DetailNavbar handleSearch={(key, value) => {
        dispatchSearchVal({
            type: 'update',
            searchVal: {
                key,
                value
            }
        })
    }} blobNum={currBlobNum}/>
}

function SubNavbarHoc(){
    const store = useContext(BlobContext);
    const { dispatchSearchVal } = store;
    
    return <SubNavbar handleSearch={(key, value) => {
        dispatchSearchVal({
            type: 'update',
            searchVal: {
                key,
                value
            }
        })
    }} />
}