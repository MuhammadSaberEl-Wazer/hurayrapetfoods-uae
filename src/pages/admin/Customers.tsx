import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Eye, 
  Search,
  Mail,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react'

// Mock Customers Data
const mockCustomers = [
  {
    id: 'CUST-001',
    name: 'Ahmed Al Mansouri',
    email: 'ahmed@example.com',
    phone: '+971501234567',
    emirate: 'Dubai',
    totalOrders: 12,
    totalSpent: 2640,
    joinDate: '2025-08-15',
    lastOrder: '2026-01-28'
  },
  {
    id: 'CUST-002',
    name: 'Fatima Hassan',
    email: 'fatima@example.com',
    phone: '+971507654321',
    emirate: 'Abu Dhabi',
    totalOrders: 8,
    totalSpent: 1840,
    joinDate: '2025-09-20',
    lastOrder: '2026-01-28'
  },
  {
    id: 'CUST-003',
    name: 'Mohammed Abdullah',
    email: 'mohammed@example.com',
    phone: '+971509876543',
    emirate: 'Sharjah',
    totalOrders: 15,
    totalSpent: 3300,
    joinDate: '2025-07-10',
    lastOrder: '2026-01-27'
  },
  {
    id: 'CUST-004',
    name: 'Aisha Salem',
    email: 'aisha@example.com',
    phone: '+971501112233',
    emirate: 'Ajman',
    totalOrders: 5,
    totalSpent: 1100,
    joinDate: '2025-10-05',
    lastOrder: '2026-01-27'
  },
  {
    id: 'CUST-005',
    name: 'Khalid Al Zaabi',
    email: 'khalid@example.com',
    phone: '+971504445566',
    emirate: 'Ras Al Khaimah',
    totalOrders: 18,
    totalSpent: 3960,
    joinDate: '2025-06-01',
    lastOrder: '2026-01-26'
  },
  {
    id: 'CUST-006',
    name: 'Mariam Ibrahim',
    email: 'mariam@example.com',
    phone: '+971507778899',
    emirate: 'Dubai',
    totalOrders: 10,
    totalSpent: 2200,
    joinDate: '2025-08-25',
    lastOrder: '2026-01-25'
  },
  {
    id: 'CUST-007',
    name: 'Omar Hassan',
    email: 'omar@example.com',
    phone: '+971503334455',
    emirate: 'Fujairah',
    totalOrders: 6,
    totalSpent: 1320,
    joinDate: '2025-11-12',
    lastOrder: '2026-01-24'
  },
  {
    id: 'CUST-008',
    name: 'Sara Mohammed',
    email: 'sara@example.com',
    phone: '+971506667788',
    emirate: 'Umm Al Quwain',
    totalOrders: 4,
    totalSpent: 880,
    joinDate: '2025-12-01',
    lastOrder: '2026-01-23'
  }
]

export default function AdminCustomers() {
  const { t } = useTranslation('admin-customers')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  )

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-causten font-bold text-gray-900 mb-2">{t('title')}</h1>
          <p className="text-gray-600">{t('subtitle')}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">{mockCustomers.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t('totalOrders')}</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockCustomers.reduce((sum, c) => sum + c.totalOrders, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Phone className="w-6 h-6 text-secondary" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t('totalRevenue')}</p>
              <p className="text-2xl font-bold text-gray-900">
                AED {mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-accent" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t('avgOrderValue')}</p>
              <p className="text-2xl font-bold text-gray-900">
                AED {Math.round(mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0) / 
                  mockCustomers.reduce((sum, c) => sum + c.totalOrders, 0))}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('tableCustomer')}</TableHead>
              <TableHead>{t('tableContact')}</TableHead>
              <TableHead>{t('tableLocation')}</TableHead>
              <TableHead>{t('tableOrders')}</TableHead>
              <TableHead>{t('tableTotalSpent')}</TableHead>
              <TableHead>{t('tableJoinDate')}</TableHead>
              <TableHead>{t('tableLastOrder')}</TableHead>
              <TableHead className="text-right">{t('tableActions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-gray-900">{customer.name}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p className="text-gray-600 flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {customer.email}
                    </p>
                    <p className="text-gray-500 flex items-center gap-1 mt-1">
                      <Phone className="w-3 h-3" />
                      {customer.phone}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {customer.emirate}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{t('ordersCount', { count: customer.totalOrders })}</Badge>
                </TableCell>
                <TableCell className="font-medium">
                  AED {customer.totalSpent.toLocaleString()}
                </TableCell>
                <TableCell className="text-gray-600 text-sm">
                  {customer.joinDate}
                </TableCell>
                <TableCell className="text-gray-600 text-sm">
                  {customer.lastOrder}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-700">
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">{t('noCustomers')}</p>
          </div>
        )}
      </div>
    </div>
  )
}
