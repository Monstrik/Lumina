#!/usr/bin/env bash

# Resolve project root directory
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
cd "$DIR" || exit 1

PORT="${1:-8000}"

# Check if port is in use and auto-increment if needed
while lsof -Pi :"$PORT" -sTCP:LISTEN -t >/dev/null 2>&1; do
  echo "Port $PORT is already in use, trying $((PORT + 1))..."
  PORT=$((PORT + 1))
done

URL="http://localhost:$PORT"

echo "================================================="
echo "  🌸 Lumina"
echo "  📂 Location: $DIR"
echo "  🌐 URL:      $URL"
echo "  Press Ctrl+C to stop the server anytime."
echo "================================================="

# Open URL in the default browser in the background
(
  sleep 1
  if command -v open >/dev/null 2>&1; then
    open "$URL"
  elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "$URL"
  else
    echo "Please open $URL in your web browser."
  fi
) &

# Run local HTTP server
if command -v python3 >/dev/null 2>&1; then
  exec python3 -m http.server "$PORT"
elif command -v python >/dev/null 2>&1; then
  exec python -m http.server "$PORT" 2>/dev/null || exec python -m SimpleHTTPServer "$PORT"
elif command -v npx >/dev/null 2>&1; then
  exec npx --yes serve -l "$PORT" .
else
  echo "Error: Python 3 or Node.js is required to run the server."
  exit 1
fi
