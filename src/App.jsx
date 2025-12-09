import React, { useState } from 'react'
import axios from 'axios'
import Logo from './logo.svg?url'

const PHONE = '01273 044094'
const WA_NUMBER = '441273044094' // +44 1273 044094 used for wa.me

export default function App(){
  const [form, setForm] = useState({ name:'', address:'', reg:'', service:'Clutch Replacement', notes:'' })
  const [status, setStatus] = useState('')

  function handle(e){ setForm({...form, [e.target.name]: e.target.value }) }

  async function submitToServer(e){
    e.preventDefault()
    setStatus('Sending...')
    try{
      await axios.post('/api/quote', form)
      setStatus('Sent — we will message you on WhatsApp shortly.')
    }catch(err){
      console.error(err)
      setStatus('Server send failed — opening WhatsApp as fallback.')
      openWaDirect()
    }
  }

  function openWaDirect(){
    const message = encodeURIComponent(
      `New Quote Request:\nName: ${form.name}\nAddress: ${form.address}\nVehicle Reg: ${form.reg}\nService: ${form.service}\nNotes: ${form.notes}`
    )
    window.open(`https://wa.me/${WA_NUMBER}?text=${message}`, '_blank')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-black to-neutral-800 p-8 text-center">
        <img src={Logo} alt="Sussex Clutch" className="mx-auto w-64"/>
        <h1 className="text-3xl font-semibold mt-3">Sussex Clutch & Timing Belt Specialist</h1>
        <p className="mt-2 opacity-90">Mobile • Brighton & Hove • IMI Accredited • 18 years experience • 12-month warranty</p>
        <p className="mt-3 text-xl font-semibold">📞 {PHONE}</p>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <section className="bg-neutral-900/40 backdrop-blur rounded-2xl p-6 shadow-lg -mt-12">
          <h2 className="text-2xl font-semibold">Why replace your timing belt or chain?</h2>
          <p className="mt-3 text-neutral-300">Timing belts and chains are critical — failure can cause catastrophic engine damage. Replacing at or before manufacturer intervals avoids breakdowns and expensive repairs.</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="col-span-2 bg-neutral-800 rounded-2xl p-6 shadow">
            <h3 className="text-xl font-semibold mb-3">Request a Quote — WhatsApp</h3>
            <form onSubmit={submitToServer} className="space-y-3">
              <input name="name" placeholder="Name" onChange={handle} className="w-full p-3 rounded bg-neutral-900/30 border border-neutral-700" required />
              <input name="address" placeholder="Address" onChange={handle} className="w-full p-3 rounded bg-neutral-900/30 border border-neutral-700" required />
              <input name="reg" placeholder="Vehicle registration" onChange={handle} className="w-full p-3 rounded bg-neutral-900/30 border border-neutral-700" required />
              <select name="service" onChange={handle} className="w-full p-3 rounded bg-neutral-900/30 border border-neutral-700">
                <option>Clutch Replacement</option>
                <option>Gearbox Repair</option>
                <option>Wet Belt Timing Belt Replacement</option>
                <option>Timing Belt Replacement</option>
                <option>Timing Chain Replacement</option>
                <option>Water Pump Replacement</option>
              </select>
              <textarea name="notes" placeholder="Notes (optional)" onChange={handle} className="w-full p-3 rounded bg-neutral-900/30 border border-neutral-700" />
              <button type="submit" className="w-full p-3 rounded bg-white text-black font-semibold">Send to WhatsApp (via server)</button>
              <button type="button" onClick={openWaDirect} className="w-full p-3 mt-2 rounded border border-neutral-700">Open WhatsApp directly (no server)</button>
            </form>
            <p className="mt-3 text-sm text-neutral-400">{status}</p>
          </div>

          <aside className="bg-neutral-800 rounded-2xl p-6 shadow">
            <h4 className="font-semibold">Services</h4>
            <ul className="mt-3 space-y-2 text-neutral-300">
              <li>Clutch replacements (mobile)</li>
              <li>Gearbox repairs</li>
              <li>Wet belt replacement (modern engines)</li>
              <li>Timing belts & chains</li>
              <li>Water pumps</li>
            </ul>
            <div className="mt-4 text-sm text-neutral-400">IMI accredited • 18 years experience • 12-month warranty</div>
          </aside>
        </div>

        <section className="mt-8 bg-neutral-800 rounded-2xl p-6 shadow">
          <h3 className="text-xl font-semibold">Real-world scenario</h3>
          <p className="mt-2 text-neutral-300">An owner delayed timing belt replacement — belt snapped and caused internal engine damage. Repair cost: £3,200. Prevention cost: ~£450.</p>
        </section>

        <section className="mt-6">
          <div className="bg-neutral-800 rounded-lg p-4 text-sm text-neutral-400">Booking & Payment: Calendly & Stripe hooks are ready for later integration.</div>
        </section>
      </main>

      <footer className="bg-black text-neutral-400 p-6 text-center">
        <div>© Sussex Clutch & Timing Belt Specialist — Brighton & Hove</div>
      </footer>
    </div>
  )
}
