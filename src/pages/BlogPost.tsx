import { useParams, Link, Navigate } from 'react-router-dom';
import { blogs, blogCategories } from '@/data/blogs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Mail, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BlogPost = () => {
  const { slug } = useParams();
  const { toast } = useToast();

  // Find the blog post
  const blog = blogs.find(b => b.slug === slug);

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  // Find related posts (same category, excluding current)
  const relatedPosts = blogs
    .filter(b => b.category === blog.category && b.id !== blog.id)
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatDateAr = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-AE', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = blog.title;
    
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
          title: "Link copied!",
          description: "Article link copied to clipboard",
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
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden bg-gray-900">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto max-w-4xl">
            <div className="flex gap-2 mb-4">
              {blog.featured && (
                <Badge className="bg-accent text-white">Featured</Badge>
              )}
              <Badge className="bg-primary text-white">
                {category?.name} | {category?.nameAr}
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              {blog.title}
            </h1>
            <p className="text-xl md:text-2xl font-cairo mb-6" dir="rtl">
              {blog.titleAr}
            </p>
            
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
                <span>{blog.readTime} min read</span>
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
              <span className="text-sm font-semibold text-gray-600">Share:</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleShare('facebook')}
                className="gap-2"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleShare('twitter')}
                className="gap-2"
              >
                <Twitter className="w-4 h-4" />
                Twitter
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleShare('email')}
                className="gap-2"
              >
                <Mail className="w-4 h-4" />
                Email
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleShare('copy')}
                className="gap-2"
              >
                <Share2 className="w-4 h-4" />
                Copy Link
              </Button>
            </div>

            {/* English Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <div className="text-xl text-gray-600 mb-8 leading-relaxed">
                {blog.excerpt}
              </div>
              
              <div 
                className="text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
              />
            </div>

            {/* Divider */}
            <div className="border-t-2 border-primary/20 my-12"></div>

            {/* Arabic Content */}
            <div className="prose prose-lg max-w-none font-cairo" dir="rtl">
              <div className="text-xl text-gray-600 mb-8 leading-relaxed">
                {blog.excerptAr}
              </div>
              
              <div 
                className="text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.contentAr.replace(/\n/g, '<br />') }}
              />
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-start gap-3 mb-4">
                <Tag className="w-5 h-5 text-gray-400 mt-1" />
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-start gap-3" dir="rtl">
                <Tag className="w-5 h-5 text-gray-400 mt-1" />
                <div className="flex flex-wrap gap-2">
                  {blog.tagsAr.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="font-cairo">
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
                  <p className="text-lg font-cairo text-gray-700 mb-1" dir="rtl">
                    {blog.author.nameAr}
                  </p>
                  <p className="text-sm font-cairo text-gray-600" dir="rtl">
                    {blog.author.roleAr}
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
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Related Articles</h2>
                <h2 className="text-3xl font-bold text-gray-900 font-cairo" dir="rtl">مقالات ذات صلة</h2>
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
                        alt={relatedBlog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 left-3 bg-primary/90 text-white text-xs">
                        {category?.nameAr}
                      </Badge>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-sm font-cairo text-gray-700 mb-3 line-clamp-1" dir="rtl">
                        {relatedBlog.titleAr}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(relatedBlog.publishDate)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{relatedBlog.readTime} min</span>
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
            Ready to give your cat the best nutrition?
          </h2>
          <p className="text-xl mb-2 font-cairo" dir="rtl">
            هل أنت مستعد لمنح قطتك أفضل تغذية؟
          </p>
          <p className="text-lg mb-8 opacity-90">
            Explore our premium halal cat food products
          </p>
          <Link to="/products">
            <Button size="lg" variant="secondary" className="font-semibold">
              Shop Now | تسوق الآن
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
