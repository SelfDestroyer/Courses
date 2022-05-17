failed_count=0
tests_count=7

mustBeContentJS1="console.log('input file1');"
mustBeContentJS2="console.log('input file2');"
mustBeContentCSS1=".class1 { color: red; }"
mustBeContentCSS2=".class2 { color: blue; }"

ls ./ | grep -v 'node_modules\|__tests__\|package.json\|gulpfile.js' | xargs rm -rf
cp -r __tests__/src ./

if ! result1=$(npx gulp --silent)
then
  echo 'Gulp should be correct configured'
  failed_count=$(($failed_count + 1))
fi

if [ ! -f './output/result.js' ]
then
  echo 'Gulp should create the file `output/result.js`'
  failed_count=$(($failed_count + 3))
else
  if ! grep -q "$mustBeContentJS1" ./output/result.js
  then
    echo 'Gulp should concatenate all the js files located in the folder `src`'
    failed_count=$(($failed_count + 1))
  fi

  if ! grep -q "$mustBeContentJS2" ./output/result.js
  then
    echo 'Gulp should concatenate all the js files from the all subfolders of `src`'
    failed_count=$(($failed_count + 1))
  fi
fi

if [ ! -f './output/result.css' ]
then
  echo 'Gulp should create the file `output/result.css`'
  failed_count=$(($failed_count + 3))
else
  if ! grep -q "$mustBeContentCSS1" ./output/result.css
  then
    echo 'Gulp should concatenate all the css files located in the folder `src`'
    failed_count=$(($failed_count + 1))
  fi
  
  if ! grep -q "$mustBeContentCSS2" ./output/result.css
  then
    echo 'Gulp should concatenate all the css files from the all subfolders of `src`'
    failed_count=$(($failed_count + 1))
  fi
fi

echo "Result of tests:"
echo "$(($tests_count - $failed_count)) passed"
if [ $failed_count -ne 0 ]
then
  echo "$failed_count failed"
  exit 1
fi
