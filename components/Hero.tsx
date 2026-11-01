'use client';

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactElement } from 'react';
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
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [cycle, setCycle] = useState(0);
  const dragStartRef = useRef<{ pointerId: number; x: number; y: number; time: number } | null>(null);
  const draggingRef = useRef(false);
  const slides = sliderData.slides;
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    if (isDragging) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, sliderData.autoPlayMs);

    return () => window.clearInterval(timer);
  }, [slides.length, activeIndex, cycle, isDragging]);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    const target = event.target as HTMLElement;
    if (target.closest('a, button, input, textarea, select')) return;

    dragStartRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      time: event.timeStamp,
    };

    if (event.pointerType === 'mouse') event.preventDefault();
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse' && event.buttons === 0) {
      dragStartRef.current = null;
      return;
    }

    const start = dragStartRef.current;
    if (!start || start.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;

    if (!draggingRef.current) {
      if (Math.abs(deltaX) < 10) return;
      if (Math.abs(deltaX) <= Math.abs(deltaY)) {
        dragStartRef.current = null;
        return;
      }

      draggingRef.current = true;
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    setDragOffset(deltaX);
  };

  const finishDrag = (event: ReactPointerEvent<HTMLElement>) => {
    const start = dragStartRef.current;
    if (!start || start.pointerId !== event.pointerId) return;

    const wasDragging = draggingRef.current;
    const deltaX = event.clientX - start.x;
    const elapsed = event.timeStamp - start.time;
    const threshold = Math.min(80, event.currentTarget.clientWidth * 0.12);
    const flicked = elapsed < 300 && Math.abs(deltaX) > 32;

    dragStartRef.current = null;
    draggingRef.current = false;

    if (wasDragging) {
      if (deltaX < 0 && (Math.abs(deltaX) >= threshold || flicked)) {
        showNext();
      } else if (deltaX > 0 && (Math.abs(deltaX) >= threshold || flicked)) {
        showPrevious();
      }

      setCycle((current) => current + 1);
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  const cancelDrag = () => {
    dragStartRef.current = null;
    draggingRef.current = false;
    setIsDragging(false);
    setDragOffset(0);
  };

  const cancelPendingDrag = () => {
    if (!draggingRef.current) dragStartRef.current = null;
  };

  return (
    <section
      id="beranda"
      aria-roledescription="carousel"
      aria-label="Layanan legalitas usaha"
      className="relative isolate h-[820px] overflow-hidden bg-brand-950 text-white [touch-action:pan-y] sm:h-[760px] lg:h-[760px]"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={cancelDrag}
      onPointerLeave={cancelPendingDrag}
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 z-20 h-[3px] bg-white/15 sm:h-1">
        <div
          key={`${activeIndex}-${cycle}`}
          className="hero-progress h-full rounded-r-full bg-gradient-to-r from-accent-500 via-accent-300 to-accent-500 shadow-[0_0_12px_rgba(103,232,249,0.8)]"
          style={{
            animationDuration: `${sliderData.autoPlayMs}ms`,
            animationPlayState: isDragging ? 'paused' : 'running',
          }}
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div
          key={activeIndex}
          className={`hero-bg-enter absolute inset-0 bg-cover bg-center will-change-transform ${isDragging ? '' : 'transition-transform duration-300 ease-out'}`}
          style={{
            backgroundImage: `url("${activeSlide?.image}")`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            transform: `translate3d(${dragOffset * 0.18}px, 0, 0) scale(1.06)`,
          }}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, rgba(5, 35, 54, .95) 0%, rgba(6, 64, 95, .82) 52%, rgba(6, 92, 140, .55) 100%)',
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-20" />
      <div aria-hidden="true" className="" />

      <div className="container-page relative flex h-full flex-col justify-between py-12 sm:py-14 lg:py-16">
        <div className="grid flex-1 items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div
            key={activeIndex}
            className={`hero-slide-enter max-w-3xl ${isDragging ? '' : 'transition-transform duration-300 ease-out'}`}
            style={{ transform: `translate3d(${dragOffset * 0.35}px, 0, 0)` }}
            aria-live="polite"
            aria-atomic="true"
          >


            <h1 className="mt-7 max-w-3xl font-display text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              <span key={activeIndex} className="hero-title-slide block">
                {activeSlide?.title}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              {activeSlide?.description}
            </p>



            {activeSlide?.price && (
              <div className="mt-7 inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-2xl border border-white/15 bg-brand-950/45 px-5 py-4 backdrop-blur">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
                  Mulai dari
                </span>
                <span className="font-display text-3xl font-extrabold text-accent-300">
                  {activeSlide.price}
                </span>
              </div>
            )}


            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={activeSlide?.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary justify-center border border-accent-300/40"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {activeSlide?.ctaLabel}
              </a>
              <a href="#paket" className="btn btn-outline-light justify-center border-white/70 bg-brand-950/25 backdrop-blur">
                Lihat layanan
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>

            {/* <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-accent-300/30 bg-brand-950/45 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-accent-300 backdrop-blur transition-colors duration-300 sm:gap-2.5 sm:px-4 sm:text-sm sm:tracking-[0.16em] mt-10">
              <span key={activeIndex} className="hero-eyebrow-text min-w-0">
                {activeSlide?.eyebrow}
              </span>
            </div> */}

          </div>
          <div aria-hidden="true" className="hidden lg:block" />
        </div>
        <div className="flex items-center justify-between pt-5 sm:pt-6">
          {/* <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Slide sebelumnya"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-brand-950/30 text-lg backdrop-blur transition hover:border-accent-300 hover:text-accent-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-300"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Slide berikutnya"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-brand-950/30 text-lg backdrop-blur transition hover:border-accent-300 hover:text-accent-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-300"
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
                className={`h-2.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-300 ${index === activeIndex ? 'w-8 bg-accent-300' : 'w-2.5 bg-white/55 hover:bg-white'}`}
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
    </section>
  );
}
