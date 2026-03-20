import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: 220, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <TopBar />
        <main style={{ flex: 1, padding: '36px 40px', maxWidth: 1200, width: '100%' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
