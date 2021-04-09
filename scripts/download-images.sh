#!/bin/bash

OUT_DIR="../static/img"
mkdir -p $OUT_DIR

for i in {1..898} ; do
    filename=`printf %03d $i`.png
    wget "https://assets.pokemon.com/assets/cms2/img/pokedex/full/$filename" -O "$OUT_DIR/$filename"
    pwd
done