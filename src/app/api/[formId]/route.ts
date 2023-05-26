import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: {
  params: { formId: string };
}) {
  const { formId } = params
  if (formId) {
    const res = await fetch(`https://api.typeform.com/forms/${formId}`, {
      method: 'GET',
    })
    return NextResponse.json({ ...await res.json() });
  }
}
