import CircleIconButton from '@/components/bottons/circleIconButton.js'
import Footer from '@/components/footer'
import Header from '@/components/header/Header'
import LoginInput from '@/components/inputs/loginInput'
import styles from '@/styles/forgot.module.scss'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi'
import * as Yup from 'yup'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import DotLoader from '@/components/loader/dotLoader'
import axios from 'axios'
import { setRequestMeta } from 'next/dist/server/request-meta'
export default function forgot() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const emailValidation = Yup.object({
    email: Yup.string().required("Email is required").email('Please enter a valid email address'),
  })
  const forgotHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/auth/forgot', {
        email,
      })
      setSuccess(data.message);
      setError("");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
      setSuccess("");
    }
  }
  return (
    <>
      {
        loading && <DotLoader loading={loading} />
      }
      <Header country={""} />
      <div className={styles.forgot}>
        <div>
          <div className={styles.forgot_header}>
            <div className={styles.back_svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Forgot your password ? <Link onClick={signIn} href={''}>Login Instead</Link>
            </span>
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              email,
            }}
            validationSchema={emailValidation}
            onSubmit={forgotHandler}
          >
            {
              (form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="email"
                    icon="email"
                    placeholder={"Email Address"}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <CircleIconButton type={"submit"} text={"Send Reset Link"} />
                  <div style={{ marginTop: "10px" }}>
                    {
                      error &&
                      <span className={styles.error}>{error}</span>
                    }
                    {
                      success &&
                      <span className={styles.success}>{success}</span>
                    }
                  </div>
                </Form>
              )
            }
          </Formik>
        </div>
      </div>
      <Footer country={""} />
    </>
  )
}
