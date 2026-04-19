#!/bin/bash

# Remover referencias específicas a Quartz sin romper el HTML

find . -type f -name "*.html" | while read file; do
  if [ -f "$file" ]; then
    # Remover solo la línea del footer "Created with Quartz"
    sed -i '' 's/<p>Created with.*Quartz.*<\/p>/<p>Created with Notes<\/p>/g' "$file"

    # Remover solo los links específicos de Quartz en el footer
    sed -i '' 's|<li><a href="https://github.com/jackyzha0/quartz">GitHub</a></li>||g' "$file"
    sed -i '' 's|<li><a href="https://discord.gg/cRFFHYye7t">Discord Community</a></li>||g' "$file"

    # Cambiar "Quartz 4" por "Notes"
    sed -i '' 's/Quartz 4/Notes/g' "$file"

    echo "✅ $file"
  fi
done

echo ""
echo "✨ Listo: Referencias a Quartz removidas (sin romper HTML)"
