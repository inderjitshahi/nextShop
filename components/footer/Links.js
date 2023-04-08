import React from 'react'
import styles from './styles.module.scss'
import Link from 'next/link';
function Links() {
    return (
        <div className={styles.footer_links}>
            {
                links.map((link, i) => (
                    <ul key={i+link.heading}>
                        {
                            i === 0 ?(<img key={0} src='/App_Logo/svg/logo-color.svg' alt="logo"/>):<b>{link.heading}</b>
                       }
                        {link.links.map((link,j) => (
                            <li key={j*100+link.name}>
                                <Link  href={link.link} className={styles.link_text}>{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                ))
            }
        </div>
    )
}

const links = [
    {
        heading: "ISSHOP",
        links: [
            {
                name: "About us",
                link: ""
            },
            {
                name: "Contact Us",
                link: ""
            },
            {
                name: "Social Responsibility",
                link: ""
            },
            {
                name: "",
                link: ""
            }
        ]

    },
    {
        heading: "Help And Support",
        links: [
            {
                name: "Shipping Info",
                link: ""
            },
            {
                name: "Returns",
                link: ""
            },
            {
                name: "How To Order",
                link: ""
            },
            {
                name: "How To Track",
                link: ""
            },
            {
                name: "Size Guide",
                link: ""
            }
        ]
    },
    {
        heading: "Customer Service",
        links: [
            {
                name: "Customer Service",
                link: ""
            },
            {
                name: "Terms and Conditions",
                link: ""
            },
            {
                name: "Consumers (Transactions)",
                link: ""
            },
            {
                name: "Give Your Suggestions",
                link: ""
            },
        ]
    }
]
export default Links;