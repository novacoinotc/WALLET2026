'use client';
import { useState, useEffect } from 'react';
import { createUserTronWeb } from '@/lib/tron-client';

const USDT = process.env.NEXT_PUBLIC_USDT!;
const FEEROUTER = process.env.NEXT_PUBLIC_FEEROUTER!;
const FEE_RCPT = process.env.NEXT_PUBLIC_FEE_RECIPIENT!;

export default function Home() {
  const [pk, setPk] = useState('');
  const [addr, setAddr] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (pk) {
      const tw = createUserTronWeb(pk);
      const a = tw.address.fromPrivateKey(pk);
      setAddr(a);
    }
  }, [pk]);

  return (<main><h1>Wallet Gas-Free MVP</h1><p>{addr}</p></main>);
}
