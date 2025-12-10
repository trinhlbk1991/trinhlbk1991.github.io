// Timer state interface
export interface TimerState {
  id: string;
  label: string;
  recipeUrl: string;
  totalSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
  startedAt: number | null;
}

// Storage key for timers
const STORAGE_KEY = 'gastronaut_timers';
let timerAudio: HTMLAudioElement | null = null;

// Get all active timers from localStorage
export function getTimers(): TimerState[] {
  if (typeof localStorage === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    const timers: TimerState[] = JSON.parse(stored);
    // Update remaining time for running timers
    return timers
      .map((timer) => {
        if (timer.isRunning && timer.startedAt) {
          const elapsed = Math.floor((Date.now() - timer.startedAt) / 1000);
          const remaining = Math.max(0, timer.remainingSeconds - elapsed);
          return { ...timer, remainingSeconds: remaining };
        }
        return timer;
      });
  } catch {
    return [];
  }
}

// Save timers to localStorage
export function saveTimers(timers: TimerState[]): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(timers));
}

// Add or update a timer
export function setTimer(timer: TimerState): void {
  const timers = getTimers();
  const index = timers.findIndex((t) => t.id === timer.id);

  if (index >= 0) {
    timers[index] = timer;
  } else {
    timers.push(timer);
  }

  saveTimers(timers);
  dispatchTimerUpdate();
}

// Remove a timer
export function removeTimer(id: string): void {
  const timers = getTimers().filter((t) => t.id !== id);
  saveTimers(timers);
  dispatchTimerUpdate();
}

// Start a timer
export function startTimer(id: string): void {
  const timers = getTimers();
  const timer = timers.find((t) => t.id === id);

  if (timer) {
    timer.isRunning = true;
    timer.startedAt = Date.now();
    saveTimers(timers);
    dispatchTimerUpdate();

    // Unlock audio context
    if (!timerAudio && typeof window !== 'undefined') {
      timerAudio = new Audio('/sounds/timer-complete.mp3');
    }
    if (timerAudio) {
      timerAudio.play().then(() => {
        timerAudio!.pause();
        timerAudio!.currentTime = 0;
      }).catch(() => {});
    }
  }
}

// Pause a timer
export function pauseTimer(id: string): void {
  const timers = getTimers();
  const timer = timers.find((t) => t.id === id);

  if (timer && timer.isRunning && timer.startedAt) {
    timer.isRunning = false;
    timer.startedAt = null;
    saveTimers(timers);
    dispatchTimerUpdate();
  }
}

// Reset a timer to its original duration
export function resetTimer(id: string): void {
  const timers = getTimers();
  const timer = timers.find((t) => t.id === id);

  if (timer) {
    timer.remainingSeconds = timer.totalSeconds;
    timer.isRunning = false;
    timer.startedAt = null;
    saveTimers(timers);
    dispatchTimerUpdate();
  }
}

// Dispatch custom event for timer updates
function dispatchTimerUpdate(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('timerUpdate'));
  }
}

// Format seconds to MM:SS or HH:MM:SS
export function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Track the interval ID to prevent duplicates
let timerInterval: number | null = null;

// Initialize timer manager (called on page load)
export function initTimerManager(): void {
  if (typeof window === 'undefined') return;

  // Clear existing interval if any
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  // Render active timers overlay
  renderTimerOverlay();

  // Set up interval to update timers
  timerInterval = window.setInterval(() => {
    const timers = getTimers();
    const runningTimers = timers.filter((t) => t.isRunning);

    if (runningTimers.length > 0) {
      // Check for completed timers
      runningTimers.forEach((timer) => {
        if (timer.remainingSeconds <= 0) {
          // Timer completed - show notification
          notifyTimerComplete(timer);
          removeTimer(timer.id);
        }
      });

      renderTimerOverlay();
    }
  }, 1000);

  // Listen for timer updates
  // Remove existing listener first to avoid duplicates if possible, 
  // though named functions are needed for removeEventListener.
  // For simplicity in this context, we'll assume the browser handles 
  // identical event listeners or we accept a small overhead. 
  // Ideally, we should use a named function for the event handler.
  window.removeEventListener('timerUpdate', renderTimerOverlay);
  window.addEventListener('timerUpdate', renderTimerOverlay);
}

// Render the timer overlay
function renderTimerOverlay(): void {
  const container = document.getElementById('timer-overlay');
  if (!container) return;

  const timers = getTimers();

  if (timers.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <div class="flex flex-col gap-2">
      ${timers
        .map((timer) => {
          const remaining = timer.remainingSeconds;

          return `
          <div class="bg-surface-inverse text-white p-3 rounded-md shadow-lg min-w-48" data-timer-id="${
            timer.id
          }" data-recipe-url="${timer.recipeUrl}">
            <div class="flex items-center justify-between gap-3">
              <a href="${
                timer.recipeUrl
              }" class="timer-link block hover:opacity-80 transition-opacity cursor-pointer">
                <p class="text-caption text-gray-400 uppercase">${
                  timer.label
                }</p>
                <p class="text-heading-m font-mono">${formatTime(remaining)}</p>
              </a>
              <div class="flex items-center gap-1">
                ${
                  timer.isRunning
                    ? `<button class="timer-pause p-1 hover:bg-gray-800 rounded" title="Pause">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6"/>
                      </svg>
                     </button>`
                    : `<button class="timer-play p-1 hover:bg-gray-800 rounded" title="Play">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                      </svg>
                     </button>`
                }
                <button class="timer-reset p-1 hover:bg-gray-800 rounded" title="Reset">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                </button>
                <button class="timer-close p-1 hover:bg-gray-800 rounded" title="Close">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        `;
        })
        .join('')}
    </div>
  `;

  // Attach event listeners
  container.querySelectorAll('[data-timer-id]').forEach((el) => {
    const id = el.getAttribute('data-timer-id')!;

    el.querySelector('.timer-play')?.addEventListener('click', () =>
      startTimer(id)
    );
    el.querySelector('.timer-pause')?.addEventListener('click', () =>
      pauseTimer(id)
    );
    el.querySelector('.timer-reset')?.addEventListener('click', () =>
      resetTimer(id)
    );
    el.querySelector('.timer-close')?.addEventListener('click', () =>
      removeTimer(id)
    );
  });
}

// Show notification when timer completes
function notifyTimerComplete(timer: TimerState): void {
  // Play sound if available
  // Play sound if available
  try {
    if (!timerAudio && typeof window !== 'undefined') {
      timerAudio = new Audio('/sounds/timer-complete.mp3');
    }
    if (timerAudio) {
      timerAudio.play().catch((e) => console.error('Error playing timer sound:', e));
    }
  } catch (e) {
    console.error('Error initializing audio:', e);
  }

  // Show browser notification if permitted
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Timer Complete!', {
      body: `${timer.label} is done!`,
      icon: '/favicon.svg',
    });
  }

  // Show toast notification
  showToast(`⏰ ${timer.label} is done!`);
}

// Show a toast notification
function showToast(message: string): void {
  const container = document.getElementById('toast-container') || createToastContainer();
  
  const toast = document.createElement('div');
  toast.className = 'bg-surface-inverse text-white px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-y-2 opacity-0 flex items-center gap-3 min-w-[300px]';
  toast.innerHTML = `
    <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>
    <span class="font-medium">${message}</span>
  `;

  container.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  });

  // Remove after 5 seconds
  setTimeout(() => {
    toast.classList.add('translate-y-2', 'opacity-0');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 5000);
}

function createToastContainer(): HTMLElement {
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'fixed top-24 right-6 z-50 flex flex-col gap-2';
  document.body.appendChild(container);
  return container;
}
