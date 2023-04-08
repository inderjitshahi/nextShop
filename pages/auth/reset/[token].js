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
import { getSession, signIn, useSession } from 'next-auth/react';
import jwt from 'jsonwebtoken';
import DotLoader from '@/components/loader/dotLoader';
import axios from 'axios'
import { Router, useRouter } from 'next/router'
import { useSelector } from 'react-redux'


export default function Reset({ token, user_id }) {
    const { status } = useSession();
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const passwordValidation = Yup.object({
        password: Yup.string().required("Please Enter Your New Password").min(6, "Password must be 6 characters").max(36, "Can't be more than 36 characters"),
        confirm_password: Yup.string().required("Confirm your password").oneOf([Yup.ref('password')], "Passwords Must Match"),
    });
    const resetHandler = async () => {
        try {
            setLoading(true);
            const { data } = await axios.put('/api/auth/reset', {
                user: user_id,
                password,
            })
            let options = {
                redirect: false,
                email: data.email,
                password: password
            }
            await signIn("credentials", options);
            window.location.reload(true);
        } catch (err) {
            setLoading(false);
            setError(err.response.data.message);
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
                            Reset your password Or <Link onClick={signIn} href={''}>Login Instead</Link>
                        </span>
                    </div>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            password,
                            confirm_password,
                        }}
                        validationSchema={passwordValidation}
                        onSubmit={resetHandler}
                    >
                        {
                            (form) => (
                                <Form>
                                    <LoginInput
                                        type="password"
                                        name="password"
                                        icon="password"
                                        placeholder={"Password"}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <LoginInput
                                        type="password"
                                        name="confirm_password"
                                        icon="password"
                                        placeholder={"Confirm Password"}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <CircleIconButton type={"submit"} text={"Reset"} />
                                    <div style={{ marginTop: "10px" }}>
                                        {
                                            error &&
                                            <span className={styles.error}>{error}</span>
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

export async function getServerSideProps(context) {
    const { query,req } = context;
    const token = query.token;
    const session=await getSession({req});
    if(session){
        return {
            redirect:{
                destination:'/',
            }
        }
    }
    const user_id = jwt.verify(token, process.env.RESET_TOKEN_SECRET)
    return {
        props: {
            token,
            user_id
        }
    }
}
