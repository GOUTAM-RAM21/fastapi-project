import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import BottomNav from './BottomNav'

export default function PageWrapper() {
  return (
    <div className="flex min-h-screen relative z-10">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 max-w-[1200px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  )
}
