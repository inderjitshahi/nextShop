import CircleIconButton from '@/components/bottons/circleIconButton.js';
import Footer from '@/components/footer';
import Header from '@/components/header/Header';
import LoginInput from '@/components/inputs/loginInput';
import DotLoader from '@/components/loader/dotLoader';
import styles from '@/styles/signin.module.scss';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { getCsrfToken, getProviders, getSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import * as Yup from 'yup'
import Router from 'next/router'
const initialValues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  confirm_password: "",
  success: "",
  error: "",
  login_error: "",
}
export default function signin({ country, providers, callbackUrl, csrfToken }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialValues);
  const { login_email, login_password, name, email, password, confirm_password, success, error, login_error } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }
  const loginValidation = Yup.object({
    login_email: Yup.string().required("Email is required").email('Please enter a valid email address'),
    login_password: Yup.string().required("Password is required").test('len', 'Min 3 characters', (val) => val.toString().length >= 3),
  });
  const signupValidation = Yup.object({
    name: Yup.string().required("What's Your Name")
      .min(1, "Name must contain at least 1 characters")
      .max(50, "Name must be less than 50 characters")
      .matches(/^[aA-zZ]/, 'Numbers and Special Characters are not allowed'),
    email: Yup.string().required("Email Can't be Empty").email("Please Provide a Valid Email"),
    password: Yup.string().required("Enter a combination pf at least 6 numbers, letters and special characters").min(6, "Password must be 6 characters").max(36, "Can't be more than 36 characters"),
    confirm_password: Yup.string().required("Confirm your password").oneOf([Yup.ref('password')], "Passwords Must Match"),
  });

  const signUpHandler = async (e) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });
      setUser({ ...user, success: data.message, error: "" });
      setLoading(false);
      setTimeout(async () => {
        let options = {
          redirect: false,
          email: email,
          password: password
        }
        const res = await signIn("credentials", options);
        Router.push(callbackUrl || "/");
      }, 2000);
    } catch (err) {
      setLoading(false);
      setUser({ ...user, error: err.response.data.message, success: "" });
    }
  }

  const signInHandler = async (e) => {
    setLoading(true);
    let options = {
      redirect: false,
      email: login_email,
      password: login_password
    }
    const res = await signIn("credentials", options);
    setUser({ ...user, success: "", error: "" });
    setLoading(false);
    if (res?.error) {
      setLoading(false);
      setUser({ ...user, login_error: res?.error });
    } else {
      return Router.push(callbackUrl || "/");
    }
  }
  return (
    <>
      {loading && <DotLoader loading={loading} />}
      <Header country={""} />
      <div className={styles.login}>
        <div className={styles.login_container}>
          <div className={styles.login_header}>
            <div className={styles.back_svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We'd be happy to join us ! <Link href={'/'}>Go Store</Link>
            </span>
          </div>
          <div className={styles.login_form}>
            <h1>Sign In</h1>
            <p>
              Get access to one of the best Eshopping services in the world.
            </p>
            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password
              }}
              validationSchema={loginValidation}
              onSubmit={signInHandler}
            >
              {
                (form) => (
                  <Form method='post' action="api/auth/signin/email">
                    <input
                      type='hidden'
                      name="csrfToken"
                      defaultValue={csrfToken}
                    />
                    <LoginInput
                      type="text"
                      name="login_email"
                      icon="email"
                      placeholder={"Email Address"}
                      onChange={handleChange}
                    />
                    <LoginInput
                      type="password"
                      name="login_password"
                      icon="password"
                      placeholder={"Your Password"}
                      onChange={handleChange}
                    />
                    <CircleIconButton type={"submit"} text={"Sign in"} />
                    {
                      login_error &&
                      <span className={styles.error}>{login_error}</span>
                    }
                    <div className={styles.forgot}>
                      <Link href={'/auth/forgot'}>Forgot Password?</Link>
                    </div>
                  </Form>
                )
              }
            </Formik>
            <div className={styles.login_socials}>
              <span className={styles.or}>
                Or Continue With
              </span>
              <div className={styles.login_socials_wrap}>
                {
                  providers.map(provider => {
                    if (provider.name === 'Credentials') {
                      return;
                    }
                    return (
                      <div key={provider.name}>
                        <button className={styles.social_btn} onClick={() => signIn(provider.id,{
                          redirect:'/',
                        })}>
                          <img src={`/Social_Icons/${provider.name}.svg`}></img>
                          Sign In With {provider.name}
                        </button>
                      </div>
                    )
                  })
                }

              </div>
            </div>
          </div>
        </div>

        <div className={styles.login_container}>
          <div className={styles.login_form}>
            <h1>Sign Up</h1>
            <p>
              Get access to one of the best Eshopping services in the world.
            </p>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password,
                confirm_password
              }}
              validationSchema={signupValidation}
              onSubmit={signUpHandler}
            >
              {
                (form) => (
                  <Form>
                    <LoginInput
                      type="text"
                      name="name"
                      icon={'user'}
                      placeholder={"Full Name"}
                      onChange={handleChange}
                    />
                    <LoginInput
                      type="text"
                      name="email"
                      icon={'email'}
                      placeholder={"Email"}
                      onChange={handleChange}
                    />
                    <LoginInput
                      type="password"
                      name="password"
                      icon="password"
                      placeholder={"Your Password"}
                      onChange={handleChange}
                    />
                    <LoginInput
                      type="password"
                      name="confirm_password"
                      icon="password"
                      placeholder={"Confirm Password"}
                      onChange={handleChange}
                    />
                    <CircleIconButton type={"submit"} text={"Sign Up"} />
                  </Form>
                )
              }
            </Formik>
            <div>
              {
                success && <span className={styles.success}>{success}</span>
              }
            </div>
            <div>{error && <span className={styles.error}>{error}</span>}</div>
          </div>
        </div>
      </div>
      <Footer country={""} />
    </>
  )
}

export async function getServerSideProps(context) {
  const { req, query } = context;
  const session = await getSession({ req });
  const { callbackUrl } = query;
  const csrfToken = await getCsrfToken(context);
  const providers = Object.values(await getProviders());

  if (session) {   //if Already LoggedIn
    return {
      redirect: {
        destination: callbackUrl,
      }
    }
  }
  return {
    props: {
      providers,
      csrfToken,
      callbackUrl,
    }
  }
}
