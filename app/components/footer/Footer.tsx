"use client"
import Link from "next/link"
import Image from "next/image"
import { throttle } from "lodash"
import styles from "./Footer.module.css"
import { useState, useEffect } from "react"
import { XOutlined} from '@ant-design/icons';

// const desText = 'MultiAdaptive is building the first Multi-Chain Data Availability Layer with true native support.'
export default function Footer() {
    // const [descText, setDescText] = useState('');
    // const applyEllipsis = throttle((element: HTMLElement, lines: number) => {
    //     const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
    //     const maxHeight = lineHeight * lines;
  
    //     if (element.scrollHeight >= maxHeight) {
    //       while (element.scrollHeight > maxHeight) {
    //         element.innerText = element.innerText.replace(/\W*\s(\S)*$/, '...');
    //       }
    //     }else{
    //         element.innerText = descText
    //     }
    // },0)

    // useEffect(() => {
    //     setDescText('MultiAdaptive is building the first Multi-Chain Data Availability Layer with true native support.')
    // }, [])

    // useEffect(() => {
    //     const ellipsisElement = document.getElementById('ellipsisText') as HTMLElement;
    //     const executeFn = () => {
    //         applyEllipsis(ellipsisElement, 3);
    //     }
    //     executeFn();
    //     window.addEventListener('resize', executeFn)
    //     return () => {
    //         window.removeEventListener('resize', executeFn)
    //     }
    // }, [applyEllipsis])
    // return <footer className="footer flex w-full px-40 py-10 items-center bg-slate-50 text-base-content mt-auto justify-between ">
    return <div className={styles.footer} id="footer">
        <div className={styles.footer_dev}>
            <Link href="" >Developers</Link>
            <Link href="https://github.com/MultiAdaptive/document" target="_blank"  className="text-sm basic_gray hover:basic_blue hover:underline">Documentation</Link>
            <Link href="https://github.com/MultiAdaptive"target="_blank"  className="text-sm basic_gray hover:basic_blue hover:underline">Github</Link>
        </div>
        <div className={styles.footer_about}>
            <Link href="">About</Link>
            <Link href="https://contact@multiadaptive.com" target="_blank" className="text-sm basic_gray hover:basic_blue hover:underline">Contact Us</Link>
            <Link href="https://docsend.com/view/b356nwj6k6mpukkp" target="_blank" className="text-sm basic_gray hover:basic_blue hover:underline">WhitePaper</Link>
        </div>
        <div className={styles.description}>
            {/* <p id="ellipsisText">{descText}</p> */}
                <div>MultiAdaptive is building the first Multi-Chain Data Availability Layer with true native support.</div>

            <div className={styles.des_image}>
               <a href="https://twitter.com/MultiAdaptive" target="_blank">
           
               <XOutlined style={{ fontSize: '20px', color: '#4682C8' }}  /> 
               </a>
                
            </div>
        </div>
    </div>
}