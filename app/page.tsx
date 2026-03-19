import { AppProvider } from '@/lib/context'
import { AppShell } from '@/components/AppShell'
import { getApplicationSchema } from '@/lib/schema'

export default function Page() {
  const schema = getApplicationSchema()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AppProvider>
        <main className="max-w-md mx-auto min-h-screen relative">
          <AppShell />
        </main>
      </AppProvider>
    </>
  )
}
