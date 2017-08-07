1. `git clone https://github.com/lisov/mobilunity-test`

2. `cd mobilunity-test`

3. `npm i`

4. `npm start`

## 

After start application opening on address http://localhost:3000;

The application composd from 2 part - `App` with main data and `Bar` with control panel for searching and filtering data;

Component `App` have simple method `filter`, which send to `Bar` component and one property `imutableData` for simple return the original data to state;

Component `App` also use simple stateless function `Item` for display item from data;

Component `Bar` using props from main component `App` like function `filter` and array of tags'

Component `Bar` also using  stateless function `FilterTag` for display all tags for filtering;