"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { KeyboardEvent } from "react";
import { commandPalette, commands } from "@/content/profile";
import type { Command } from "@/content/profile";
import { externalLinkProps } from "@/lib/external-link-props";

const CONFIRMATION_MS = 1600;

function subscribeToNothing() {
  return () => {};
}

function detectShortcutLabel() {
  return /Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘K" : "Ctrl K";
}

function matches(command: Command, query: string) {
  return command.label.toLowerCase().includes(query.trim().toLowerCase());
}

export function CommandPalette() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const listId = useId();
  const shortcutLabel = useSyncExternalStore(subscribeToNothing, detectShortcutLabel, () => null);

  const results = useMemo(() => commands.filter((command) => matches(command, query)), [query]);

  const open = useCallback(() => {
    setQuery("");
    setActiveIndex(0);
    setConfirmation(null);
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialogRef.current?.open) {
          close();
        } else {
          open();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => {
    if (!confirmation) {
      return;
    }
    const timeout = window.setTimeout(close, CONFIRMATION_MS);
    return () => window.clearTimeout(timeout);
  }, [confirmation, close]);

  const run = async (command: Command) => {
    if (command.kind === "copy") {
      await navigator.clipboard.writeText(command.value);
      setConfirmation(command.confirmation);
      return;
    }
    close();
    if (command.kind === "section") {
      window.location.hash = command.href;
      return;
    }
    if (externalLinkProps(command.href).target) {
      window.open(command.href, "_blank", "noopener,noreferrer");
      return;
    }
    window.location.href = command.href;
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) {
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + results.length) % results.length);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const command = results[activeIndex];
      if (command) {
        void run(command);
      }
    }
  };

  const activeOptionId = results[activeIndex] ? `${listId}-${activeIndex}` : undefined;

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={commandPalette.triggerLabel}
        aria-keyshortcuts="Meta+K Control+K"
        className="flex h-8 items-center gap-2 rounded-md border border-line px-2.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-paper"
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <circle cx={7} cy={7} r={4.5} />
          <line x1={10.5} y1={10.5} x2={14} y2={14} strokeLinecap="round" />
        </svg>
        {shortcutLabel && <kbd className="hidden font-sans text-xs sm:inline">{shortcutLabel}</kbd>}
      </button>

      <dialog
        ref={dialogRef}
        aria-label={commandPalette.dialogLabel}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            close();
          }
        }}
        onClose={() => setQuery("")}
        className="command-palette mx-auto mt-[12vh] w-[min(34rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-line-strong bg-ink-raised p-0 text-paper shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <circle cx={7} cy={7} r={4.5} />
            <line x1={10.5} y1={10.5} x2={14} y2={14} strokeLinecap="round" />
          </svg>
          <input
            type="text"
            role="combobox"
            aria-label={commandPalette.searchLabel}
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={activeOptionId}
            autoComplete="off"
            spellCheck={false}
            placeholder={commandPalette.searchPlaceholder}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onInputKeyDown}
            className="h-14 w-full bg-transparent text-paper placeholder:text-muted focus:outline-none"
          />
          <button
            type="button"
            onClick={close}
            className="rounded border border-line px-1.5 py-0.5 text-xs text-muted hover:text-paper"
          >
            Esc
            <span className="sr-only"> {commandPalette.closeLabel}</span>
          </button>
        </div>

        {confirmation ? (
          <p role="status" className="flex items-center gap-2 px-4 py-6 text-signal">
            <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth={2}>
              <polyline points="3,8.5 6.5,12 13,4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {confirmation}
          </p>
        ) : (
          <ul id={listId} role="listbox" aria-label={commandPalette.dialogLabel} className="max-h-80 overflow-y-auto p-2">
            {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">{commandPalette.emptyLabel}</li>}
            {results.map((command, index) => (
              <li
                key={command.label}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                onPointerMove={() => setActiveIndex(index)}
                onClick={() => void run(command)}
                className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2.5 text-[0.9375rem] transition-colors ${
                  index === activeIndex ? "bg-signal/10 text-paper" : "text-muted"
                }`}
              >
                {command.label}
                {index === activeIndex && <span aria-hidden="true" className="text-xs text-signal">Enter</span>}
              </li>
            ))}
          </ul>
        )}
      </dialog>
    </>
  );
}
