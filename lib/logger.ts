/**
 * Structured logger for ElectionPath server-side operations.
 *
 * Outputs JSON-formatted log entries compatible with Google Cloud Logging
 * (formerly Stackdriver Logging). When running on Cloud Run, Cloud Logging
 * automatically ingests these structured entries and enables log-based
 * metrics and alerting.
 *
 * Log format follows the Google Cloud Logging JSON payload specification:
 * https://cloud.google.com/logging/docs/structured-logging
 */

/** Severity levels as defined by Google Cloud Logging. */
export type LogSeverity =
  | "DEFAULT"
  | "DEBUG"
  | "INFO"
  | "NOTICE"
  | "WARNING"
  | "ERROR"
  | "CRITICAL"
  | "ALERT"
  | "EMERGENCY";

/** Shape of a structured log entry. */
export interface LogEntry {
  severity: LogSeverity;
  message: string;
  /** ISO-8601 timestamp, injected automatically. */
  timestamp: string;
  /** Caller-supplied context data (serialisable values only). */
  [key: string]: unknown;
}

/**
 * Writes a structured log entry to stdout in Google Cloud Logging JSON format.
 *
 * @param severity - The log severity level.
 * @param message  - Human-readable description of the event.
 * @param context  - Optional key-value pairs providing additional context.
 *
 * @example
 * log("INFO", "Chat request received", { messageLength: 42, eli18Mode: false });
 */
export function log(
  severity: LogSeverity,
  message: string,
  context: Record<string, unknown> = {}
): void {
  const entry: LogEntry = {
    severity,
    message,
    timestamp: new Date().toISOString(),
    service: "election-path",
    ...context,
  };
  // Cloud Run captures stdout as structured JSON when the entry is valid JSON.
  console.log(JSON.stringify(entry));
}

/** Convenience wrapper for INFO-level messages. */
export const logInfo = (message: string, ctx?: Record<string, unknown>) =>
  log("INFO", message, ctx);

/** Convenience wrapper for WARNING-level messages. */
export const logWarn = (message: string, ctx?: Record<string, unknown>) =>
  log("WARNING", message, ctx);

/** Convenience wrapper for ERROR-level messages. */
export const logError = (message: string, ctx?: Record<string, unknown>) =>
  log("ERROR", message, ctx);

/** Convenience wrapper for DEBUG-level messages. */
export const logDebug = (message: string, ctx?: Record<string, unknown>) =>
  log("DEBUG", message, ctx);
