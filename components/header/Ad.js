import Link from 'next/link';
import React from 'react';
import styles from './styles.module.scss'
function Ad(props) {
    return (
        <Link href={'/browse'}>
            <div className={styles.ad}>
                <p>Advertisement</p>               
            </div>
        </Link>
    );
}

export default Ad;