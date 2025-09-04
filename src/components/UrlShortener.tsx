import React, { useState } from 'react';
import { Copy, ExternalLink, TrendingUp, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: Date;
}

const UrlShortener = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);
  const { toast } = useToast();

  const generateShortCode = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const shortenUrl = async () => {
    if (!url.trim()) {
      toast({
        title: "Please enter a URL",
        description: "You need to provide a URL to shorten.",
        variant: "destructive",
      });
      return;
    }

    if (!url.match(/^https?:\/\/.+/)) {
      toast({
        title: "Invalid URL format",
        description: "Please enter a valid URL starting with http:// or https://",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const shortCode = generateShortCode();
      const newUrl: ShortenedUrl = {
        id: shortCode,
        originalUrl: url,
        shortUrl: `https://short.ly/${shortCode}`,
        clicks: 0,
        createdAt: new Date(),
      };

      setShortenedUrls(prev => [newUrl, ...prev]);
      setUrl('');
      setIsLoading(false);
      
      toast({
        title: "URL shortened successfully!",
        description: "Your shortened URL is ready to use.",
      });
    }, 1000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "The shortened URL has been copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text font-heading">
              Shorten URLs
              <br />
              <span className="text-4xl md:text-6xl">Track Everything</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Create short, memorable links and get detailed analytics. 
              Perfect for social media, marketing campaigns, and tracking engagement.
            </p>

            {/* URL Shortener Form */}
            <Card className="glass-card max-w-2xl mx-auto mb-16 animate-float">
              <CardHeader>
                <CardTitle className="text-2xl gradient-text">Enter your URL</CardTitle>
                <CardDescription>Paste your long URL here to get a shortened version</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="url"
                    placeholder="https://example.com/very-long-url..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1 h-12 text-lg bg-background/50 backdrop-blur-sm border-border"
                    onKeyPress={(e) => e.key === 'Enter' && shortenUrl()}
                  />
                  <Button 
                    onClick={shortenUrl} 
                    disabled={isLoading}
                    variant="hero"
                    size="lg"
                    className="h-12 px-8"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Shortening...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        Shorten URL
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <Card className="glass-card text-center">
                <CardContent className="pt-6">
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
                  <p className="text-muted-foreground">Your links are protected with enterprise-grade security</p>
                </CardContent>
              </Card>
              
              <Card className="glass-card text-center">
                <CardContent className="pt-6">
                  <TrendingUp className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Detailed Analytics</h3>
                  <p className="text-muted-foreground">Track clicks, locations, and engagement metrics</p>
                </CardContent>
              </Card>
              
              <Card className="glass-card text-center">
                <CardContent className="pt-6">
                  <Zap className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-muted-foreground">Instant URL shortening with minimal redirect time</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Recent URLs */}
      {shortenedUrls.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center gradient-text">Your Shortened URLs</h2>
            
            <div className="space-y-4">
              {shortenedUrls.map((item) => (
                <Card key={item.id} className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-primary">{item.shortUrl}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(item.shortUrl)}
                            className="h-8 w-8 p-0"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{item.originalUrl}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>{item.clicks} clicks</span>
                          <span>Created {item.createdAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(item.shortUrl, '_blank')}
                        >
                          <ExternalLink className="w-3 h-3" />
                          Visit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(item.shortUrl)}
                        >
                          <Copy className="w-3 h-3" />
                          Copy
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default UrlShortener;