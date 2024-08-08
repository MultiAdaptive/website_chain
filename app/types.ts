interface IBlob {
    v_show: string[]
    store_show: string
    age_show: string
    hash_show: string
    "blob_id": number,
    "commitment": string,
    "block_num": number,
    "receive_at": string,
    "length": number,
    "validators": Array<string>,
    "fee": string,
    "commitment_hash": string,
    "tx_hash": string,
    Commitment: string,
    Fee: string,
    State: string,
    Status: string,
    Timestamp: string,
    TxHash: string,
    Validator: string
    "sender": string,
    "data": string,
    "das_key": string,
    "sign_data": string,
    validator:  string,
    "parent_state_hash": string,
    "state_hash": string,
}

interface IBlobDetail {
    blob_id: number,
    commitment_hash: string,
    commitment: string,
    tx_hash: string,
    block_num: number,
    timestamp: string,
    validators: Array<string>,
    size: number,
    storage_state: string,
    Data: string,
    commitment_xy: {
        x: string,
        y: string
    }
    fee: string,
    data: string,
    proof: string,
    

}

type TypeSortKey = 'index' | 'fee' | 'size' | 'state'

type TypeBlobMode = 'list' | 'table'

interface IPagination { page: number, per_page: number, total?: number }

type Typechain = 'btc' | 'eth'

type TypeNodeType = 'Storage' | 'Broadcast'

interface INode {
    name: string,
    staked_tokens: string,
    node_string: string,
    node_address: string,
    chain: Typechain,
    node_type: TypeNodeType,
}

interface IValidator {
    "chain": string,
    "validator_name": string,
    "validator_address": string,
    "validator_status": string,
    "total_staked_amount": number,
    "available_staked_amount": number,
    "commission_rate": number,
    "voting_power": number,
    "status": string
}

interface ISearchBlobParams {
    filter: string,
    data_size: number,
    per_page: number,
    page: number
}

export type { IBlob, TypeSortKey, TypeBlobMode, IPagination, Typechain, TypeNodeType, INode, IValidator, IBlobDetail, ISearchBlobParams }