'use client'

import { useMemo } from 'react'
import { Navigation, TrendingUp, Zap } from 'lucide-react'
import { useApp } from '@/lib/context'

export function MileageInsightsSection() {
  const { data } = useApp()

  const { totalDistance, mileageBreakdown } = useMemo(() => {
    // Calculate total distance as sum of all vehicle odometers
    const totalDistance = data.vehicles.reduce((sum, v) => sum + v.currentOdometer, 0)

    // Per-vehicle breakdown with efficiency metrics
    const mileageBreakdown = data.vehicles.map(vehicle => {
      // Calculate km/l for fuel vehicles
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

      // Calculate km/charge for electric vehicles
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

  if (!data.mileageTrackingEnabled) return null

  return (
    <div className="px-5 pb-4 flex flex-col gap-4">
      {/* Total Distance KPI */}
      <div className="clay-card p-5">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-medium mb-1">Total Distance</p>
            <p className="text-3xl font-bold text-foreground">{totalDistance.toLocaleString('en-IN')} km</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[oklch(0.93_0.06_250)] flex items-center justify-center">
            <Navigation size={24} strokeWidth={1.5} className="text-[oklch(0.38_0.12_250)]" />
          </div>
        </div>
      </div>

      {/* Per-Vehicle Mileage Breakdown */}
      {mileageBreakdown.map(({ vehicle, kmpl, kmpc }) => {
        if (kmpl === null && kmpc === null) return null

        return (
          <div key={vehicle.id} className="clay-card p-4">
            <p className="text-sm font-bold text-foreground mb-3">{vehicle.name}</p>
            <div className="flex gap-3">
              {vehicle.fuelType !== 'electric' && kmpl !== null && (
                <div className="flex-1 bg-secondary rounded-2xl p-3">
                  <div className="flex items-center gap-1 mb-1">
                    <TrendingUp size={12} strokeWidth={1.75} className="text-primary" />
                    <p className="text-[10px] text-muted-foreground font-medium">km/L</p>
                  </div>
                  <p className="text-sm font-bold text-foreground">{kmpl.toFixed(1)}</p>
                  <p className="text-[9px] text-muted-foreground mt-1">Based on fuel logs</p>
                </div>
              )}
              {vehicle.fuelType === 'electric' && kmpc !== null && (
                <div className="flex-1 bg-[oklch(0.93_0.05_180)] rounded-2xl p-3">
                  <div className="flex items-center gap-1 mb-1">
                    <Zap size={12} strokeWidth={1.75} className="text-[oklch(0.36_0.09_180)]" />
                    <p className="text-[10px] text-[oklch(0.36_0.09_180)] font-medium">km/charge</p>
                  </div>
                  <p className="text-sm font-bold text-foreground">{kmpc.toFixed(1)}</p>
                  <p className="text-[9px] text-[oklch(0.36_0.09_180)] mt-1">Based on charging logs</p>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
