
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Package, Eye, FileText, ShoppingBag } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface UserOrdersProps {
  user: User | null;
}

interface Order {
  id: string;
  created_at: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  tracking_number?: string;
  shipping_address: Address;
}

interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
  image_url?: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

const statusColors = {
  pending: 'bg-yellow-500/20 text-yellow-400',
  processing: 'bg-blue-500/20 text-blue-400',
  shipped: 'bg-purple-500/20 text-purple-400',
  delivered: 'bg-green-500/20 text-green-400',
  cancelled: 'bg-red-500/20 text-red-400',
};

const UserOrders = ({ user }: UserOrdersProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        setOrders(data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast({
          title: "Error loading orders",
          description: "Unable to load your order history. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, toast]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleTrackOrder = (trackingNumber: string) => {
    // In a real implementation, this would redirect to a tracking page or external carrier site
    toast({
      title: "Tracking Order",
      description: `Tracking number: ${trackingNumber}`,
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-900 p-6 rounded-lg flex justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-gray-900 p-8 rounded-lg text-center">
        <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-600" />
        <h2 className="text-xl font-medium mb-2">No Orders Yet</h2>
        <p className="text-gray-400 mb-6">You haven't placed any orders yet.</p>
        <Button>Start Shopping</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Order History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id.substring(0, 8)}</TableCell>
                  <TableCell>{formatDate(order.created_at)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${statusColors[order.status]}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{formatCurrency(order.total)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => viewOrderDetails(order)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-800 text-white">
                          <DialogHeader>
                            <DialogTitle>Order #{order.id.substring(0, 8)}</DialogTitle>
                            <DialogDescription className="text-gray-400">
                              Placed on {formatDate(order.created_at)}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-4 space-y-4">
                            <div className="space-y-1">
                              <h4 className="text-sm font-medium">Status</h4>
                              <span className={`px-2 py-1 rounded-full text-xs ${statusColors[order.status]}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                            
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium">Items</h4>
                              {order.items?.map((item) => (
                                <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-800">
                                  <div className="flex items-center gap-2">
                                    {item.image_url && (
                                      <div className="h-10 w-10 bg-gray-800 rounded overflow-hidden">
                                        <img src={item.image_url} alt={item.product_name} className="h-full w-full object-cover" />
                                      </div>
                                    )}
                                    <div>
                                      <p className="text-sm">{item.product_name}</p>
                                      <p className="text-xs text-gray-400">
                                        {item.size && `Size: ${item.size}`} {item.color && `Color: ${item.color}`}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm">{formatCurrency(item.price)}</p>
                                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            <div className="space-y-1">
                              <h4 className="text-sm font-medium">Shipping Address</h4>
                              <p className="text-sm text-gray-400">
                                {order.shipping_address?.street}<br />
                                {order.shipping_address?.city}, {order.shipping_address?.state} {order.shipping_address?.zip}<br />
                                {order.shipping_address?.country}
                              </p>
                            </div>
                            
                            {order.tracking_number && (
                              <div className="space-y-1">
                                <h4 className="text-sm font-medium">Tracking</h4>
                                <p className="text-sm text-gray-400">
                                  {order.tracking_number}
                                </p>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleTrackOrder(order.tracking_number!)}
                                  className="mt-2"
                                >
                                  Track Package
                                </Button>
                              </div>
                            )}
                            
                            <div className="border-t border-gray-800 pt-4 mt-4">
                              <div className="flex justify-between">
                                <span className="font-medium">Total</span>
                                <span className="font-medium">{formatCurrency(order.total)}</span>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">Invoice</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserOrders;
