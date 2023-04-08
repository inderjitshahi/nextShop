import Link from 'next/link';
import styles from './styles.module.scss';
import {IoLocation} from 'react-icons/io5'
export default function Copyright({country}) {
    return (
        <div className={styles.footer_copyright}>
            <section>
                &copy;2023 ISSHOP All Rights Reserved
            </section>
            <section>
                <ul>
                    {
                        data.map((link,i)=>(
                            <li key={i+link.name}>
                                <Link  href={link.link}>{link.name}</Link>
                            </li>
                        ))
                    }
                    <li>
                        <a>
                            <IoLocation/> {country?.name||"India"}
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    )
}

const data = [
    {
        name: "Privacy Center",
        link: "",
    },
    {
        name: "Privacy and Cookie Policy",
        link: "",
    },
    {
        name: "Manage Cookies",
        link: "",
    },
    {
        name: "Terms and Conditions",
        link: "",
    },
    {
        name: "Copyright Notice",
        link: "",
    },
]