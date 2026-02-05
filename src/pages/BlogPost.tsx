import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { blogs, blogCategories } from '@/data/blogs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Mail, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BlogPost = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const { t: tPost } = useTranslation('blogPost');
  const { t: tBlog, i18n } = useTranslation('blog');

  const locale = i18n.language === 'ar' ? 'ar-AE' : 'en-GB';

  const blog = blogs.find(b => b.slug === slug);

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = blogs
    .filter(b => b.category === blog.category && b.id !== blog.id)
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getCategoryName = (categoryId: string) => tBlog(`categories.${categoryId}`);
  const getBlogTitle = (b: (typeof blogs)[0]) => tBlog(`items.${b.id}.title`, { defaultValue: b.title });
  const getBlogExcerpt = (b: (typeof blogs)[0]) => tBlog(`items.${b.id}.excerpt`, { defaultValue: b.excerpt });

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = getBlogTitle(blog);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast({
          title: tPost('linkCopied'),
          description: tPost('linkCopiedDesc'),
        });
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const category = blogCategories.find(c => c.id === blog.category);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/blog">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              {tPost('backToBlog')}
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden bg-gray-900">
        <img
          src={blog.image}
          alt={getBlogTitle(blog)}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto max-w-4xl">
            <div className="flex gap-2 mb-4">
              {blog.featured && (
                <Badge className="bg-accent text-white">{tPost('featured')}</Badge>
              )}
              <Badge className="bg-primary text-white">
                {category ? getCategoryName(category.id) : ''}
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              {getBlogTitle(blog)}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-3">
                <img
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
                <div>
                  <p className="font-semibold">{blog.author.name}</p>
                  <p className="text-white/80 text-xs">{blog.author.role}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(blog.publishDate)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{tPost('minRead', { count: blog.readTime })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Share Buttons */}
            <div className="flex items-center gap-3 mb-8 pb-8 border-b">
              <span className="text-sm font-semibold text-gray-600">{tPost('shareLabel')}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleShare('facebook')}
                className="gap-2"
              >
                <Facebook className="w-4 h-4" />
                {tPost('facebook')}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleShare('twitter')}
                className="gap-2"
              >
                <Twitter className="w-4 h-4" />
                {tPost('twitter')}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleShare('email')}
                className="gap-2"
              >
                <Mail className="w-4 h-4" />
                {tPost('email')}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleShare('copy')}
                className="gap-2"
              >
                <Share2 className="w-4 h-4" />
                {tPost('copyLink')}
              </Button>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <div className="text-xl text-gray-600 mb-8 leading-relaxed">
                {getBlogExcerpt(blog)}
              </div>
              
              <div 
                className="text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: (tPost(`items.${blog.id}.content`, { defaultValue: blog.content }) as string).replace(/\n/g, '<br />'),
                }}
              />
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-start gap-3">
                <Tag className="w-5 h-5 text-gray-400 mt-1" />
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
              <div className="flex items-start gap-4">
                <img
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  className="w-20 h-20 rounded-full border-2 border-primary"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {blog.author.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {blog.author.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-white border-t">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">{tPost('relatedArticles')}</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedBlog) => (
                  <Link
                    key={relatedBlog.id}
                    to={`/blog/${relatedBlog.slug}`}
                    className="group bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relatedBlog.image}
                        alt={getBlogTitle(relatedBlog)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-primary/90 text-white text-xs">
                        {getCategoryName(relatedBlog.category)}
                      </Badge>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {getBlogTitle(relatedBlog)}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(relatedBlog.publishDate)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{tPost('minReadShort', { count: relatedBlog.readTime })}</span>
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

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {tPost('cta.title')}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {tPost('cta.subtitle')}
          </p>
          <Link to="/products">
            <Button size="lg" variant="secondary" className="font-semibold">
              {tPost('cta.button')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
