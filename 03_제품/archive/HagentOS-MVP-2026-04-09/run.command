#!/bin/zsh
cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js 18+ is required."
  echo "Install Node.js, then run this file again."
  read -r "?Press Enter to exit..."
  exit 1
fi

npm start
