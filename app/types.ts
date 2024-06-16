interface IBlob {
    BlobID: number,
    Block: number,
    Commitment: string,
    Fee: number,
    State: string,
    Status: string,
    Timestamp: string,
    TxHash: string,
    Validator: string
}

interface IBlobDetail {
    BlobID: number,
    BlockNum: number,
    Commitment: string,
    Commitment_xy: {
        x: string,
        y: string
    }
    Data: string,
    Fee: number,
    Proof: string,
    Size: number,
    Status: string,
    StorageState: string,
    Timestamp: string,
    Validator: string,
    Hash?: string,
}

type TypeSortKey = 'index' | 'fee' | 'size' | 'state'

type TypeBlobMode = 'list' | 'table'

interface IPagination { total: number, page: number, perPage: number }

type Typechain = 'btc' | 'eth'

type TypeNodeType = 'Storage' | 'Broadcast'

interface INode {
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
    q: string,
    category: string
}

export type { IBlob, TypeSortKey, TypeBlobMode, IPagination, Typechain, TypeNodeType, INode, IValidator, IBlobDetail, ISearchBlobParams }