"use client"
import { useEffect, useState } from 'react';
import { Table, TableColumnType, TablePaginationConfig, Image } from 'antd';
import { useRouter } from 'next/navigation';
import { getTimeSince, getHash, isTimestampMoreThan14DaysAgo } from '@/app/utils';
import { IPagination, IBlob } from '@/app/types';
import styles from './BlobTable.module.css';

const BlobTable: React.FC<{
  loading: boolean,
  blobList: Array<IBlob>,
  pagination: IPagination,
  handlePaginate: (current: number, pageSize: number) => void,
  chain: string
}> = ({ loading, blobList, pagination, handlePaginate, chain }) => {
  const router = useRouter();
  const [cols, setCols] = useState<Array<TableColumnType<{ key: string } & IBlob>>>([])
  const [data, setData] = useState<Array<{ key: string } & IBlob>>([]);

  function handleRouter(commitment_hash: string, blob_id: number, chain: string) {
    router.push(`/blobs/detail?commitment_hash=${commitment_hash}&chain=${chain}&id=${blob_id}`)

  }

  function calcTableData(list: Array<IBlob>) {
    const columns: Array<TableColumnType<{ key: string } & IBlob>> = [];
    const dataSource: Array<{ key: string } & IBlob> = [];
    let found = false;
    list.forEach((item, index) => {
      if (index === 0) {

        for (let key in item) {

          var title_show
          if (key == 'blob_id') {
            title_show = 'Index'
          } else if (key == 'commitment_hash'||key == 'hash_show') {
            title_show = 'Commitment'
          } else if (key == 'receive_at'||key == 'age_show') {
            title_show = 'Age'
          } else if (key == 'length') {
            title_show = 'Size'
          } else if (key == 'block_num') {
            title_show = 'Block'
          } else if (key == 'fee') {
            title_show = 'Fee'
          } else if (key == 'validators'||key == 'v_show') {
            title_show = 'Validator'
          } else if (key == 'tx_hash'||key=='store_show') {
            title_show = 'StorageState'
          } 
          let obj: any = {
            title: title_show,
            dataIndex: key,
            key: key,
          } 

          // if (   obj.title=='StorageState') {
          //   // obj.fixed = 'right';

          //   obj.render = (val: string, blob: IBlob) => {
          //     return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          //       <span>{val}</span>
          //       <Image width={20} height={20}
          //         style={{ cursor: 'pointer' }} src="/table_arrow.svg" alt="arrow" onClick={() => { handleRouter(blob.commitment_hash, blob.blob_id, chain) }}
          //       />
          //     </div>
          //   }
          // }
          if(obj.key=='blob_id'||obj.key=='hash_show'||obj.key=='block_num'||obj.key=='length'||obj.key=='store_show'||obj.key=='fee'||obj.key=='v_show'||obj.key=='age_show'){
            columns.push(obj);
          }
          if (key === 'store_show') {
            found = true;
            break;
          }
        }
        let obj1 = {
          title: 'Commitment',
          dataIndex: 'hash_show',
          key: 'hash_show'
        };
        let obj2 = {
          title: 'Age',
          dataIndex: 'age_show',
          key: 'age_show'
        };
        let obj3 = {
          title: 'Validator',
          dataIndex: 'v_show',
          key: 'v_show'
        };
        let obj4 = {
          title: 'StorageState',
          dataIndex:'store_show',
          key:'store_show'
        };
        
        let objects = [obj1, obj2, obj3, obj4];
        
        if (!found) {
          objects.forEach(obj => columns.push(obj));
        }
      }
      
     
      for (let key in item) {
        
        const targetDate = new Date(item.receive_at).getTime();

        item.hash_show = getHash(item.commitment_hash) + ""
        item.age_show = getTimeSince(targetDate)
        item.v_show = Array.from(getHash(item.validators[0]) + "")
        item.store_show = isTimestampMoreThan14DaysAgo(targetDate) ? 'Invalid' : "Valid"
      }
      // for (let key in item) {
      //   console.log(item.commitment_hash.length)
      //   if (item.commitment_hash.length == 13) {
      //     if (key == 'commitment_hash') {
      //       item.commitment = item.commitment_hash

      //     } else if (key == 'tx_hash') {
      //       const targetDate = new Date(item.receive_at).getTime();
      //       var bb = isTimestampMoreThan14DaysAgo(targetDate)
      //       item.tx_hash = bb ? 'Invalid' : "Valid"
      //     } else if (key == 'validators') {
      //       var aa = getHash(item.validators[0])
      //       item.validators = Array.from(aa + "")
      //     }

      //   } else {
      //     if (key == 'receive_at') {
      //       const targetDate = new Date(item.receive_at).getTime();
      //       item.receive_at = getTimeSince(targetDate)
      //     } else if (key == 'commitment_hash') {
      //       item.commitment = item.commitment_hash

      //       item.commitment_hash = getHash(item.commitment_hash) + ""
      //     }
      //   }

      // }
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
      style={{ width: '100%' }}
      dataSource={data}
      columns={cols}
      loading={loading}
      onChange={(pagination: TablePaginationConfig) => {
        handlePaginate(pagination.current || 1, pagination.pageSize || 10)
      }}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            handleRouter(record.commitment_hash, record.blob_id, chain)
          }, // click row

        };
      }}
      pagination={{
        current: pagination.page,
        total: pagination.total,
        pageSize: pagination.per_page,
        showSizeChanger: false
      }}
    />
  );
};

export default BlobTable;