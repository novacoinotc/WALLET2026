import TronWeb from 'tronweb';

export function createUserTronWeb(userPrivateKey: string) {
  const provider = process.env.NEXT_PUBLIC_TRONGRID_API || 'https://api.trongrid.io';
  return new TronWeb({ fullHost: provider, privateKey: userPrivateKey });
}
