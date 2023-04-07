import styles from './styles.module.scss';

export default function Payments() {
  return (
    <div className={styles.footer_payment}>
        <h3>We Accept</h3>
        <div className={styles.footer_flexwrap}>
            <img src='/Payment/visa.svg'></img>
            <img src='/Payment/mastercard.svg'></img>
            <img src='/Payment/upi.svg'></img>
            <img src='/Payment/Rupey.svg'></img>
            <img src='/Payment/Paytm.svg'></img>
            <img src='/Payment/paypal.svg'></img>
        </div>
    </div>
  )
}
