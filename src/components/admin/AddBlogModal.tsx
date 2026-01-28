import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { blogCategories } from '@/data/blogs';
import { useToast } from '@/hooks/use-toast';
import { X, Plus } from 'lucide-react';

interface AddBlogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddBlogModal = ({ open, onOpenChange }: AddBlogModalProps) => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    titleAr: '',
    slug: '',
    excerpt: '',
    excerptAr: '',
    content: '',
    contentAr: '',
    category: 'nutrition',
    image: '',
    publishDate: new Date().toISOString().split('T')[0],
    readTime: 5,
    featured: false,
    authorName: '',
    authorNameAr: '',
    authorRole: '',
    authorRoleAr: '',
    authorAvatar: '',
  });

  const [tags, setTags] = useState<string[]>([]);
  const [tagsAr, setTagsAr] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [newTagAr, setNewTagAr] = useState('');

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate slug from title
    if (field === 'title' && typeof value === 'string') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const addTagAr = () => {
    if (newTagAr.trim() && !tagsAr.includes(newTagAr.trim())) {
      setTagsAr([...tagsAr, newTagAr.trim()]);
      setNewTagAr('');
    }
  };

  const removeTagAr = (index: number) => {
    setTagsAr(tagsAr.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Dummy submission - show toast
    toast({
      title: "Blog post created!",
      description: `"${formData.title}" has been created successfully (dummy action)`,
    });
    
    // Reset form
    setFormData({
      title: '',
      titleAr: '',
      slug: '',
      excerpt: '',
      excerptAr: '',
      content: '',
      contentAr: '',
      category: 'nutrition',
      image: '',
      publishDate: new Date().toISOString().split('T')[0],
      readTime: 5,
      featured: false,
      authorName: '',
      authorNameAr: '',
      authorRole: '',
      authorRoleAr: '',
      authorAvatar: '',
    });
    setTags([]);
    setTagsAr([]);
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Blog Post</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title (English) *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., The Best Cat Food Guide"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="titleAr" className="font-cairo">Title (Arabic) *</Label>
                <Input
                  id="titleAr"
                  value={formData.titleAr}
                  onChange={(e) => handleInputChange('titleAr', e.target.value)}
                  placeholder="مثال: دليل أفضل طعام للقطط"
                  className="font-cairo"
                  dir="rtl"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="slug">Slug (URL) *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="auto-generated-from-title"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Auto-generated from English title</p>
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {blogCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name} | {category.nameAr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="image">Featured Image URL *</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                placeholder="https://images.unsplash.com/..."
                required
              />
            </div>
          </div>

          {/* Excerpts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Excerpts</h3>
            
            <div>
              <Label htmlFor="excerpt">Excerpt (English) *</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                placeholder="A brief summary of the article (2-3 sentences)"
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="excerptAr" className="font-cairo">Excerpt (Arabic) *</Label>
              <Textarea
                id="excerptAr"
                value={formData.excerptAr}
                onChange={(e) => handleInputChange('excerptAr', e.target.value)}
                placeholder="ملخص مختصر للمقال (2-3 جمل)"
                className="font-cairo"
                dir="rtl"
                rows={3}
                required
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Full Content</h3>
            
            <div>
              <Label htmlFor="content">Content (English) *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Full article content in English. Supports markdown formatting."
                rows={10}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Supports basic markdown: # for headings, ** for bold, etc.
              </p>
            </div>

            <div>
              <Label htmlFor="contentAr" className="font-cairo">Content (Arabic) *</Label>
              <Textarea
                id="contentAr"
                value={formData.contentAr}
                onChange={(e) => handleInputChange('contentAr', e.target.value)}
                placeholder="محتوى المقال الكامل باللغة العربية. يدعم تنسيق markdown."
                className="font-cairo"
                dir="rtl"
                rows={10}
                required
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Tags</h3>
            
            <div>
              <Label>Tags (English)</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="font-cairo">Tags (Arabic)</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newTagAr}
                  onChange={(e) => setNewTagAr(e.target.value)}
                  placeholder="أضف وسم"
                  className="font-cairo"
                  dir="rtl"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTagAr())}
                />
                <Button type="button" onClick={addTagAr} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3" dir="rtl">
                {tagsAr.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2 font-cairo"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTagAr(index)}
                      className="hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Author */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Author Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="authorName">Author Name (English) *</Label>
                <Input
                  id="authorName"
                  value={formData.authorName}
                  onChange={(e) => handleInputChange('authorName', e.target.value)}
                  placeholder="Dr. Ahmed Al-Mansoori"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="authorNameAr" className="font-cairo">Author Name (Arabic) *</Label>
                <Input
                  id="authorNameAr"
                  value={formData.authorNameAr}
                  onChange={(e) => handleInputChange('authorNameAr', e.target.value)}
                  placeholder="د. أحمد المنصوري"
                  className="font-cairo"
                  dir="rtl"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="authorRole">Author Role (English) *</Label>
                <Input
                  id="authorRole"
                  value={formData.authorRole}
                  onChange={(e) => handleInputChange('authorRole', e.target.value)}
                  placeholder="Veterinary Nutritionist"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="authorRoleAr" className="font-cairo">Author Role (Arabic) *</Label>
                <Input
                  id="authorRoleAr"
                  value={formData.authorRoleAr}
                  onChange={(e) => handleInputChange('authorRoleAr', e.target.value)}
                  placeholder="أخصائي تغذية بيطرية"
                  className="font-cairo"
                  dir="rtl"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="authorAvatar">Author Avatar URL *</Label>
              <Input
                id="authorAvatar"
                value={formData.authorAvatar}
                onChange={(e) => handleInputChange('authorAvatar', e.target.value)}
                placeholder="https://images.unsplash.com/..."
                required
              />
            </div>
          </div>

          {/* Publishing Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Publishing Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="publishDate">Publish Date *</Label>
                <Input
                  id="publishDate"
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) => handleInputChange('publishDate', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="readTime">Read Time (minutes) *</Label>
                <Input
                  id="readTime"
                  type="number"
                  min="1"
                  max="60"
                  value={formData.readTime}
                  onChange={(e) => handleInputChange('readTime', parseInt(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <Label htmlFor="featured" className="text-base">Featured Post</Label>
                <p className="text-sm text-gray-500">Display this post in the featured section</p>
              </div>
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => handleInputChange('featured', checked)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Blog Post
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBlogModal;
