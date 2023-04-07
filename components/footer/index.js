import React from 'react'
import styles from './styles.module.scss'
import Links from './Links'
import Socials from './Socials'
import NewsLetter from './NewsLetter'
import Payments from './Payments'
import Copyright from './Copyright'
function Footer({country}) {
  return (
    <footer className={styles.footer}>
        <div className={styles.footer_container}>
            <Links/>
            <Socials/>
            <NewsLetter/>
            <Payments/>
            <Copyright country={country}/>
        </div>
    </footer>
  )
}

export default Footer