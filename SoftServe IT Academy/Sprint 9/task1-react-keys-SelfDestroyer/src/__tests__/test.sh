cp ./src/__tests__/.eslintrc ./
npx eslint --ext .js,.jsx,.ts,.tsx src --color
CI=true
npx react-scripts test
