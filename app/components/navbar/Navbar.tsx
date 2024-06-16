"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Select } from "antd";
import clsx from "clsx"
import styles from "./Navbar.module.css"
import { upperFirstCase } from "@/app/utils"

const MENULIST = ['/', '/blobs', '/nodes']

export function Navbar() {
    const router = useRouter();
    const [menuType, setMenuType] = useState<'nav' | 'select'>();
    const [activeIndex, setActiveIndex] = useState(0);

    const pathname = usePathname();

    function handleSelectChange(val: number) {
        setActiveIndex(val)
        router.push(MENULIST[val]);
    }

    function handleMediaQueryChange(e: MediaQueryListEvent) {
        if(e.matches){
            setMenuType('select')
        }else{
            setMenuType('nav')
        }
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 599px)');
        if(mediaQuery.matches){
            setMenuType('select')
        }else{
            setMenuType('nav')
        }
        mediaQuery.addEventListener('change', handleMediaQueryChange)
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        }
    }, [])

    return <div className={styles.navbar} >
        <div className={styles.logo} onClick={() => router.push('/')}>
            <Image
                src="/logo.svg"
                alt="Logo"
                width={100}
                height={48}
                priority
                />
        </div>
        {
            menuType === 'nav' && <ul>
            {
                MENULIST.map((link, index) => {
                    return <li key={index} onClick={() => setActiveIndex(index)}>
                        <Link className={clsx(styles.link, pathname.split('/')[1] === link.split('/')[1] && styles.activeLink)} href={link}>{upperFirstCase(link.split('/')[1] || 'explore')}</Link>
                    </li>
                })
            }   
            </ul> 
        }
        {
            menuType === 'select' && <Select
            value={activeIndex}
            onChange={handleSelectChange}
            options={
                MENULIST.map((link, index) => {
                    return { value: index, label: upperFirstCase(link.split('/')[1] || 'explore')}
                })
            }
        ></Select>
        }
    </div>
}