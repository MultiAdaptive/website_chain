"use client"
import Link from "next/link"
import Image from "next/image"
import { throttle } from "lodash"
import styles from "./Footer.module.css"
import { useState, useEffect } from "react"

// const desText = 'MultiAdaptive is building the first Multi-Chain Data Availability Layer with true native support.'
export default function Footer() {
    const [descText, setDescText] = useState('');
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
    return <div className={styles.footer}>
        <div className={styles.footer_dev}>
            <Link href="">Developers</Link>
            <Link href="">Documentation</Link>
            <Link href="https://github.com/MultiAdaptive">Github</Link>
        </div>
        <div className={styles.footer_about}>
            <Link href="">About</Link>
            <Link href="https://contact@multiadaptive.com">Contact Us</Link>
            <Link href="">WhitePaper</Link>
        </div>
        <div className={styles.description}>
            {/* <p id="ellipsisText">{descText}</p> */}
                <div>MultiAdaptive is building the first Multi-Chain Data Availability Layer with true native support.</div>

            <div className={styles.des_image}>
                {/* <Image src="/telegram.svg" width={24} height={24} alt="logo" /> */}
               
                <Image src="/twitter.svg" width={24} height={24} alt="logo" />
                
            </div>
        </div>
    </div>
}