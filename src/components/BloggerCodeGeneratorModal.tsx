import React, { useState } from 'react';
import { X, Copy, Check, Code, ShieldCheck, Smartphone, Globe } from 'lucide-react';

interface BloggerCodeGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BloggerCodeGeneratorModal: React.FC<BloggerCodeGeneratorModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const bloggerCode = `<!-- MRS ADMIN BLOGGER MOBILE & RESPONSIVENESS FIX CODE -->
<!-- Paste directly before </head> or inside Blogger > Theme > Edit HTML -->
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5"/>
<style type="text/css">
/* 1. Disable broken preloader that hangs on ?m=1 */
#loader, .preloader, #outline, .check-out {
  display: none !important;
  visibility: hidden !important;
}

/* 2. Fluid layout & responsive typography for mobile */
html, body {
  overflow-x: hidden !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
  color: #171717 !important;
  background-color: #fafafa !important;
  line-height: 1.6 !important;
}

/* 3. Responsive container constraints */
.content-wrapper, .main-wrapper, #main, .post-outer {
  max-width: 900px !important;
  margin: 0 auto !important;
  padding: 12px 16px !important;
  box-sizing: border-box !important;
}

/* 4. Remove legacy post images, empty separators, and ad clutter */
.post-body img, .entry-content img, .post-body picture, .separator,
.adsbygoogle, ins.adsbygoogle, [id*="ad-"], [class*="ad-banner"], .Attribution {
  display: none !important;
}

/* 5. Clean headline hierarchy */
.post-title, h1.entry-title {
  font-size: 1.75rem !important;
  line-height: 1.25 !important;
  font-weight: 700 !important;
  color: #0f172a !important;
  margin-bottom: 12px !important;
}

/* 6. Clean touch targets */
a, button {
  touch-action: manipulation;
}
</style>
<!-- END MRS ADMIN MOBILE FIX -->`;

  const handleCopy = () => {
    navigator.clipboard.writeText(bloggerCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                Blogger Mobile Fix &amp; Responsiveness Snippet
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Directly fix your live Blogger site’s mobile layout (`?m=1`) in 2 minutes
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs">
            <strong>What this does:</strong> Eliminates the broken preloader spinner loop, fixes the `?m=1` viewport zooming bug, removes legacy post images and ad clutter, and provides clean reading typography on phones.
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                CSS Snippet to Copy
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Snippet!' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-neutral-950 text-neutral-200 font-mono text-xs overflow-x-auto max-h-56 leading-relaxed border border-neutral-800">
              {bloggerCode}
            </pre>
          </div>

          <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
            <h4 className="font-bold text-neutral-900 dark:text-white">How to apply in Blogger:</h4>
            <ol className="list-decimal ml-5 space-y-1">
              <li>Open your <strong>Blogger Dashboard</strong> (<a href="https://blogger.com" target="_blank" rel="noreferrer" className="text-amber-600 underline">blogger.com</a>).</li>
              <li>Go to <strong>Theme</strong> &gt; Click the arrow next to Customize &gt; <strong>Edit HTML</strong>.</li>
              <li>Search for <code className="px-1 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded">&lt;/head&gt;</code> and paste this snippet right before it.</li>
              <li>Click <strong>Save</strong> (floppy disk icon in the top right). Your mobile site will instantly be responsive!</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 flex items-center justify-between">
          <span className="text-xs text-neutral-500">Provided free by M R S Multiverse</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
