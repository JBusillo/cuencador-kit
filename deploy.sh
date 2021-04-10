#!/bin/bash
ssh -p 50001 pm2@cuencador.com pm2 stop cuencador

rm -r ./build

npm run build

sed -E  's/^\s+"(postcss|eslint|@sveltejs|@typescript|@tailwind|autoprefixer|cssnano|prettier|sass|svelte|tailwind|tslib|typescript|vite|feather-icons).+$//gm' package.json \
    | sed '/^$/d' \
    | sed -E -n 'H; x; s:,(\s*\n\s*}):\1:; P; ${x; p}' \
    | sed '1 d' > build/package.json

tar -czvf build.tar.gz --exclude=node_modules --exclude=package-lock.json --exclude=package.json build
tar -czvf build.tar.gz build

ssh -p 50001 deploy@cuencador.com 'cd /var/cuencador/www/cuencador-kit ; rm -r * '

scp -P 50001 -r build.tar.gz deploy@cuencador.com:"/var/cuencador/www/cuencador-kit"

ssh -p 50001 deploy@cuencador.com 'cd /var/cuencador/www/cuencador-kit ;'\
 ' tar -xzvf build.tar.gz --strip-components=1 ;'\
 ' rm build.tar.gz ;'\
 ' npm i'

rm build.tar.gz

ssh -p 50001 pm2@cuencador.com pm2 start cuencador
