"use client"
import { INode } from '@/app/types'
import styles from './NodeCard.module.css'
import clsx from 'clsx'
import Image from 'next/image'
import broadcast_blue from '../../../public/broadcast_blue.svg';
import broadcast_orange from '../../../public/broadcast_orange.svg';
import storage_blue from '../../../public/storage_blue.svg';
import storage_orange from '../../../public/storage_orange.svg';

export default function NodeCard({ node } : {node: INode}){

    function getCardIcon(node: INode) {
        var logo = broadcast_orange
        let key = node.node_type.split(' ')[0].toLowerCase();
        if(node.chain === 'eth'){
            if(key=='broadcast'){
                logo= broadcast_blue
            }else{
                logo= storage_blue
            }
        }else{
            if(key=='broadcast'){
                logo= broadcast_orange
            }else{
                logo= storage_orange
            }
        }
        return logo;
    }
    return <div className={clsx(styles.cardContainer, node.chain === 'eth' && styles.blue)}>
        <div className={styles.square}>
            <div className={styles.cardHeader}>
                <Image className={styles.cardIcon} src={getCardIcon(node)} alt="icon" width={20} height={20}/>
                <p>{node.name}</p>
                <p>{node.node_string}</p>
            </div>
            <div className={styles.cardContent}>
                {node.node_address}          
            </div>
            <div className={styles.cardFooter}>
                <p>Chain: {node.chain}</p>
                <p>Stake: {node.staked_tokens}</p>
                <p>{node.node_type}</p>
            </div>
        </div>
    </div>
}