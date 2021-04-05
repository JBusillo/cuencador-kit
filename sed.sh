#!/bin/bash
sed -E  's/^\s+"(postcss|eslint|@sveltejs|@typescript|@tailwind|autoprefixer|cssnano|prettier|sass|svelte|tailwind|tslib|typescript|vite|feather-icons).+$//gm' package.json \
    | sed '/^$/d' \
    | sed -E -n 'H; x; s:,(\s*\n\s*}):\1:; P; ${x; p}' \
    | sed '1 d' > ../build/package.json




    #sed -E 's/[,]\s+[}]/xxx/g' temp.txt