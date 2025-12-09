// api/quote.js
// Vercel serverless endpoint. Receives POST { name,address,reg,service,notes }
// Optional Twilio support if env vars configured.

const twilioEnabled = !!process.env.TWILIO_ACCOUNT_SID && !!process.env.TWILIO_AUTH_TOKEN && !!process.env.TWILIO_WHATSAPP_FROM && !!process.env.OWNER_WHATSAPP_TO

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { name, address, reg, service, notes } = req.body || {}
  const message = `New Quote Request:\nName: ${name}\nAddress: ${address}\nVehicle Reg: ${reg}\nService: ${service}\nNotes: ${notes || '-'}`

  console.log('Quote:', message)

  if (twilioEnabled) {
    try {
      const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
      await client.messages.create({
        from: process.env.TWILIO_WHATSAPP_FROM,    // e.g. 'whatsapp:+1415xxxx'
        to: process.env.OWNER_WHATSAPP_TO,        // e.g. 'whatsapp:+44...'
        body: message
      })
      return res.json({ ok: true, via: 'twilio' })
    } catch (err) {
      console.error('Twilio error', err)
      return res.status(500).json({ ok: false, error: 'twilio_failed' })
    }
  }

  // If Twilio not configured, just respond ok (frontend will fallback to wa.me link).
  return res.json({ ok: true, via: 'logged' })
}
