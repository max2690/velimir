// Утилиты для работы с Яндекс.Метрикой

declare global {
  interface Window {
    ym?: (counterId: number, method: string, target: string, params?: any) => void;
  }
}

const getMetrikaId = (): number | null => {
  if (typeof window === "undefined") return null;
  const id = process.env.NEXT_PUBLIC_YM_ID;
  return id ? parseInt(id, 10) : null;
};

/**
 * Отправка события в Яндекс.Метрику
 */
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window === "undefined" || !window.ym) return;
  const counterId = getMetrikaId();
  if (!counterId) return;
  
  window.ym(counterId, "reachGoal", eventName, params);
};

/**
 * Отслеживание глубины скролла
 */
export const trackScrollDepth = (depth: number) => {
  trackEvent("scroll_depth", { depth });
};

/**
 * Отслеживание взаимодействия с карточкой продукта
 */
export const trackProductInteraction = (productId: string, action: "hover" | "click" | "view") => {
  trackEvent("product_interaction", { productId, action });
};

/**
 * Отслеживание времени на странице
 */
export const trackTimeOnPage = (seconds: number) => {
  trackEvent("time_on_page", { seconds });
};

/**
 * Инициализация отслеживания скролла
 */
export const initScrollTracking = () => {
  if (typeof window === "undefined") return;

  const depths = [25, 50, 75, 100];
  const tracked: Set<number> = new Set();

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    depths.forEach((depth) => {
      if (scrollPercent >= depth && !tracked.has(depth)) {
        tracked.add(depth);
        trackScrollDepth(depth);
      }
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
};

/**
 * Инициализация отслеживания времени на странице
 */
export const initTimeTracking = () => {
  if (typeof window === "undefined") return;

  const startTime = Date.now();
  const intervals = [10, 30, 60, 120]; // секунды
  const tracked: Set<number> = new Set();

  const checkTime = () => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    
    intervals.forEach((interval) => {
      if (elapsed >= interval && !tracked.has(interval)) {
        tracked.add(interval);
        trackTimeOnPage(interval);
      }
    });
  };

  const intervalId = setInterval(checkTime, 5000); // проверка каждые 5 секунд
  
  return () => {
    clearInterval(intervalId);
  };
};
