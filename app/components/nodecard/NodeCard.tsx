"use client"
import { INode } from '@/app/types'
import styles from './NodeCard.module.css'
import clsx from 'clsx'

export default function NodeCard({ node } : {node: INode}){

    function getCardIcon(node: INode) {
        let color = 'orange';
        let key = node.node_type.toLowerCase();
        if(node.chain === 'eth'){
            color = 'blue';
        }
        return `/${key}_${color}.svg`;
    }

    return <div className={clsx(styles.cardContainer, node.chain === 'eth' && styles.blue)}>
        <div className={styles.square}>
            <div className={styles.cardHeader}>
                <img className={styles.cardIcon} src={getCardIcon(node)} alt="icon" />
                <p>{node.node_string}</p>
            </div>
            <div className={styles.cardContent}>
                {node.node_address}          
            </div>
            <div className={styles.cardFooter}>
                <p>Chain: {node.chain}</p>
                <p>Node: {node.node_type}</p>
            </div>
        </div>
    </div>
}