import React, { useState } from 'react';
import styles from './styles.module.scss'
import Image from 'next/image';
import { MdSecurity } from 'react-icons/md'
import { GiUsaFlag } from 'react-icons/gi'
import { BsSuitHeart } from 'react-icons/bs'
import { RiAccountPinCircleLine, RiArrowDownFill, RiArrowDropDownLine } from 'react-icons/ri'
import UserMenu from './UserMenu';
import { useSession } from 'next-auth/react';
function Top({country}) {
    const{status,data:session}=useSession();
    const [visible, setVisible] = useState(false);
    return (
        <div className={styles.top}>
            <div className={styles.top_container}>
                <div></div>
                <ul className={styles.top_list}>
                    <li className={styles.li}>
                        <img src={country?.flag ||"/tricolor.jpg"}/>
                        <span>{country?.name || "India"}/{country?.currency_symbol ||"₹"}</span>
                    </li>
                    <li className={styles.li}>
                        <MdSecurity />
                        <span>Buyer Protection</span>
                    </li>
                    <li className={styles.li}>
                        <span>Customer Service</span>
                    </li>
                    <li className={styles.li}>
                        <span>Help</span>
                    </li>
                    <li className={styles.li}>
                        <BsSuitHeart />
                        <span>WhishList</span>
                    </li>
                    <li className={styles.li}
                        onMouseOver={() => setVisible(true)} 
                        onMouseLeave={() => setVisible(false)}
                    >
                        {
                            session ? <div className={styles.li}>
                                <div className={styles.flex}>
                                    <img src={session.user.image} className={styles.img} />
                                    <span>{session.user.name}</span>
                                    <RiArrowDropDownLine />
                                </div>
                            </div> : <div className={styles.li}>
                                <div className={styles.flex} >
                                    <RiAccountPinCircleLine />
                                    <span>Account</span>
                                    <RiArrowDropDownLine />
                                </div>
                            </div>
                        }
                        {visible && <UserMenu session={session} />}
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Top;