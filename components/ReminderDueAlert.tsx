'use client'

import { AlertCircle, Clock, Edit2, CheckCircle2 } from 'lucide-react'
import type { Reminder } from '@/lib/store'

interface ReminderDueAlertProps {
  reminder: Reminder
  onMarkDone: () => void
  onEdit: () => void
  onSnooze: () => void
}

export function ReminderDueAlert({ reminder, onMarkDone, onEdit, onSnooze }: ReminderDueAlertProps) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-3xl p-6 max-w-sm w-full shadow-xl border border-secondary">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[oklch(0.93_0.05_60)] flex items-center justify-center shrink-0">
            <AlertCircle size={24} strokeWidth={1.5} className="text-[oklch(0.42_0.10_60)]" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground">Reminder Due Today</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Service is due now</p>
          </div>
        </div>

        {/* Reminder Details */}
        <div className="bg-secondary rounded-2xl p-4 mb-5">
          <p className="text-sm font-semibold text-foreground mb-2">{reminder.title}</p>
          {reminder.notes && <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{reminder.notes}</p>}
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock size={12} strokeWidth={2} />
            Due: {new Date(reminder.dueDate).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={onMarkDone}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <CheckCircle2 size={16} strokeWidth={2} />
            Mark as Done
          </button>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="flex-1 py-3 rounded-xl bg-secondary text-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 hover:bg-secondary/80"
            >
              <Edit2 size={14} strokeWidth={2} />
              Edit
            </button>
            <button
              onClick={onSnooze}
              className="flex-1 py-3 rounded-xl bg-secondary text-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 hover:bg-secondary/80"
            >
              <Clock size={14} strokeWidth={2} />
              Snooze
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
