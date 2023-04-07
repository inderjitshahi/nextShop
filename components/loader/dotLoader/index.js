import { CircleLoader } from 'react-spinners'
import styles from './styles.module.scss'

export default function DotLoader({loading}) {
  return (
    <div className={styles.loader}>
        <CircleLoader color={"#2f82ff"} size={100} loading={loading} />
    </div>
  )
}
