import { NextRequest, NextResponse } from 'next/server';
import { delegateResources } from '@/lib/tron';

export async function POST(req: NextRequest) {
  try {
    const { userAddress, energyTRX = 50, bandwidthTRX = 10 } = await req.json();
    if (!userAddress) return NextResponse.json({ error: 'userAddress requerido' }, { status: 400 });
    const e = Math.min(Number(energyTRX), 200);
    const b = Math.min(Number(bandwidthTRX), 50);
    const out = await delegateResources(userAddress, e, b);
    return NextResponse.json(out);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'error delegando' }, { status: 500 });
  }
}
