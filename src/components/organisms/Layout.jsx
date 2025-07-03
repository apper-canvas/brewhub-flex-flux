import Header from '@/components/organisms/Header'
import MobileNavigation from '@/components/organisms/MobileNavigation'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-latte to-cream">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <MobileNavigation />
    </div>
  )
}

export default Layout