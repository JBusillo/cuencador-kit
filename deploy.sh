#!/bin/bash
ssh -p 50001 pm2@cuencador.com pm2 stop cuencador
npm run build
rm -r build/node_modules
ssh -p 50001 pm2@cuencador.com pm2 start cuencador
