"use client";
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { List, Menu, Card } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import type { SearchProps } from 'antd/es/input/Search';
import { Cascader, Input, Select, Space } from 'antd';
import axios from "axios";

const { Option } = Select;

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { Search } = Input;

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1677ff',
      }}
    />
  );
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
  const selectBefore = (
    <Select defaultValue="http://">
      <Option value="http://">All filters</Option>
      <Option value="https://">https://</Option>
    </Select>
  );
  //  const nav = getlayout
  const items_btc = [
    {
      title: '109',
      cm: '0x7b17...cda04b',
      block: '82,034',
      age: '1 min ago',
      v: '0x0179...169b8',
      fee: '128'

    },
    {
      title: '108',
      cm: '0x7b17...cda04b',
      block: '82,034',
      age: '1 min ago',
      v: '0x0179...169b8',
      fee: '128'
    },
    {
      title: '107',
      cm: '0x7b17...cda04b',
      block: '82,034',
      age: '1 min ago',
      v: '0x0179...169b8',
      fee: '128'
    },
    {
      title: '106',
      cm: '0x7b17...cda04b',
      block: '82,034',
      age: '1 min ago',
      v: '0x0179...169b8',
      fee: '128'
    },
    {
      title: '105',
      cm: '0x7b17...cda04b',
      block: '82,034',
      age: '1 min ago',
      v: '0x0179...169b8',
      fee: '128'
    },
  ];
  type MenuItem = Required<MenuProps>['items'][number];

  const items: MenuItem[] = [
    {
      label: 'Navigation One',
      key: 'mail',
      icon: <MailOutlined />,
    },
    {
      label: 'Navigation Two',
      key: 'app',
      icon: <AppstoreOutlined />,
      disabled: true,
    },
    {
      label: 'Navigation Three - Submenu',
      key: 'SubMenu',
      icon: <SettingOutlined />,
      children: [
        {
          type: 'group',
          label: 'Item 1',
          children: [
            { label: 'Option 1', key: 'setting:1' },
            { label: 'Option 2', key: 'setting:2' },
          ],
        },
        {
          type: 'group',
          label: 'Item 2',
          children: [
            { label: 'Option 3', key: 'setting:3' },
            { label: 'Option 4', key: 'setting:4' },
          ],
        },
      ],
    },
    {
      key: 'alipay',
      label: (
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      ),
    },
  ];
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  // useEffect(() => {
  //   axios.get('/api/blobLatest5').then(res => {
  //     console.log('NJF...', res)
  //   })
  // })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm ">

        {/* <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} /> */}

        <view className={styles.navbar} >
          <Image
            src="/logo.svg"
            alt="Logo"
            width={180}
            height={48}
            priority
          />
          <view></view>

          <ul>
            <li className={activeIndex === 0 ? styles.active : ''} onClick={() => setActiveIndex(0)}>
              <Link href="/"> Explore </Link>
            </li>
            <li className={activeIndex === 1 ? styles.active : ''} onClick={() => setActiveIndex(1)}>
              <Link href="/about">Blobs</Link>
            </li>
            <li className={activeIndex === 2 ? styles.active : ''} onClick={() => setActiveIndex(2)}>
              <Link href="/contact">Nodes</Link>
            </li>
            <li className={activeIndex === 3 ? styles.active : ''} onClick={() => setActiveIndex(3)}>
              <Link href="/contact">Validators</Link>
            </li>
          </ul>
        </view>


        <Search addonBefore={selectBefore} placeholder="Search by Address / Txn Hash / Blob/Comminent" onSearch={onSearch} enterButton />

        {/* <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p> */}
        {/* <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div> */}
      </div>

      {/* <div className="relative z-[-1]  place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"> */}
      <view>
        <view className="basic_blue font-bold text-base">Bitcoin Blobs</view>
        <view className="w-280 h-200 border-1 border-4682C8 bg-A2D8FF flex-col">
          All Blobs
          <List
            grid={{ gutter: 16, column: 5 }}
            dataSource={items_btc}
            renderItem={(item) => (
              <List.Item>
                <Card title={item.title}>
                  <p>cm:{item.cm}</p>
                  <p>block:{item.block}</p>
                  <p>age:{item.age}</p>
                  <p>v:{item.v}</p>
                  <p>{item.fee}sats</p>
                </Card>
              </List.Item>
            )}
          />

        </view>

      </view>
      <div>

        <p>Ethereum Blobs</p>
        <div>
          <p className="float-left">All Blobs</p>
        </div>
        <List
          grid={{ gutter: 16, column: 5 }}
          dataSource={items_btc}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.title}>Card content</Card>
            </List.Item>
          )}
        />
      </div>

      {/* </div> */}
 
      <footer>


      </footer>
    </main>
  );
}
