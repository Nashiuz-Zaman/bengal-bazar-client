export const getBaseApiUrl = () => {
  // If we are on the server, we talk directly to the backend
  if (typeof window === "undefined") {
    return "https://bengal-bazar-server.vercel.app";
  }

  // If we are on the client, we use the proxy path
  // This ensures the browser attaches cookies because it's the "same domain"
  return "/api-proxy";
};