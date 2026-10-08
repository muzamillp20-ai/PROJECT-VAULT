export function isValidUrl(url: string): boolean {
  if (!url || url.trim() === '') return true; // Empty is allowed (optional)
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function formatUrl(url: string): string {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    return parsed.hostname + parsed.pathname;
  } catch {
    return url;
  }
}

export function truncateUrl(url: string, maxLength: number = 40): string {
  const formatted = formatUrl(url);
  if (formatted.length <= maxLength) return formatted;
  return formatted.substring(0, maxLength) + '...';
}

export function extractDomain(url: string): string {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    return parsed.hostname;
  } catch {
    return url;
  }
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  }
  // Fallback
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return Promise.resolve(true);
  } catch {
    document.body.removeChild(textarea);
    return Promise.resolve(false);
  }
}

export function openExternal(url: string): void {
  if (!url) return;
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function shareUrl(url: string, title: string): void {
  if (navigator.share) {
    navigator.share({ title, url }).catch(() => {
      copyToClipboard(url);
    });
  } else {
    copyToClipboard(url);
  }
}
