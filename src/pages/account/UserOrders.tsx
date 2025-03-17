
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FadeIn, StaggeredChildren } from '@/components/ui/transitions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PackageOpen, Clock, CheckCircle, XCircle, ChevronRight, TruckIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface Order {
  id: string;
  order_number: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    id: string;
    name: string;
    variant: string;
    size: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  tracking_number?: string;
  shipping_address: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

interface UserOrdersProps {
  user: User | null;
}

const UserOrders = ({ user }: UserOrdersProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    if (user) {
      loadOrders();
    } else {
      // For demo purposes, if no user, load mock data
      loadMockOrders();
    }
  }, [user]);
  
  const loadOrders = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Fetch user orders from Supabase
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setOrders(data as unknown as Order[]);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      toast({
        title: "Error",
        description: "Failed to load orders",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const loadMockOrders = () => {
    setTimeout(() => {
      setOrders([
        {
          id: 'order-001',
          order_number: 'ORD-12345',
          date: '2023-08-15',
          status: 'delivered',
          total: 79.98,
          items: [
            {
              id: 'item-001',
              name: 'Classic Black Tee',
              variant: 'Black',
              size: 'M',
              quantity: 2,
              price: 29.99,
              image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300'
            },
            {
              id: 'item-002',
              name: 'Logo Cap',
              variant: 'Navy',
              size: 'One Size',
              quantity: 1,
              price: 19.99,
              image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=300'
            }
          ],
          tracking_number: 'TRK12345678',
          shipping_address: {
            name: 'John Doe',
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            country: 'United States'
          }
        },
        {
          id: 'order-002',
          order_number: 'ORD-67890',
          date: '2023-07-22',
          status: 'shipped',
          total: 89.98,
          items: [
            {
              id: 'item-003',
              name: 'Premium Hoodie',
              variant: 'Gray',
              size: 'L',
              quantity: 1,
              price: 59.99,
              image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300'
            },
            {
              id: 'item-004',
              name: 'Basic Tee',
              variant: 'White',
              size: 'S',
              quantity: 1,
              price: 29.99,
              image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=300'
            }
          ],
          tracking_number: 'TRK87654321',
          shipping_address: {
            name: 'John Doe',
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            country: 'United States'
          }
        },
        {
          id: 'order-003',
          order_number: 'ORD-54321',
          date: '2023-06-10',
          status: 'processing',
          total: 49.99,
          items: [
            {
              id: 'item-005',
              name: 'Vintage Cap',
              variant: 'Black',
              size: 'One Size',
              quantity: 1,
              price: 24.99,
              image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300'
            },
            {
              id: 'item-006',
              name: 'Logo Tee',
              variant: 'Red',
              size: 'XL',
              quantity: 1,
              price: 24.99,
              image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=300'
            }
          ],
          shipping_address: {
            name: 'John Doe',
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            country: 'United States'
          }
        }
      ]);
      setIsLoading(false);
    }, 1000);
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <FadeIn>
        <div>
          <h2 className="text-2xl font-medium mb-1">Your Orders</h2>
          <p className="text-sm text-gray-400">View and track your orders</p>
        </div>
      </FadeIn>
      
      <Separator />
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <OrderList orders={orders} />
        </TabsContent>
        
        <TabsContent value="processing">
          <OrderList orders={orders.filter(order => order.status === 'processing')} />
        </TabsContent>
        
        <TabsContent value="shipped">
          <OrderList orders={orders.filter(order => order.status === 'shipped')} />
        </TabsContent>
        
        <TabsContent value="delivered">
          <OrderList orders={orders.filter(order => order.status === 'delivered')} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface OrderListProps {
  orders: Order[];
}

const OrderList = ({ orders }: OrderListProps) => {
  if (orders.length === 0) {
    return (
      <Card className="bg-black/30 border-gray-800">
        <CardContent className="pt-6 text-center">
          <PackageOpen className="mx-auto h-12 w-12 text-gray-500 mb-4" />
          <h3 className="text-lg font-medium mb-2">No orders found</h3>
          <p className="text-gray-400 mb-6">
            You don't have any orders in this category yet.
          </p>
          <Button asChild>
            <a href="/shop">Continue Shopping</a>
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <StaggeredChildren staggerDelay={100} className="space-y-6">
      {orders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
    </StaggeredChildren>
  );
};

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const statusColors = {
    processing: "bg-amber-900/20 text-amber-500 border-amber-900/50",
    shipped: "bg-blue-900/20 text-blue-500 border-blue-900/50",
    delivered: "bg-green-900/20 text-green-500 border-green-900/50",
    cancelled: "bg-red-900/20 text-red-500 border-red-900/50"
  };
  
  const statusIcons = {
    processing: <Clock size={16} className="mr-2" />,
    shipped: <TruckIcon size={16} className="mr-2" />,
    delivered: <CheckCircle size={16} className="mr-2" />,
    cancelled: <XCircle size={16} className="mr-2" />
  };
  
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <Card className="bg-black/30 border-gray-800 overflow-hidden hover:border-gray-700 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle className="flex items-center">
              Order #{order.order_number}
            </CardTitle>
            <CardDescription>
              Placed on {formatDate(order.date)}
            </CardDescription>
          </div>
          <Badge 
            variant="outline"
            className={`flex items-center px-3 py-1 ${statusColors[order.status]}`}
          >
            {statusIcons[order.status]}
            <span className="capitalize">{order.status}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="grid md:grid-cols-[3fr_1fr] gap-6">
        <div>
          <h4 className="text-sm font-medium mb-3">Items ({totalItems})</h4>
          
          <div className="space-y-3">
            {order.items.map(item => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-900 rounded overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm font-medium truncate">{item.name}</h5>
                  <p className="text-xs text-gray-400">
                    {item.variant}, Size: {item.size}, Qty: {item.quantity}
                  </p>
                </div>
                <div className="text-sm font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          {order.status === 'shipped' && order.tracking_number && (
            <div className="mt-4 text-sm">
              <p className="font-medium">Tracking Number:</p>
              <div className="flex items-center mt-1">
                <code className="px-2 py-1 bg-gray-800 rounded">{order.tracking_number}</code>
                <Button variant="ghost" size="sm" className="h-8 ml-2 text-primary">
                  Track
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-2">Order Summary</h4>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Shipping</span>
                <span>Free</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Shipping Address</h4>
            <address className="text-sm not-italic text-gray-400 space-y-1">
              <p>{order.shipping_address.name}</p>
              <p>{order.shipping_address.street}</p>
              <p>
                {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip}
              </p>
              <p>{order.shipping_address.country}</p>
            </address>
          </div>
        </div>
      </CardContent>
      
      <div className="px-6 py-4 bg-gray-900/30 border-t border-gray-800 flex justify-between">
        <Button variant="outline" size="sm">
          Contact Support
        </Button>
        <Button size="sm" className="flex items-center">
          Order Details
          <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>
    </Card>
  );
};

export default UserOrders;
