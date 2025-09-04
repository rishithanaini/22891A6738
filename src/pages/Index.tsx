import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import UrlShortener from '@/components/UrlShortener';
import UrlAnalytics from '@/components/UrlAnalytics';
import heroImage from '@/assets/hero-bg.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <Tabs defaultValue="shortener" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="glass-card">
                <TabsTrigger value="shortener" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  URL Shortener
                </TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Analytics
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="shortener">
              <UrlShortener />
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold gradient-text mb-4">Analytics Dashboard</h2>
                  <p className="text-muted-foreground">
                    Track your URL performance with detailed insights and metrics
                  </p>
                </div>
                <UrlAnalytics />
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Index;
