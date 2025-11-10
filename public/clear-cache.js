/**
 * Aggressive Cache Clearing Script
 * Forces browser to clear old cached versions
 */
(function() {
  'use strict';
  
  const CURRENT_VERSION = '1.0.2';
  const VERSION_KEY = 'makeup-academy-version';
  
  // Check stored version
  const storedVersion = localStorage.getItem(VERSION_KEY);
  
  // If version mismatch or first visit, clear everything
  if (storedVersion !== CURRENT_VERSION) {
    console.log('🧹 Clearing old cache...');
    
    // Clear localStorage
    localStorage.clear();
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Store new version
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
    
    // Clear service worker cache if exists
    if ('serviceWorker' in navigator && 'caches' in window) {
      caches.keys().then(function(names) {
        for (let name of names) {
          caches.delete(name);
        }
      });
    }
    
    console.log('✅ Cache cleared! Version:', CURRENT_VERSION);
    
    // Force reload from server if this is not the first load
    if (storedVersion && storedVersion !== CURRENT_VERSION) {
      console.log('🔄 Reloading from server...');
      window.location.reload(true);
    }
  }
})();

