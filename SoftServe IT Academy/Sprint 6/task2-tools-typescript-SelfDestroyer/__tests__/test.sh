cp -r ./__tests__/src ./__tests__/file* ./

if ! result=$(npx tsc)
then
  echo 'Typescript should be installed and correct configured!'
  echo 'All tests failed!'
  exit 1
fi
