failed_count=0
tests_count=4

ls ./ | grep -v '__tests__\|package.json' | xargs rm -rf
cp __tests__/script* ./

npm i --only=dev
if [ ! -d './node_modules/typescript' ]
then
  echo 'Typescript should be described as a dev dependence'
  failed_count=$(($failed_count + 1))
fi

rm -rf node_modules

npm i --only=prod
if [ ! -d './node_modules/bootstrap' ]
then
  echo 'Bootstrap should be described as a prod dependence'
  failed_count=$(($failed_count + 1))
fi

if [ ! $(npm run task1 --silent) ]
then
  echo 'Task1 should run the file script1.js'
  failed_count=$(($failed_count + 1))
fi

if [ ! $(npm run task2 --silent) ]
then
  echo 'Task2 should run the file script2.js'
  failed_count=$(($failed_count + 1))
fi

echo "Result of tests:"
echo "$(($tests_count - $failed_count)) passed"
if [ $failed_count -ne 0 ]
then
  echo "$failed_count failed"
  exit 1
fi
