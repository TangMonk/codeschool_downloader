#!/bin/bash
trap "exit" 2

for path in `ls downloads/`; do
    for course in `ls downloads/$path`; do
        echo "downloading $path/$course"
        aria2c -d "downloads/$path/$course" -i "downloads/$path/$course/videos.txt"
    done    
done