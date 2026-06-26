'use client'

import { useRef, useState } from 'react'
import type { Dictionary } from '@/lib/i18n'

type FormDict = Dictionary['contact']['form']

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ContactForm({
  locale,
  t,
}: {
  locale: 'fr' | 'en'
  t: FormDict
}) {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      const fd = new FormData(e.currentTarget)
      fd.set('locale', locale)
      const res = await fetch('/api/contact', { method: 'POST', body: fd })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
      formRef.current?.reset()
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-transparent border-b border-pierre/50 pb-3 pt-2 font-sans text-[15px] text-ink placeholder:text-dust/45 focus:border-olive focus:outline-none transition-colors'
  const labelClass = 'block font-sans text-[10px] uppercase tracking-widest text-dust mb-2'

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-10" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
        <div>
          <label htmlFor="name" className={labelClass}>
            {t.name} <span className="text-olive">*</span>
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            {t.email} <span className="text-olive">*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            {t.phone}
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClass} />
        </div>
        <div>
          <label htmlFor="commune" className={labelClass}>
            {t.commune}
          </label>
          <input id="commune" name="commune" type="text" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="project" className={labelClass}>
          {t.project} <span className="text-olive">*</span>
        </label>
        <textarea
          id="project"
          name="project"
          required
          rows={5}
          placeholder={t.projectPlaceholder}
          className={`${inputClass} resize-y leading-relaxed`}
        />
      </div>

      <div>
        <label htmlFor="budget" className={labelClass}>
          {t.budget}
        </label>
        <select id="budget" name="budget" className={`${inputClass} appearance-none cursor-pointer`}>
          <option value="">—</option>
          {t.budgets.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="photos" className={labelClass}>
          {t.photos}
        </label>
        <input
          id="photos"
          name="photos"
          type="file"
          accept="image/*"
          multiple
          className="block w-full font-sans text-[13px] text-dust file:mr-4 file:py-2.5 file:px-5 file:border file:border-ink file:bg-transparent file:text-ink file:font-sans file:text-[10px] file:uppercase file:tracking-widest hover:file:bg-ink hover:file:text-bone file:transition-colors file:cursor-pointer cursor-pointer"
        />
        <p className="mt-3 font-sans text-[11px] text-dust/70">{t.photosHint}</p>
      </div>

      {status === 'success' && (
        <div className="border-l-2 border-olive bg-olive/5 px-5 py-4">
          <p className="font-sans text-[14px] text-olive-deep">{t.success}</p>
        </div>
      )}
      {status === 'error' && (
        <div className="border-l-2 border-red-700 bg-red-50 px-5 py-4">
          <p className="font-sans text-[14px] text-red-800">{t.error}</p>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-solid-olive disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? t.sending : t.submit}
        </button>
      </div>
    </form>
  )
}
