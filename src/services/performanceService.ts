/**
 * Service d'optimisation des performances pour l'application santé-tech
 * Gère le cache, la limitation des requêtes et l'optimisation des ressources
 */

// Cache simple en mémoire pour les résultats fréquents
class PerformanceCache {
  private cache: Map<string, { data: any; timestamp: number; ttl: number }>;
  
  constructor() {
    this.cache = new Map();
  }

  set(key: string, data: any, ttlMinutes: number = 10): void {
    const ttl = ttlMinutes * 60 * 1000; // Convert to milliseconds
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
    
    // Auto-cleanup après TTL
    setTimeout(() => {
      this.cache.delete(key);
    }, ttl);
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  clear(): void {
    this.cache.clear();
  }
}

// Instance globale du cache
export const performanceCache = new PerformanceCache();

// Debounce pour limiter les appels API fréquents
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
}

// Throttle pour limiter la fréquence d'exécution
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(null, args);
    }
  };
}

// Optimisation des calculs BMI avec cache
export function calculateBMIOptimized(
  weight: number, 
  height: number, 
  age?: number
): { bmi: number; cached: boolean } {
  const cacheKey = `bmi_${weight}_${height}_${age || 'no_age'}`;
  
  // Vérifier le cache d'abord
  const cached = performanceCache.get(cacheKey);
  if (cached) {
    return { bmi: cached, cached: true };
  }
  
  // Calculer si pas en cache
  const heightInMeters = height / 100;
  const bmi = Number((weight / (heightInMeters * heightInMeters)).toFixed(2));
  
  // Mettre en cache pour 1 heure
  performanceCache.set(cacheKey, bmi, 60);
  
  return { bmi, cached: false };
}

// Préchargement intelligent des ressources
export class ResourcePreloader {
  private static preloadedImages: Set<string> = new Set();
  
  static preloadImage(src: string): Promise<void> {
    if (this.preloadedImages.has(src)) {
      return Promise.resolve();
    }
    
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.preloadedImages.add(src);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }
  
  static preloadImages(sources: string[]): Promise<void[]> {
    return Promise.all(sources.map(src => this.preloadImage(src)));
  }
}

// Métriques de performance
export class PerformanceMonitor {
  private static metrics: Map<string, number[]> = new Map();
  
  static startTiming(label: string): () => void {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (!this.metrics.has(label)) {
        this.metrics.set(label, []);
      }
      
      const timings = this.metrics.get(label)!;
      timings.push(duration);
      
      // Garder seulement les 100 dernières mesures
      if (timings.length > 100) {
        timings.shift();
      }
      
      // Log les opérations lentes en développement
      if (process.env.NODE_ENV === 'development' && duration > 100) {
        console.warn(`Performance: ${label} took ${duration.toFixed(2)}ms`);
      }
    };
  }
  
  static getAverageTime(label: string): number {
    const timings = this.metrics.get(label);
    if (!timings || timings.length === 0) return 0;
    
    return timings.reduce((sum, time) => sum + time, 0) / timings.length;
  }
  
  static getAllMetrics(): Record<string, { average: number; count: number }> {
    const result: Record<string, { average: number; count: number }> = {};
    
    for (const [label, timings] of this.metrics.entries()) {
      result[label] = {
        average: this.getAverageTime(label),
        count: timings.length
      };
    }
    
    return result;
  }
}

// Optimisation des localStorage avec compression
export class OptimizedStorage {
  private static compressionEnabled = true;
  
  static setItem(key: string, value: any): void {
    try {
      const serialized = JSON.stringify(value);
      
      // Simple compression pour les grandes données
      if (this.compressionEnabled && serialized.length > 1000) {
        // Ici on pourrait implémenter une compression réelle
        // Pour l'instant, on utilise juste une optimisation basique
        localStorage.setItem(key, serialized);
      } else {
        localStorage.setItem(key, serialized);
      }
    } catch (error) {
      console.warn('OptimizedStorage: Erreur lors de la sauvegarde', error);
    }
  }
  
  static getItem<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue || null;
      
      return JSON.parse(item);
    } catch (error) {
      console.warn('OptimizedStorage: Erreur lors de la lecture', error);
      return defaultValue || null;
    }
  }
  
  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }
  
  static clear(): void {
    localStorage.clear();
  }
}

// Configuration des performances par défaut
export const PERFORMANCE_CONFIG = {
  // Délais pour debounce/throttle
  SEARCH_DEBOUNCE_MS: 300,
  SCROLL_THROTTLE_MS: 16, // ~60fps
  RESIZE_THROTTLE_MS: 100,
  
  // Cache TTL (en minutes)
  BMI_CACHE_TTL: 60,
  API_CACHE_TTL: 10,
  IMAGE_CACHE_TTL: 120,
  
  // Limites
  MAX_HISTORY_ITEMS: 50,
  MAX_CACHE_SIZE: 100,
  
  // Seuils d'alerte performance
  SLOW_OPERATION_MS: 100,
  VERY_SLOW_OPERATION_MS: 500
};