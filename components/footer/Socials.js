import styles from './styles.module.scss';
import {BsFacebook,BsInstagram,BsLinkedin,BsGithub} from 'react-icons/bs';
function Socials() {
  return (
    <div className={styles.footer_socials}>
        <section>
            <h3>Stay Connected</h3>
            <ul>
                <li>
                    <a href='' target='_black' rel="noopener noreferer">
                        <BsLinkedin/>
                    </a>
                </li>
                <li>
                    <a href='' target='_black' rel="noopener noreferer">
                        <BsGithub/>
                    </a>
                </li>
                <li>
                    <a href='' target='_black' rel="noopener noreferer">
                        <BsFacebook/>
                    </a>
                </li>
                <li>
                    <a href='' target='_black' rel="noopener noreferer">
                        <BsInstagram/>
                    </a>
                </li>
            </ul>
        </section>
    </div>
  )
}

export default Socials