echo "Removing CSS imports..."

mkdir rmv
for filename in src/*.js; do
    cat ${filename} | grep -v -e .css -e .png > rmv/`basename ${filename}`
done

echo "Preprocessing JSX..."
cp jsx.babelrc .babelrc
TIMEOUT=4

# Timeout the JSX processor after TIMEOUT seconds
( npx babel --watch rmv --out-dir public --presets react-app/prod ) & pid=$!
( sleep ${TIMEOUT} && kill -HUP ${pid} ) 2>/dev/null & watcher=$!
wait ${pid} 2>/dev/null && kill -HUP ${watcher}

rm -rf rmv

echo "Bunding import statements..."
cp require.babelrc .babelrc
browserify public/index.js -o public/quizzit.js
