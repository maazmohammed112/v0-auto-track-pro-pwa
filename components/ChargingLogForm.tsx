'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import { useApp } from '@/lib/context'
import type { ChargingLog } from '@/lib/store'

interface ChargingLogFormProps {
  vehicleId: string
  onClose: () => void
  editLog?: ChargingLog
}

export function ChargingLogForm({ vehicleId, onClose, editLog }: ChargingLogFormProps) {
  const { addChargingLog, updateChargingLog, data } = useApp()
  const isEdit = !!editLog
  const vehicle = data.vehicles.find(v => v.id === vehicleId)
  const currentOdometer = vehicle?.currentOdometer ?? 0

  const [date, setDate] = useState(editLog?.date ?? new Date().toISOString().slice(0, 16))
  const [amountSpent, setAmountSpent] = useState(editLog?.amountSpent?.toString() ?? '')
  const [chargingType, setChargingType] = useState(editLog?.chargingType ?? '')
  const [odometer, setOdometer] = useState(editLog?.odometer?.toString() ?? '')
  const [notes, setNotes] = useState(editLog?.notes ?? '')
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const e: Record<string, string> = {}
    if (!amountSpent || isNaN(Number(amountSpent)) || Number(amountSpent) <= 0) e.amountSpent = 'Enter a valid amount'
    return e
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    const log = {
      vehicleId,
      date,
      amountSpent: Number(amountSpent),
      chargingType: (chargingType as 'home' | 'public' | undefined) || undefined,
      odometer: odometer ? Number(odometer) : undefined,
      notes: notes.trim() || undefined,
    }

    if (isEdit && editLog) {
      updateChargingLog(editLog.id, log)
      toast('Charging log updated')
    } else {
      addChargingLog(log)
      toast('Charging log added')
    }
    onClose()
  }

  const inputClass = "w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/20 backdrop-blur-[2px]">
      <div
        className="w-full max-w-md bg-card rounded-t-3xl p-6 pb-8 max-h-[90vh] overflow-y-auto hide-scrollbar"
        style={{ boxShadow: '0 -8px 40px oklch(0.22 0.01 260 / 0.14)' }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-foreground">{isEdit ? 'Edit Charging Log' : 'Add Charging Log'}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <X size={16} strokeWidth={2} className="text-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Date & Time</label>
            <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} className={inputClass} />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
              Amount Spent (₹)
            </label>
            <input
              type="number"
              value={amountSpent}
              onChange={e => setAmountSpent(e.target.value)}
              placeholder="e.g. 150"
              className={inputClass}
            />
            {errors.amountSpent && <p className="text-destructive text-xs mt-1 font-medium">{errors.amountSpent}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
              Charging Type <span className="text-muted-foreground font-normal normal-case">(optional)</span>
            </label>
            <select value={chargingType} onChange={e => setChargingType(e.target.value)} className={inputClass}>
              <option value="">Select charging type...</option>
              <option value="home">Home Charging</option>
              <option value="public">Public Charging</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
              Odometer (km) <span className="text-muted-foreground font-normal normal-case">(optional)</span>
            </label>
            <input
              type="number"
              value={odometer}
              onChange={e => setOdometer(e.target.value)}
              placeholder={`e.g. ${currentOdometer > 0 ? currentOdometer.toLocaleString('en-IN') : '15200'}`}
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
              Notes <span className="text-muted-foreground font-normal normal-case">(optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Any notes..."
              rows={2}
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl font-bold text-white text-sm mt-1 transition-all active:scale-95"
            style={{ background: 'oklch(0.55 0.18 250)', boxShadow: '0 4px 16px oklch(0.55 0.18 250 / 0.3)' }}
          >
            {isEdit ? 'Save Changes' : 'Add Entry'}
          </button>
        </form>
      </div>
    </div>
  )
}
