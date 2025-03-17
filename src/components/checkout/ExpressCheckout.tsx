
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface ExpressCheckoutProps {
  onComplete: () => void;
}

const ExpressCheckout = ({ onComplete }: ExpressCheckoutProps) => {
  const { toast } = useToast();
  
  const handlePayPalCheckout = () => {
    toast({
      title: "PayPal checkout initiated",
      description: "This is a demo - we're simulating a successful payment",
    });
    
    // Simulate a successful payment after 2 seconds
    setTimeout(() => {
      onComplete();
    }, 2000);
  };
  
  const handleApplePayCheckout = () => {
    toast({
      title: "Apple Pay not available",
      description: "Apple Pay integration is not available in this demo",
      variant: "destructive",
    });
  };
  
  const handleGooglePayCheckout = () => {
    toast({
      title: "Google Pay not available",
      description: "Google Pay integration is not available in this demo",
      variant: "destructive",
    });
  };
  
  return (
    <div className="space-y-3">
      <Button 
        variant="outline" 
        className="w-full bg-[#ffc439] text-black hover:bg-[#f5bb37] border-[#ffc439]"
        onClick={handlePayPalCheckout}
      >
        <span className="font-bold">Pay</span>
        <span className="font-bold text-[#253b80]">Pal</span>
      </Button>
      
      <Button 
        variant="outline" 
        className="w-full bg-black text-white border-gray-600 hover:bg-black/80"
        onClick={handleApplePayCheckout}
      >
        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.0421 12.6975C17.025 10.6324 18.7409 9.56947 18.8248 9.51823C17.7248 7.94259 16.0575 7.73718 15.4442 7.72088C13.8707 7.55223 12.4089 8.65802 11.6089
            8.65802C10.809 8.65802 9.50913 7.73718 8.23923 7.76977C6.61586 7.80236 5.04249 8.70973 4.17586 10.1096C2.42585 12.909 3.70922 17.0443 5.38257 19.0443C6.24254
            20.0408 7.24253 21.1466 8.55256 21.0954C9.80912 21.0443 10.2924 20.2939 11.8007 20.2939C13.3089 20.2939 13.7256 21.0954 15.0423 21.0629C16.4007 21.0443 17.259
            20.0733 18.1089 19.0768C19.1256 17.9059 19.5756 16.7675 19.5923 16.7163C19.559 16.7001 17.0757 15.747 17.0421 12.6975ZM14.309 6.02053C14.9923 5.16642 15.4589
            4.00014 15.3257 2.83385C14.3424 2.86644 13.1257 3.51233 12.4257 4.36644C11.809 5.11222 11.2441 6.31276 11.3924 7.44563C12.4923 7.51336 13.6257 6.87466 14.309
            6.02053Z" />
        </svg>
        Apple Pay
      </Button>
      
      <Button 
        variant="outline" 
        className="w-full bg-white text-black border-gray-300 hover:bg-gray-100"
        onClick={handleGooglePayCheckout}
      >
        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
          <path d="M22.5708 9.97085H21.6V9.90002H12V14.1H18.1542C17.4225 16.2875 15.4167 17.7 12.9 17.7C9.70416 17.7 7.09998 15.0958 7.09998 11.9C7.09998 8.70415 9.70416 6.09998 12.9 6.09998C14.3708 6.09998 15.7 6.64165 16.7417 7.55832L19.7458 4.55415C17.9708 2.89165 15.5708 1.89998 12.9 1.89998C7.39165 1.89998 2.89996 6.39168 2.89996 11.9C2.89996 17.4083 7.39165 21.9 12.9 21.9C18.4083 21.9 22.9 17.4083 22.9 11.9C22.9 11.2417 22.7833 10.5958 22.5708 9.97085Z" fill="#4285F4"/>
          <path d="M3.87915 7.27501L7.30415 9.71667C8.1625 7.59167 10.3625 6.1 12.9 6.1C14.3708 6.1 15.7 6.64167 16.7417 7.55833L19.7458 4.55417C17.9708 2.89167 15.5708 1.9 12.9 1.9C8.9875 1.9 5.60832 4.00833 3.87915 7.27501Z" fill="#EA4335"/>
          <path d="M12.9 21.9C15.5125 21.9 17.8542 20.9583 19.6125 19.3667L16.3542 16.6083C15.3592 17.3083 14.1742 17.7 12.9 17.7C10.3958 17.7 8.19999 16.2958 7.46082 14.1167L4.0625 16.775C5.77499 19.9917 9.12082 21.9 12.9 21.9Z" fill="#34A853"/>
          <path d="M22.5708 9.97085H21.6V9.90002H12V14.1H18.1542C17.8083 15.1375 17.1708 16.0333 16.3533 16.6083L16.3542 16.6075L19.6125 19.3658C19.3842 19.5741 22.9 17 22.9 11.9C22.9 11.2417 22.7833 10.5958 22.5708 9.97085Z" fill="#4285F4"/>
        </svg>
        Google Pay
      </Button>
    </div>
  );
};

export default ExpressCheckout;
