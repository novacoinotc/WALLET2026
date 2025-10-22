import TronWeb from 'tronweb';

const TRONGRID_API = process.env.TRONGRID_API!;
const SPONSOR_PK = process.env.SPONSOR_PRIVATE_KEY!;

export const tronWeb = new TronWeb({ fullHost: TRONGRID_API, privateKey: SPONSOR_PK });

export async function delegateResources(userAddress: string, energy: number, bandwidth: number) {
  const energySun = energy * 1_000_000;
  const bwSun = bandwidth * 1_000_000;
  if (energySun > 0) {
    await tronWeb.trx.freezeBalanceV2(energySun, 'ENERGY');
    await tronWeb.trx.delegateResource(energySun, userAddress, 'ENERGY');
  }
  if (bwSun > 0) {
    await tronWeb.trx.freezeBalanceV2(bwSun, 'BANDWIDTH');
    await tronWeb.trx.delegateResource(bwSun, userAddress, 'BANDWIDTH');
  }
  return { ok: true };
}
