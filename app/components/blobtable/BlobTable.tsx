"use client"
import { useEffect, useState } from 'react';
import { Table, TableColumnType, TablePaginationConfig } from 'antd';
import { useRouter } from 'next/navigation';
import { upperFirstCase } from '@/app/utils';
import { IPagination, IBlob } from '@/app/types';
import styles from './BlobTable.module.css';

const BlobTable: React.FC<{
    chain: string,
    blobList: Array<IBlob>, 
    pagination: IPagination, 
    handlePaginate: (current: number, pageSize: number) => void
  }> = ({chain, blobList, pagination, handlePaginate}) => {
  const router = useRouter();
  const [cols, setCols] = useState<Array<TableColumnType<{key: string} & IBlob>>>([])
  const [data, setData] = useState<Array<{key: string} & IBlob> >([]);

  function handleRouter(BlobID: number){
    router.push(`/blobs/detail?blobID=${BlobID}&chain=${chain}`)
  }

  function calcTableData(list: Array<IBlob>) {
    const columns: Array<TableColumnType<{key: string} & IBlob>> = [];
    const dataSource: Array<{key: string} & IBlob> = [];
    list.forEach((item, index) => {
        if(index === 0){
            for(let key in item){
              let obj: any = {
                title: upperFirstCase(key),
                dataIndex: key,
                key: key,
              }
              if(key === 'Commitment') obj.width = 120;
              if(key === 'State') { 
                obj.width = 120;
                obj.fixed = 'right';
                obj.render = (val: string, blob: IBlob) => {
                  return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'}}>
                    <span>{val}</span>
                    <img style={{cursor: 'pointer'}} src="/table_arrow.svg" alt="arrow" onClick={() => {handleRouter(blob.BlobID)}}/>
                  </div>
                }
              }
              columns.push(obj);
            }
        }
        dataSource.push({
            key: `${index}`,
            ...item
        })
    })

    return { columns, dataSource };
  }

   useEffect(() => {
    const { columns, dataSource } = calcTableData(blobList);
    setCols(columns);
    setData(dataSource);
   }, [blobList])

  return (
    <Table
      className={styles.table}
      scroll={{ x: 1200 }}
      style={{width: '100%'}}
      dataSource={data}
      columns={cols}
      onChange={(pagination: TablePaginationConfig) => {
        handlePaginate(pagination.current || 1, pagination.pageSize || 10)
      }}
      pagination={{ 
        current: pagination.page,
        total: pagination.total,
        pageSize: pagination.perPage,
        showSizeChanger: false
     }}
    />
  );
};

export default BlobTable;