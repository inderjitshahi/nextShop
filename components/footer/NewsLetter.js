import Link from 'next/link';
import styles from './styles.module.scss';

export default function NewsLetter() {
  return (
    <div className={styles.footer_newsletter}>
        <h3>Sign Up for Newsletter</h3>
        <div className={styles.footer_flex}>
            <input type='text' placeholder='Your Email Address'/>
            <button className={styles.btn_primary}>subscribe</button>
        </div>
        <p>
            By clicking the Subscribe button, you are agreeing to {" "}
            <Link href={''}>Our Privacy & Cookie Policy</Link>
        </p>
    </div>
  )
}
