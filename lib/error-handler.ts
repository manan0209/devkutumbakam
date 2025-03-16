import { FirebaseError } from "firebase/app";

interface ErrorHandlerOptions {
  showConsoleLog?: boolean;
  defaultMessage?: string;
}

/**
 * Handles Firebase errors in a consistent way
 * @param error The error to handle
 * @param options Configuration options
 * @returns User-friendly error message
 */
export function handleFirebaseError(error: unknown, options: ErrorHandlerOptions = {}): string {
  const { 
    showConsoleLog = true, 
    defaultMessage = "An error occurred. Please try again."
  } = options;
  
  if (showConsoleLog) {
    console.error("Firebase error:", error);
  }
  
  if (error instanceof FirebaseError) {
    // Handle specific Firebase error codes
    switch(error.code) {
      case 'permission-denied':
      case 'storage/unauthorized':
        return "You don't have permission to perform this action. Please log in or contact an administrator.";
        
      case 'not-found':
      case 'storage/object-not-found':
        return "The requested data could not be found.";
        
      case 'already-exists':
        return "This data already exists.";
        
      case 'resource-exhausted':
        return "Too many requests. Please try again later.";
        
      case 'failed-precondition':
        return "Operation can't be executed in the current system state.";
        
      case 'unauthenticated':
      case 'auth/requires-recent-login':
        return "Please log in to continue.";
        
      default:
        if (error.message) {
          return error.message;
        }
        return defaultMessage;
    }
  }
  
  // Handle non-Firebase errors
  if (error instanceof Error) {
    return error.message;
  }
  
  return defaultMessage;
} 