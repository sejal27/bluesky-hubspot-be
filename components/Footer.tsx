import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 w-full z-10">
      <div className="max-w-[1200px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-400">
            Built by{' '}
            <Link 
              href="https://www.linkedin.com/in/sejalparikh/" 
              target="_blank"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Sejal Parikh
            </Link>
          </div>
          <div className="text-gray-400">
            <Link 
              href="mailto:sparikh@hubspot.com"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 