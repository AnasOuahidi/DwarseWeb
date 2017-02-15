#!/usr/bin/env bash
cd assets/
git init
git add .
git commit -m "Commit"
git remote add origin https://dwarse:dwarse123@github.com/dwarse/dwarse.github.io.git
git push -u origin master --force
cd ../
