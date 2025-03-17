
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
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { Search, UserPlus, UserCog, LockIcon } from 'lucide-react';

// Sample users data
const users = [
  {
    id: 'user-001',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2023-05-15 09:30 AM'
  },
  {
    id: 'user-002',
    name: 'Store Manager',
    email: 'manager@example.com',
    role: 'Manager',
    status: 'Active',
    lastLogin: '2023-05-14 02:15 PM'
  },
  {
    id: 'user-003',
    name: 'Inventory Clerk',
    email: 'inventory@example.com',
    role: 'Staff',
    status: 'Active',
    lastLogin: '2023-05-13 11:45 AM'
  },
  {
    id: 'user-004',
    name: 'Customer Support',
    email: 'support@example.com',
    role: 'Staff',
    status: 'Inactive',
    lastLogin: '2023-04-20 10:00 AM'
  }
];

export const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const { toast } = useToast();
  
  const newUserForm = useForm({
    defaultValues: {
      name: '',
      email: '',
      role: 'Staff',
      password: '',
      isActive: true
    }
  });
  
  const editUserForm = useForm({
    defaultValues: {
      name: '',
      email: '',
      role: 'Staff',
      isActive: true
    }
  });
  
  const handleAddUser = (data: any) => {
    toast({
      title: "User created",
      description: `New user ${data.name} has been added successfully`,
    });
    
    newUserForm.reset();
  };
  
  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    
    editUserForm.reset({
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.status === 'Active'
    });
  };
  
  const handleUpdateUser = (data: any) => {
    toast({
      title: "User updated",
      description: `User ${data.name} has been updated successfully`,
    });
  };
  
  const handleResetPassword = (userId: string) => {
    toast({
      title: "Password reset",
      description: "Password reset link has been sent to the user's email",
    });
  };
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">User Management</h3>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            
            <Form {...newUserForm}>
              <form onSubmit={newUserForm.handleSubmit(handleAddUser)} className="space-y-4 py-2">
                <FormField
                  control={newUserForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={newUserForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" {...field} type="email" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={newUserForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={newUserForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <select 
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          {...field}
                        >
                          <option value="Admin">Admin</option>
                          <option value="Manager">Manager</option>
                          <option value="Staff">Staff</option>
                        </select>
                      </FormControl>
                      <FormDescription>
                        Determines the user's permissions in the system
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={newUserForm.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Active Status</FormLabel>
                        <FormDescription>
                          Enable if the user should have immediate access
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Create User</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search users by name, email, or role..." 
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
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                          <UserCog className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit User - {user.name}</DialogTitle>
                        </DialogHeader>
                        
                        <Form {...editUserForm}>
                          <form onSubmit={editUserForm.handleSubmit(handleUpdateUser)} className="space-y-4 py-2">
                            <FormField
                              control={editUserForm.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={editUserForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="email" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={editUserForm.control}
                              name="role"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Role</FormLabel>
                                  <FormControl>
                                    <select 
                                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                      {...field}
                                    >
                                      <option value="Admin">Admin</option>
                                      <option value="Manager">Manager</option>
                                      <option value="Staff">Staff</option>
                                    </select>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={editUserForm.control}
                              name="isActive"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-base">Active Status</FormLabel>
                                    <FormDescription>
                                      User account status
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <Button 
                              type="button" 
                              variant="outline"
                              className="w-full"
                              onClick={() => handleResetPassword(user.id)}
                            >
                              <LockIcon className="mr-2 h-4 w-4" />
                              Reset Password
                            </Button>
                            
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button type="submit">Save Changes</Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="sm" onClick={() => handleResetPassword(user.id)}>
                      <LockIcon className="h-4 w-4" />
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
