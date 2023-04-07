import React from 'react'
import styles from './styles.module.scss';
import Link from 'next/link';
import { RiSearch2Line, RiShoppingCartFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
function Main() {
    const { cart } = useSelector((state) => ({ ...state }));
    return (
        <div className={styles.main}>
            <div className={styles.main_container}>
                <Link href='/' className={styles.logo}>
                    <img src='/App_Logo/svg/logo-color.svg'></img>
                </Link>
                <div className={styles.search}>
                    <input type="text" placeholder="Search..." />
                    <div className={styles.search_icon}>
                        <RiSearch2Line />
                    </div>
                </div>
                <Link href={'/cart'} className={styles.cart}>
                    <RiShoppingCartFill />
                    <span>{cart.length}</span>
                </Link>
            </div>
        </div>
    )
}

export default Main;