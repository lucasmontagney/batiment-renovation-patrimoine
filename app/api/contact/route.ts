import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const TO_EMAIL = 'd.montagney@gmail.com'
const MAX_FILE_BYTES = 10 * 1024 * 1024 // 10 MB

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()

    const name = String(form.get('name') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const project = String(form.get('project') ?? '').trim()
    if (!name || !email || !project) {
      return NextResponse.json({ ok: false, error: 'missing fields' }, { status: 400 })
    }

    const phone = String(form.get('phone') ?? '').trim()
    const commune = String(form.get('commune') ?? '').trim()
    const budget = String(form.get('budget') ?? '').trim()
    const locale = String(form.get('locale') ?? 'fr').trim()

    const photos = form
      .getAll('photos')
      .filter((p): p is File => p instanceof File && p.size > 0)
    for (const f of photos) {
      if (f.size > MAX_FILE_BYTES) {
        return NextResponse.json({ ok: false, error: 'file too large' }, { status: 400 })
      }
    }

    const subject = `Nouveau contact — ${name}${commune ? ` (${commune})` : ''}`
    const textBody = [
      `Nom: ${name}`,
      `Email: ${email}`,
      phone && `Téléphone: ${phone}`,
      commune && `Commune: ${commune}`,
      budget && `Budget: ${budget}`,
      `Langue: ${locale}`,
      '',
      'Projet:',
      project,
      '',
      `Photos jointes: ${photos.length}`,
    ]
      .filter(Boolean)
      .join('\n')

    const apiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.CONTACT_FROM_EMAIL // e.g. "Site BRP <site@batiment-renovation-patrimoine.com>"

    if (apiKey && fromEmail) {
      const attachments = await Promise.all(
        photos.map(async (f) => ({
          filename: f.name,
          content: Buffer.from(await f.arrayBuffer()).toString('base64'),
        })),
      )

      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: TO_EMAIL,
          reply_to: email,
          subject,
          text: textBody,
          attachments,
        }),
      })
      if (!r.ok) {
        const detail = await r.text()
        console.error('[contact] resend error', r.status, detail)
        return NextResponse.json({ ok: false, error: 'send failed' }, { status: 502 })
      }
    } else {
      console.log('[contact] no email backend configured — logged only')
      console.log(textBody)
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[contact] error', e)
    return NextResponse.json({ ok: false, error: 'server error' }, { status: 500 })
  }
}
