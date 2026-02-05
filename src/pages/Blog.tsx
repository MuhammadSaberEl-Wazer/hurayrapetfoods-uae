import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { blogs, blogCategories } from '@/data/blogs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Clock } from 'lucide-react';

const Blog = () => {
  const { t, i18n } = useTranslation('blog');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const locale = i18n.language === 'ar' ? 'ar-AE' : 'en-GB';

  // Filter blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Separate featured and regular blogs
  const featuredBlogs = filteredBlogs.filter(blog => blog.featured);
  const regularBlogs = filteredBlogs.filter(blog => !blog.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getCategoryName = (categoryId: string) =>
    categoryId === 'all' ? t('allCategories') : t(`categories.${categoryId}`);

  const getBlogTitle = (blog: (typeof blogs)[0]) =>
    t(`items.${blog.id}.title`, { defaultValue: blog.title });
  const getBlogExcerpt = (blog: (typeof blogs)[0]) =>
    t(`items.${blog.id}.excerpt`, { defaultValue: blog.excerpt });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              {t('hero.subtitle')}
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
                  placeholder={t('searchPlaceholder')}
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
                {t('allCategories')}
              </Button>
              {blogCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  size="sm"
                >
                  {t(`categories.${category.id}`)}
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
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">{t('featuredArticles')}</h2>
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
                        alt={getBlogTitle(blog)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-primary text-white">
                        {getCategoryName(blog.category)}
                      </Badge>
                      <Badge className="absolute top-4 right-4 rtl:right-auto rtl:left-4 bg-accent text-white">
                        {t('featured')}
                      </Badge>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {getBlogTitle(blog)}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {getBlogExcerpt(blog)}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(blog.publishDate)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{t('minRead', { count: blog.readTime })}</span>
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
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">{t('latestArticles')}</h2>
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
                        alt={getBlogTitle(blog)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-primary/90 text-white text-xs">
                        {getCategoryName(blog.category)}
                      </Badge>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {getBlogTitle(blog)}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {getBlogExcerpt(blog)}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(blog.publishDate)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{t('minReadShort', { count: blog.readTime })}</span>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('noResults.title')}</h3>
              <p className="text-gray-600">{t('noResults.hint')}</p>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {t('cta.subtitle')}
          </p>
          <Link to="/products">
            <Button size="lg" variant="secondary" className="font-semibold">
              {t('cta.button')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Blog;
