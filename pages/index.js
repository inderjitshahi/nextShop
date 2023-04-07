import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.scss';
import Header from '@/components/header/Header';
import Footer from '@/components/footer';
import axios from 'axios';
import { current } from '@reduxjs/toolkit';
import { signIn, signOut, useSession } from 'next-auth/react';
const inter = Inter({ subsets: ['latin'] })

export default function Home({country}) {
  const {status,data:session}=useSession();
  console.log(session);
  return (
    <div style={{minHeight:"100vh"}}>
      <Header country={country}/>
      <Footer country={country}/>
    </div>
  )
}

export async function getServerSideProps(context){
  // let data=await axios.get(`https://api.ipregistry.co/?key=${process.env.IP_REGISTRY_KEY}`).then(res=>res.data).catch(err=>console.log(err));
  return {
    props:{
      // country:{
      //   name:data.location.country.name,
      //   flag:data.location.country.flag.emojitwo,
      //   currency_symbol:data.currency.symbol,
      //   currency_name:data.currency.name
      // },
      country:{ //static data, in dev mode to save free credits
        name:"India",
        flag:"/tricolor.jpg",
        currency_symbol:"💲",
        currency_name:"Rupees"
      },
    }
  }
}