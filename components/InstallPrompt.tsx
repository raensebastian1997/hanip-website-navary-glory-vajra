'use client';

import { useEffect, useState, type ReactElement } from 'react';
import { CloseIcon, DownloadIcon } from '@/components/icons';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: readonly string[];
  readonly userChoice: Promise<{
    readonly outcome: 'accepted' | 'dismissed';
    readonly platform: string;
  }>;
  prompt(): Promise<void>;
}

interface NavigatorWithStandalone extends Navigator {
  readonly standalone?: boolean;
}

export interface InstallPromptProps {
  readonly appName: string;
}

export function InstallPrompt({ appName }: InstallPromptProps): ReactElement | null {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isInstalling, setIsInstalling] = useState<boolean>(false);

  useEffect(() => {
    const navigatorWithStandalone = window.navigator as NavigatorWithStandalone;
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      navigatorWithStandalone.standalone === true;

    if (isStandalone) {
      return;
    }

    const onBeforeInstallPrompt = (event: Event): void => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    const onAppInstalled = (): void => {
      setDeferredPrompt(null);
      setIsVisible(false);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, []);

  const handleInstall = async (): Promise<void> => {
    if (!deferredPrompt) {
      return;
    }

    setIsInstalling(true);
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    setIsInstalling(false);

    if (choice.outcome === 'accepted') {
      setIsVisible(false);
    }

    setDeferredPrompt(null);
  };

  const handleDismiss = (): void => {
    setIsVisible(false);
    setDeferredPrompt(null);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-24 z-50 mx-auto max-w-md rounded-2xl border border-ink/10 bg-white p-4 shadow-float sm:hidden">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <DownloadIcon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-extrabold text-ink">
            Pasang {appName}
          </p>
          <p className="mt-1 text-xs leading-5 text-ink/55">
            Akses lebih cepat langsung dari layar utama.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => {
                void handleInstall();
              }}
              disabled={isInstalling}
              className="btn btn-primary min-h-9 px-4 py-2 text-xs"
            >
              {isInstalling ? 'Memproses...' : 'Pasang'}
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="btn min-h-9 border border-ink/10 px-4 py-2 text-xs text-ink/60 hover:bg-ink/5"
            >
              Nanti
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Tutup dialog pasang aplikasi"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink/40 transition hover:bg-ink/5 hover:text-ink"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
