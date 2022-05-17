failed_count=0
tests_count=3

ls ./ | grep -v '__tests__\|webpack.config.js' | xargs rm -rf

cp -r __tests__/src ./
cp -r __tests__/package.json ./
npm i

if [ ! -f './webpack.config.js' ]
then
  echo 'webpack.config.json should be exist'
  failed_count=$(($failed_count + 1))
elif ! result1=$(npm run build --silent)
then
  echo 'webpack.config.json should be correct described'
  failed_count=$(($failed_count + 1))
fi

if [ ! -f './pub/build.js' ]
then
  echo 'an entry point and output should comply with requirement'
  failed_count=$(($failed_count + 1))
fi

echo "Result of tests:"
echo "$(($tests_count - $failed_count)) passed"
if [ $failed_count -ne 0 ]
then
  echo "$failed_count failed"
  exit 1
fi
