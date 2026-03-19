'use client'

import { useMemo } from 'react'
import { Navigation, TrendingUp, Zap, X } from 'lucide-react'
import { useApp } from '@/lib/context'

interface MileageModalProps {
  isOpen: boolean
  onClose: () => void
}

export function MileageModal({ isOpen, onClose }: MileageModalProps) {
  const { data } = useApp()

  const { totalDistance, mileageBreakdown } = useMemo(() => {
    const totalDistance = data.vehicles.reduce((sum, v) => sum + v.currentOdometer, 0)

    const mileageBreakdown = data.vehicles.map(vehicle => {
      let kmpl: number | null = null
      if (vehicle.fuelType !== 'electric') {
        const vFuel = data.fuelLogs.filter(l => l.vehicleId === vehicle.id && l.odometer)
        if (vFuel.length >= 2) {
          const withOdo = vFuel.sort((a, b) => (a.odometer ?? 0) - (b.odometer ?? 0))
          const totalKm = (withOdo[withOdo.length - 1].odometer ?? 0) - (withOdo[0].odometer ?? 0)
          const totalLitres = withOdo.slice(1).reduce((s, l) => s + l.litres, 0)
          if (totalLitres > 0 && totalKm > 0) kmpl = totalKm / totalLitres
        }
      }

      let kmpc: number | null = null
      if (vehicle.fuelType === 'electric') {
        const vCharging = data.chargingLogs.filter(l => l.vehicleId === vehicle.id && l.odometer)
        if (vCharging.length >= 2) {
          const withOdo = vCharging.sort((a, b) => (a.odometer ?? 0) - (b.odometer ?? 0))
          const totalKm = (withOdo[withOdo.length - 1].odometer ?? 0) - (withOdo[0].odometer ?? 0)
          const chargeCount = withOdo.length - 1
          if (chargeCount > 0 && totalKm > 0) kmpc = totalKm / chargeCount
        }
      }

      return { vehicle, kmpl, kmpc }
    })

    return { totalDistance, mileageBreakdown }
  }, [data])

  if (!isOpen || !data.mileageTrackingEnabled) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end pointer-events-none">
        <div className="w-full max-w-md mx-auto pointer-events-auto">
          <div className="relative rounded-t-3xl bg-background shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-background border-b border-border/50 px-5 pt-5 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">Mileage Insights</h2>
                <p className="text-xs text-muted-foreground mt-1">Distance & efficiency metrics</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center transition-all active:scale-95 hover:bg-secondary/80"
                title="Close"
              >
                <X size={18} strokeWidth={2} className="text-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="px-5 py-4 pb-8 flex flex-col gap-4">
              {/* Total Distance KPI */}
              <div className="clay-card p-5">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground font-medium mb-2">Total Distance</p>
                    <p className="text-3xl font-bold text-foreground">{totalDistance.toLocaleString('en-IN')}</p>
                    <p className="text-xs text-muted-foreground mt-1.5">km across all vehicles</p>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-[oklch(0.93_0.06_250)] flex items-center justify-center flex-shrink-0">
                    <Navigation size={28} strokeWidth={1.5} className="text-[oklch(0.38_0.12_250)]" />
                  </div>
                </div>
              </div>

              {/* Per-Vehicle Breakdown */}
              {mileageBreakdown.some(m => m.kmpl !== null || m.kmpc !== null) ? (
                <>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-3">Per Vehicle</p>
                    <div className="flex flex-col gap-3">
                      {mileageBreakdown.map(({ vehicle, kmpl, kmpc }) => {
                        if (kmpl === null && kmpc === null) return null

                        return (
                          <div key={vehicle.id} className="clay-card p-4">
                            <div className="mb-3">
                              <p className="text-sm font-bold text-foreground">{vehicle.name}</p>
                              <p className="text-xs text-muted-foreground">{vehicle.brand} {vehicle.model}</p>
                              <p className="text-xs text-muted-foreground mt-1">Odometer: <span className="font-semibold text-foreground">{vehicle.currentOdometer.toLocaleString('en-IN')} km</span></p>
                            </div>

                            <div className="flex gap-3">
                              {vehicle.fuelType !== 'electric' && kmpl !== null && (
                                <div className="flex-1 bg-[oklch(0.93_0.06_250)] rounded-xl p-3">
                                  <div className="flex items-center gap-1.5 mb-2">
                                    <TrendingUp size={13} strokeWidth={2} className="text-[oklch(0.38_0.12_250)]" />
                                    <p className="text-[10px] text-[oklch(0.38_0.12_250)] font-semibold">Efficiency</p>
                                  </div>
                                  <p className="text-lg font-bold text-[oklch(0.38_0.12_250)]">{kmpl.toFixed(1)}</p>
                                  <p className="text-[9px] text-[oklch(0.36_0.12_250)] font-medium mt-1">km/liter</p>
                                </div>
                              )}
                              {vehicle.fuelType === 'electric' && kmpc !== null && (
                                <div className="flex-1 bg-[oklch(0.93_0.05_180)] rounded-xl p-3">
                                  <div className="flex items-center gap-1.5 mb-2">
                                    <Zap size={13} strokeWidth={2} className="text-[oklch(0.36_0.09_180)]" />
                                    <p className="text-[10px] text-[oklch(0.36_0.09_180)] font-semibold">Range</p>
                                  </div>
                                  <p className="text-lg font-bold text-[oklch(0.36_0.09_180)]">{kmpc.toFixed(0)}</p>
                                  <p className="text-[9px] text-[oklch(0.36_0.09_180)] font-medium mt-1">km/charge</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Info box */}
                  <div className="rounded-xl bg-secondary/40 border border-border/50 p-3.5">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Efficiency metrics</strong> are calculated from fuel and charging logs with odometer readings.
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-3 py-8 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center">
                    <Navigation size={24} strokeWidth={1.5} className="text-muted-foreground" />
                  </div>
                  <p className="font-semibold text-foreground">No efficiency data</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Add fuel or charging logs with odometer readings to see efficiency metrics.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
