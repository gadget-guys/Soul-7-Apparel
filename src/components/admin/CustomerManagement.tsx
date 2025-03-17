
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
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Search, Filter, UserCircle, Tag, Mail, Phone } from 'lucide-react';

// Sample customers data
const customers = [
  {
    id: 'CUST-1001',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '(555) 123-4567',
    totalSpent: 299.99,
    totalOrders: 1,
    status: 'Active',
    joinDate: '2023-01-15',
    lastPurchase: '2023-05-15'
  },
  {
    id: 'CUST-1002',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    phone: '(555) 234-5678',
    totalSpent: 159.99,
    totalOrders: 1,
    status: 'Active',
    joinDate: '2023-02-03',
    lastPurchase: '2023-05-14'
  },
  {
    id: 'CUST-1003',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 345-6789',
    totalSpent: 389.97,
    totalOrders: 1,
    status: 'Active',
    joinDate: '2023-01-22',
    lastPurchase: '2023-05-12'
  },
  {
    id: 'CUST-1004',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    phone: '(555) 456-7890',
    totalSpent: 159.99,
    totalOrders: 1,
    status: 'Inactive',
    joinDate: '2023-03-10',
    lastPurchase: '2023-05-10'
  }
];

// Sample order history
const orderHistory = [
  {
    id: 'ORD-2023-1001',
    date: '2023-05-15',
    total: 299.99,
    status: 'Processing'
  },
  {
    id: 'ORD-2023-1002',
    date: '2023-05-14',
    total: 159.99,
    status: 'Shipped'
  },
  {
    id: 'ORD-2023-1003',
    date: '2023-05-12',
    total: 389.97,
    status: 'Delivered'
  }
];

export const CustomerManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [noteContent, setNoteContent] = useState('');
  const { toast } = useToast();
  
  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer);
  };

  const handleSendPromotion = (customerId: string) => {
    toast({
      title: "Promotion sent",
      description: `Special offer sent to customer ${customerId}`,
    });
  };

  const handleAddNote = () => {
    if (!noteContent.trim()) return;
    
    toast({
      title: "Note added",
      description: "Customer note has been saved",
    });
    
    setNoteContent('');
  };
  
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Customer Management</h3>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search customers by name, email, or ID..." 
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
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell>{customer.totalOrders}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => handleViewCustomer(customer)}>
                          <UserCircle className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Customer Profile - {customer.name}</DialogTitle>
                        </DialogHeader>
                        
                        <Tabs defaultValue="profile" className="mt-4">
                          <TabsList>
                            <TabsTrigger value="profile">Profile</TabsTrigger>
                            <TabsTrigger value="orders">Orders</TabsTrigger>
                            <TabsTrigger value="promotions">Promotions</TabsTrigger>
                            <TabsTrigger value="notes">Notes</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="profile" className="space-y-4 pt-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium">Customer ID:</p>
                                <p className="text-sm">{customer.id}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Join Date:</p>
                                <p className="text-sm">{customer.joinDate}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Email:</p>
                                <p className="text-sm">{customer.email}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Phone:</p>
                                <p className="text-sm">{customer.phone}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Total Spent:</p>
                                <p className="text-sm">${customer.totalSpent.toFixed(2)}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Last Purchase:</p>
                                <p className="text-sm">{customer.lastPurchase}</p>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-sm font-medium mb-2">Shipping Address:</p>
                              <p className="text-sm">123 Main Street, Apt 4B</p>
                              <p className="text-sm">New York, NY 10001</p>
                              <p className="text-sm">United States</p>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button size="sm" onClick={() => {}}>
                                <Mail className="mr-1 h-3 w-3" />
                                Email Customer
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => {}}>
                                <Phone className="mr-1 h-3 w-3" />
                                Call
                              </Button>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="orders" className="pt-4">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Order ID</TableHead>
                                  <TableHead>Date</TableHead>
                                  <TableHead>Total</TableHead>
                                  <TableHead>Status</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {orderHistory.map((order) => (
                                  <TableRow key={order.id}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell>${order.total.toFixed(2)}</TableCell>
                                    <TableCell>
                                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                                        ${order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                                          order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' : 
                                          'bg-green-100 text-green-800'}`}>
                                        {order.status}
                                      </span>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TabsContent>
                          
                          <TabsContent value="promotions" className="space-y-4 pt-4">
                            <div className="space-y-4">
                              <div className="border rounded-md p-4">
                                <div className="flex items-start space-x-2">
                                  <Checkbox id="promo1" />
                                  <div>
                                    <label htmlFor="promo1" className="text-sm font-medium block">20% Off Next Purchase</label>
                                    <p className="text-sm text-muted-foreground">One-time discount on next order</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="border rounded-md p-4">
                                <div className="flex items-start space-x-2">
                                  <Checkbox id="promo2" />
                                  <div>
                                    <label htmlFor="promo2" className="text-sm font-medium block">Free Shipping</label>
                                    <p className="text-sm text-muted-foreground">Free shipping on next order over $50</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="border rounded-md p-4">
                                <div className="flex items-start space-x-2">
                                  <Checkbox id="promo3" />
                                  <div>
                                    <label htmlFor="promo3" className="text-sm font-medium block">VIP Membership</label>
                                    <p className="text-sm text-muted-foreground">Upgrade customer to VIP status with ongoing benefits</p>
                                  </div>
                                </div>
                              </div>
                              
                              <Button onClick={() => handleSendPromotion(customer.id)}>
                                <Tag className="mr-1 h-4 w-4" />
                                Send Selected Promotions
                              </Button>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="notes" className="space-y-4 pt-4">
                            <div className="space-y-4">
                              <div className="border rounded-md p-4">
                                <p className="text-sm font-medium">Customer Support - May 16, 2023</p>
                                <p className="text-sm">Customer inquired about warranty extension options.</p>
                              </div>
                              
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Add New Note</label>
                                <Textarea 
                                  value={noteContent}
                                  onChange={(e) => setNoteContent(e.target.value)}
                                  placeholder="Type your note here..."
                                  rows={3}
                                />
                                <Button onClick={handleAddNote}>Save Note</Button>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                        
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button>Close</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="sm" onClick={() => handleSendPromotion(customer.id)}>
                      <Tag className="h-4 w-4" />
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
