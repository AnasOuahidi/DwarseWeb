#!/usr/bin/env bash
cd assets/
git init
git add --all
git commit -m "Commit"
git remote add origin https://dwarse:dwarse123@github.com/dwarse/dwarse.github.io.git
git push -u origin master
cd ../
