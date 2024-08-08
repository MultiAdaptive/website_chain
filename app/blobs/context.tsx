"use client"
import React, { useReducer, Reducer } from "react"
import { TypeBlobMode } from "../types";

const BlobContext = React.createContext<any>({});

function updateModeReducer(state: string, action: {
    type: string,
    mode: TypeBlobMode
}) {
    switch (action.type) {
      case 'update':
        return action.mode;
      default:
        return state;
    }
}

function updateSortKey(state: string, action: {
    type: string,
    sortKey: string
}) {
    switch (action.type) {
      case 'update':
        return action.sortKey;
      default:
        return state;
    }
}

function updateSearchVal(state: { key: string, value: any }, action: {
    type: string,
    searchVal: { key: string, value: any }
}) {
    switch (action.type) {
        case 'update':
          return action.searchVal;
        default:
          return state;
    }
}

function updateCurrBlobNum(state: string, action: { type: string, blobNum: string,chain: string }) {
    switch (action.type) {
        case 'update':
            return action.chain;
        case 'delete':
             return '';
        default:
            return state;
    }
}

export function BlobProvider({ children }: { children: React.ReactNode }){
    const [mode, dispatchUpdateMode] = useReducer<Reducer<string, {type: string, mode: TypeBlobMode}>>(updateModeReducer, 'list')
    const [sortKey, dispatchUpdateSortKey] = useReducer<Reducer<string, {type: string, sortKey: string}>>(updateSortKey, 'index')
    const [searchVal, dispatchSearchVal] = useReducer<Reducer<{ key: string, value: any }, {type: string, searchVal: { key: string, value: any }}>>(updateSearchVal, { key: 'Bitcoin', value: '' })
    const [currBlobNum, dispatchCurrBlobNum] = useReducer<Reducer<string, { type: string, blobNum: string,chain: string  }>>(updateCurrBlobNum, '')

    return <BlobContext.Provider
        value={{
            mode,
            dispatchUpdateMode,
            sortKey,
            dispatchUpdateSortKey,
            searchVal,
            dispatchSearchVal,
            currBlobNum,
            dispatchCurrBlobNum
        }}
    >
        {children}
    </BlobContext.Provider>
}

export default BlobContext;