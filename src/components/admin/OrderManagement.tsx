
import { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogClose 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Search, Filter, Eye, TruckIcon, RefreshCw, Ban } from 'lucide-react';

// Sample orders data
const orders = [
  {
    id: 'ORD-2023-1001',
    customer: 'Alex Johnson',
    date: '2023-05-15',
    total: 299.99,
    status: 'Processing',
    items: [
      { id: 'product-001', name: 'Premium Wireless Headphones', quantity: 1, price: 299.99 }
    ]
  },
  {
    id: 'ORD-2023-1002',
    customer: 'Maria Garcia',
    date: '2023-05-14',
    total: 159.99,
    status: 'Shipped',
    items: [
      { id: 'product-002', name: 'Wireless Earbuds Pro', quantity: 1, price: 159.99 }
    ]
  },
  {
    id: 'ORD-2023-1003',
    customer: 'John Smith',
    date: '2023-05-12',
    total: 389.97,
    status: 'Delivered',
    items: [
      { id: 'product-001', name: 'Premium Wireless Headphones', quantity: 1, price: 299.99 },
      { id: 'product-003', name: 'Premium Headphone Stand', quantity: 1, price: 49.99 },
      { id: 'product-004', name: 'Carrying Case', quantity: 1, price: 39.99 }
    ]
  },
  {
    id: 'ORD-2023-1004',
    customer: 'Sarah Williams',
    date: '2023-05-10',
    total: 159.99,
    status: 'Refunded',
    items: [
      { id: 'product-002', name: 'Wireless Earbuds Pro', quantity: 1, price: 159.99 }
    ]
  }
];

export const OrderManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const { toast } = useToast();
  
  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
  };

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    toast({
      title: "Order updated",
      description: `Order #${orderId} status changed to ${newStatus}`,
    });
  };

  const handleRefund = (orderId: string) => {
    toast({
      title: "Refund processed",
      description: `Refund initiated for order #${orderId}`,
    });
  };

  const handleCancel = (orderId: string) => {
    toast({
      title: "Order cancelled",
      description: `Order #${orderId} has been cancelled`,
    });
  };
  
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Status colors mapping
  const statusColors: Record<string, string> = {
    'Processing': 'bg-blue-100 text-blue-800',
    'Shipped': 'bg-purple-100 text-purple-800',
    'Delivered': 'bg-green-100 text-green-800',
    'Refunded': 'bg-red-100 text-red-800',
    'Cancelled': 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Order Management</h3>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search orders by ID or customer name..." 
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Order Details - {order.id}</DialogTitle>
                        </DialogHeader>
                        
                        <div className="space-y-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium">Customer:</p>
                              <p className="text-sm">{order.customer}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Order Date:</p>
                              <p className="text-sm">{order.date}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Status:</p>
                              <p className="text-sm">{order.status}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Total Amount:</p>
                              <p className="text-sm">${order.total.toFixed(2)}</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium mb-2">Items:</p>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Product</TableHead>
                                  <TableHead>Quantity</TableHead>
                                  <TableHead>Price</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {order.items.map((item) => (
                                  <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>${item.price.toFixed(2)}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium mb-2">Shipping Information:</p>
                            <p className="text-sm">123 Main Street, Apt 4B</p>
                            <p className="text-sm">New York, NY 10001</p>
                            <p className="text-sm">United States</p>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Update Status:</p>
                            <div className="flex flex-wrap gap-2">
                              <Button size="sm" onClick={() => handleUpdateStatus(order.id, 'Processing')}>
                                Processing
                              </Button>
                              <Button size="sm" onClick={() => handleUpdateStatus(order.id, 'Shipped')}>
                                <TruckIcon className="mr-1 h-3 w-3" />
                                Shipped
                              </Button>
                              <Button size="sm" onClick={() => handleUpdateStatus(order.id, 'Delivered')}>
                                Delivered
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleRefund(order.id)}>
                                <RefreshCw className="mr-1 h-3 w-3" />
                                Refund
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleCancel(order.id)}>
                                <Ban className="mr-1 h-3 w-3" />
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button>Close</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="sm" onClick={() => handleUpdateStatus(order.id, 'Shipped')}>
                      <TruckIcon className="h-4 w-4" />
                    </Button>
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
