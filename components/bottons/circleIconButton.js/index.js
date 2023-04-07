import { BiRightArrowAlt } from 'react-icons/bi'
import styles from './styles.module.scss'

export default function CircleIconButton({ type, icon, text }) {
    return (
        <button className={styles.button} type={type}>
            {text}
            <div className={styles.svg_wrap}>
                <BiRightArrowAlt />
            </div>
        </button>
    )
}
