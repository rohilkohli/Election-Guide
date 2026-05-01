/**
 * Shared TypeScript types for the ElectionPath application.
 */

/** Represents a single message in the AI assistant chat interface. */
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

/** The shape of the request body sent to the /api/chat endpoint. */
export interface ChatRequestBody {
  message: string;
  eli18Mode?: boolean;
}

/** The shape of a successful response from the /api/chat endpoint. */
export interface ChatSuccessResponse {
  response: string;
}

/** The shape of an error response from the /api/chat endpoint. */
export interface ChatErrorResponse {
  error: string;
}

/** Union type for all possible /api/chat responses. */
export type ChatApiResponse = ChatSuccessResponse | ChatErrorResponse;

/** A single entry in the civic knowledge base. */
export interface KnowledgeEntry {
  keywords: string[];
  question: string;
  answer: string;
  eli18Answer: string;
}
