import { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogs, blogCategories } from '@/data/blogs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Clock, User } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.titleAr.includes(searchTerm) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Separate featured and regular blogs
  const featuredBlogs = filteredBlogs.filter(blog => blog.featured);
  const regularBlogs = filteredBlogs.filter(blog => !blog.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatDateAr = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-AE', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Cat Care Blog
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Expert advice, tips, and insights for your feline friend
            </p>
            <p className="text-xl text-gray-600 font-cairo" dir="rtl">
              نصائح الخبراء والرؤى لرعاية صديقك القط
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search articles... | ابحث عن مقالات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                size="sm"
              >
                All Categories | جميع الفئات
              </Button>
              {blogCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  size="sm"
                >
                  {category.name} | {category.nameAr}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredBlogs.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Featured Articles</h2>
                <h2 className="text-3xl font-bold text-gray-900 font-cairo" dir="rtl">مقالات مميزة</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {featuredBlogs.map((blog) => (
                  <Link
                    key={blog.id}
                    to={`/blog/${blog.slug}`}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-primary text-white">
                        {blogCategories.find(c => c.id === blog.category)?.name}
                      </Badge>
                      <Badge className="absolute top-4 right-4 bg-accent text-white">
                        Featured
                      </Badge>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-lg font-cairo text-gray-700 mb-3" dir="rtl">
                        {blog.titleAr}
                      </p>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {blog.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(blog.publishDate)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{blog.readTime} min read</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <img
                            src={blog.author.avatar}
                            alt={blog.author.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-xs">{blog.author.name}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      {regularBlogs.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
                <h2 className="text-3xl font-bold text-gray-900 font-cairo" dir="rtl">أحدث المقالات</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {regularBlogs.map((blog) => (
                  <Link
                    key={blog.id}
                    to={`/blog/${blog.slug}`}
                    className="group bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 left-3 bg-primary/90 text-white text-xs">
                        {blogCategories.find(c => c.id === blog.category)?.nameAr}
                      </Badge>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm font-cairo text-gray-700 mb-3 line-clamp-1" dir="rtl">
                        {blog.titleAr}
                      </p>
                      
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {blog.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(blog.publishDate)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{blog.readTime} min</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* No Results */}
      {filteredBlogs.length === 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-1">Try adjusting your search or filters</p>
              <p className="text-gray-600 font-cairo" dir="rtl">حاول تعديل البحث أو الفلاتر</p>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to learn more about cat nutrition?
          </h2>
          <p className="text-xl mb-2 font-cairo" dir="rtl">
            هل تريد معرفة المزيد عن تغذية القطط؟
          </p>
          <p className="text-lg mb-8 opacity-90">
            Explore our premium halal cat food products
          </p>
          <Link to="/products">
            <Button size="lg" variant="secondary" className="font-semibold">
              View Products | عرض المنتجات
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Blog;
