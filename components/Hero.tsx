'use client';

import { useEffect, useState, type ReactElement } from 'react';
import { ArrowRightIcon, WhatsAppIcon } from '@/components/icons';
import sliderDataJson from '@/data/slider.json';

interface SliderSlide {
  readonly image: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly price?: string;
  readonly ctaLabel: string;
  readonly ctaHref: string;
}

interface SliderData {
  readonly slides: readonly SliderSlide[];
  readonly autoPlayMs: number;
}

const sliderData = sliderDataJson as SliderData;

export function Hero(): ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = sliderData.slides;
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, sliderData.autoPlayMs);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  return (
    <section
      id="beranda"
      aria-roledescription="carousel"
      aria-label="Layanan legalitas usaha"
      className="relative isolate h-[820px] overflow-hidden bg-[#101a2e] text-white sm:h-[760px] lg:h-[760px]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(11, 20, 38, .94) 0%, rgba(11, 20, 38, .78) 52%, rgba(11, 20, 38, .48) 100%), url("${activeSlide.image}")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-20" />
      <div aria-hidden="true" className="hero-glow absolute inset-0 opacity-35" />

      <div className="container-page relative flex h-full flex-col justify-between py-12 sm:py-14 lg:py-16">
        <div className="grid flex-1 items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div
            key={activeIndex}
            className="hero-slide-enter max-w-3xl"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#f0c75e]/30 bg-[#101a2e]/45 px-3 py-2 text-[0.65rem] font-bold uppercase leading-tight tracking-[0.12em] text-[#f0c75e] backdrop-blur transition-colors duration-300 sm:gap-2.5 sm:px-4 sm:text-sm sm:tracking-[0.16em]">
              <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-[#f0c75e] shadow-[0_0_12px_rgba(240,199,94,0.7)]" />
              <span key={activeIndex} className="hero-eyebrow-text min-w-0">
                {activeSlide?.eyebrow}
              </span>
            </div>

            <h1 className="mt-7 max-w-3xl font-display text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {activeSlide?.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              {activeSlide?.description}
            </p>

            {activeSlide?.price && (
              <div className="mt-7 inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-2xl border border-white/15 bg-[#101a2e]/45 px-5 py-4 backdrop-blur">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
                  Mulai dari
                </span>
                <span className="font-display text-3xl font-extrabold text-[#f0c75e]">
                  {activeSlide.price}
                </span>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={activeSlide.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary justify-center"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {activeSlide?.ctaLabel}
              </a>
              <a href="#paket" className="btn btn-outline-light justify-center border-white/70 bg-[#101a2e]/25 backdrop-blur">
                Lihat layanan
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div aria-hidden="true" className="hidden lg:block" />
        </div> 
        <div className="flex items-center justify-between pt-5 sm:pt-6">
          {/* <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Slide sebelumnya"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-[#101a2e]/30 text-lg backdrop-blur transition hover:border-[#f0c75e] hover:text-[#f0c75e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0c75e]"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Slide berikutnya"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-[#101a2e]/30 text-lg backdrop-blur transition hover:border-[#f0c75e] hover:text-[#f0c75e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0c75e]"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div> */}

          <div className="flex items-center gap-2" aria-label="Pilih slide">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Tampilkan slide ${index + 1}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                className={`h-2.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0c75e] ${index === activeIndex ? 'w-8 bg-[#f0c75e]' : 'w-2.5 bg-white/55 hover:bg-white'}`}
              />
            ))}
          </div>

          <p className="text-xs font-semibold tabular-nums text-white/70 sm:text-sm">
            <span className="text-white">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span className="mx-1.5">/</span>
            {String(slides.length).padStart(2, '0')}
          </p>
        </div>
      </div>

      <style jsx>{`
        .hero-slide-enter {
          animation: hero-enter 420ms ease-out both;
        }

        .hero-eyebrow-text {
          display: inline-block;
          animation: eyebrow-enter 560ms cubic-bezier(0.2, 0.75, 0.25, 1) 100ms both;
        }

        @keyframes hero-enter {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes eyebrow-enter {
          from { opacity: 0; filter: blur(4px); }
          to { opacity: 1; filter: blur(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-slide-enter, .hero-eyebrow-text { animation: none; }
        }
      `}</style>
    </section>
  );
}
