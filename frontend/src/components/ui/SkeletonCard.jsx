export default function SkeletonCard({ className = '' }) {
  return (
    <div className={`glass p-6 ${className}`}>
      <div className="skeleton h-4 w-1/3 mb-3" />
      <div className="skeleton h-8 w-2/3 mb-2" />
      <div className="skeleton h-3 w-1/2" />
    </div>
  )
}
