import { useState } from 'react';
import { blogs, blogCategories } from '@/data/blogs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Plus, Eye, Edit, Trash2, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import AddBlogModal from '../../components/admin/AddBlogModal';
import { useToast } from '@/hooks/use-toast';

const AdminBlog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { toast } = useToast();

  // Filter blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.titleAr.includes(searchTerm);
    
    const matchesCategory = categoryFilter === 'all' || blog.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleDelete = (id: string, title: string) => {
    // Dummy delete - show toast
    toast({
      title: "Blog post deleted",
      description: `"${title}" has been deleted successfully (dummy action)`,
    });
  };

  const handleEdit = (id: string) => {
    // Dummy edit - show toast
    toast({
      title: "Edit feature",
      description: "Edit functionality will be available after Supabase integration",
    });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
            <p className="text-gray-600 mt-1">Manage your blog articles and content</p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add New Post
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <p className="text-sm text-gray-600">Total Posts</p>
            <p className="text-2xl font-bold text-gray-900">{blogs.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <p className="text-sm text-gray-600">Featured</p>
            <p className="text-2xl font-bold text-primary">{blogs.filter(b => b.featured).length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <p className="text-sm text-gray-600">Categories</p>
            <p className="text-2xl font-bold text-secondary">{blogCategories.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <p className="text-sm text-gray-600">This Month</p>
            <p className="text-2xl font-bold text-accent">2</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg border shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by title (EN or AR)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {blogCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name} | {category.nameAr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          Showing {filteredBlogs.length} of {blogs.length} posts
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Read Time</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBlogs.map((blog) => {
              const category = blogCategories.find(c => c.id === blog.category);
              return (
                <TableRow key={blog.id}>
                  <TableCell>
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1 line-clamp-1">
                        {blog.title}
                      </p>
                      <p className="text-sm text-gray-600 font-cairo line-clamp-1" dir="rtl">
                        {blog.titleAr}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {category?.name}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img
                        src={blog.author.avatar}
                        alt={blog.author.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {blog.author.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {blog.author.role}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {formatDate(blog.publishDate)}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {blog.featured ? (
                      <Badge className="bg-accent text-white">Featured</Badge>
                    ) : (
                      <Badge variant="secondary">Published</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm text-gray-600">{blog.readTime} min</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/blog/${blog.slug}`} target="_blank">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(blog.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(blog.id, blog.title)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No blog posts found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AddBlogModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
      />
    </div>
  );
};

export default AdminBlog;
