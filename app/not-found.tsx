import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-4">
      <div className="text-center max-w-md w-full">
        <AlertTriangle className="mx-auto mb-6 h-16 w-16 text-destructive" />
        
        <h1 className="text-4xl font-bold mb-4 ">
          404 - Page Not Found
        </h1>
        
        <p className="text-muted-foreground mb-6">
          Oops! The page you are looking for seems to have wandered off into the digital wilderness.
        </p>
        
        <div className="flex justify-center gap-4">
          <button>
            <Link href="/">
              Return Home
            </Link>
          </button>
          
          <button >
            <Link href="/contact">
              Contact Support
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}