
import { useState } from 'react';
import { Package, Eye, ShoppingBag, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FadeIn } from '@/components/ui/transitions';
import { User } from '@supabase/supabase-js';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDelivery?: string;
}

interface UserOrdersProps {
  user: User | null;
}

const UserOrders = ({ user }: UserOrdersProps) => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'order-1',
      orderNumber: 'ORD-20230615-12345',
      date: '2023-06-15',
      status: 'delivered',
      total: 79.98,
      items: 2,
      trackingNumber: 'TRK9876543210',
      trackingUrl: 'https://www.fedex.com/tracking',
      estimatedDelivery: '2023-06-18'
    },
    {
      id: 'order-2',
      orderNumber: 'ORD-20230520-67890',
      date: '2023-05-20',
      status: 'shipped',
      total: 129.99,
      items: 3,
      trackingNumber: 'TRK1234567890',
      trackingUrl: 'https://www.ups.com/tracking',
      estimatedDelivery: '2023-05-25'
    },
    {
      id: 'order-3',
      orderNumber: 'ORD-20230505-24680',
      date: '2023-05-05',
      status: 'processing',
      total: 49.99,
      items: 1
    },
    {
      id: 'order-4',
      orderNumber: 'ORD-20230410-13579',
      date: '2023-04-10',
      status: 'cancelled',
      total: 34.99,
      items: 1
    }
  ]);
  
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };
  
  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'Processing';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
    }
  };
  
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'shipped':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'delivered':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
    }
  };
  
  return (
    <div className="space-y-6">
      <FadeIn>
        <div>
          <h2 className="text-2xl font-medium mb-1">My Orders</h2>
          <p className="text-sm text-gray-400">View and track your orders</p>
        </div>
      </FadeIn>
      
      <Tabs defaultValue="all" className="mt-6">
        <FadeIn delay={100}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
        </FadeIn>
        
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
        
        <TabsContent value="cancelled">
          <OrderList orders={orders.filter(order => order.status === 'cancelled')} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface OrderListProps {
  orders: Order[];
}

const OrderList = ({ orders }: OrderListProps) => {
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };
  
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'shipped':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'delivered':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
    }
  };
  
  if (orders.length === 0) {
    return (
      <FadeIn>
        <div className="text-center py-16 border border-gray-800 rounded-lg">
          <Package className="h-12 w-12 mx-auto text-gray-500 mb-4" />
          <h3 className="text-xl font-medium mb-2">No orders found</h3>
          <p className="text-gray-400 mb-6">
            You don't have any orders in this category yet.
          </p>
          <Button asChild>
            <a href="/shop">Start Shopping</a>
          </Button>
        </div>
      </FadeIn>
    );
  }
  
  return (
    <FadeIn>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-medium">{order.orderNumber}</h3>
                    <Badge 
                      className={`ml-3 ${getStatusColor(order.status)}`}
                      variant="outline"
                    >
                      <span className="flex items-center">
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                      </span>
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>Order Date: {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p>{order.items} {order.items === 1 ? 'item' : 'items'} • ${order.total.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button asChild variant="outline" size="sm">
                    <a href={`/account/orders/${order.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      Order Details
                    </a>
                  </Button>
                  
                  {(order.status === 'shipped' || order.status === 'delivered') && (
                    <Button asChild size="sm">
                      <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer">
                        <Truck className="h-4 w-4 mr-2" />
                        Track Order
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              
              {(order.status === 'shipped' || order.status === 'delivered') && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="sm:w-1/2">
                      <h4 className="text-sm font-medium mb-1">Tracking Information</h4>
                      <p className="text-sm text-gray-400">Tracking Number: {order.trackingNumber}</p>
                      {order.estimatedDelivery && (
                        <p className="text-sm text-gray-400 mt-1">
                          Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      )}
                    </div>
                    
                    <div className="sm:w-1/2">
                      <h4 className="text-sm font-medium mb-2">Shipping Progress</h4>
                      <div className="relative">
                        <div className="absolute top-1.5 left-0 w-full h-1 bg-gray-800 rounded-full"></div>
                        <div className={`absolute top-1.5 left-0 h-1 rounded-full ${order.status === 'delivered' ? 'w-full bg-green-500' : 'w-2/3 bg-blue-500'}`}></div>
                        
                        <div className="relative flex justify-between">
                          <div className="flex flex-col items-center">
                            <div className="w-4 h-4 rounded-full bg-primary"></div>
                            <span className="text-xs mt-1">Processed</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="w-4 h-4 rounded-full bg-primary"></div>
                            <span className="text-xs mt-1">Shipped</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className={`w-4 h-4 rounded-full ${order.status === 'delivered' ? 'bg-primary' : 'bg-gray-800'}`}></div>
                            <span className={`text-xs mt-1 ${order.status === 'delivered' ? 'text-white' : 'text-gray-500'}`}>Delivered</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </FadeIn>
  );
};

export default UserOrders;
