import ChatComponent from '@/components/ChatComponent'
import Footer from '@/components/dashboard/Footer'
import Navbar from '@/components/dashboard/Narbar'
import Sidebar from '@/components/dashboard/Sidebar'

interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return ( 
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-grow">
          <Sidebar />
          <main className="py-4 bg-gray-50 w-full bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">{children}</main>
        </div>
        <Footer />
        <ChatComponent />
      </div>    
   );
}
 
export default ProtectedLayout;