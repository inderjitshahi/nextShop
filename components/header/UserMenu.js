import Link from 'next/link';
import React from 'react';
import styles from './styles.module.scss'
import { signIn, signOut } from 'next-auth/react';
function UserMenu({ session }) {
    return (
        <div className={styles.menu}>
            <h4>Welcome to ISShop!</h4>
            {
                session ?
                    <div className={styles.flex}>
                        <img src={session.user.image} className={styles.menu_img} alt="user" />
                        <div className={styles.col}>
                            <span>Welcome Back,</span>
                            <h3>{session.user.name}</h3>
                            <span onClick={signOut}>Sign Out</span>
                        </div>
                    </div>
                    : <div className={styles.flex}>
                        <button className={styles.btn_primary}>Register</button>
                        <button className={styles.btn_outlined} onClick={signIn}>Login</button>
                    </div>
            }
            <ul>
                <li>
                    <Link href="/profile">Account</Link>
                </li>
                <li>
                    <Link href="/profile/orders">My Orders</Link>
                </li>
                <li>
                    <Link href="/profile/messages">Message Center</Link>
                </li>
                <li>
                    <Link href="/profile/addresses">Address</Link>
                </li>
                <li>
                    <Link href="/profile/wishlist">WishList</Link>
                </li>
            </ul>
        </div>
    );
}

export default UserMenu;