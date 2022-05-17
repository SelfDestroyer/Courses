cp -r ./__tests__/src/ ./
rm -rf ./__tests__/src/

if ! result=$(npx babel ./src --out-dir ./out)
then
  echo 'Babel should be correct configured'
  echo 'All tests failed!'
  exit 1
fi
